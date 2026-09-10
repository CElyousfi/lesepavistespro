/**
 * optimize-images.ts — P3.1
 *
 * public/ shipped 22 MB of source images: hero/hero6.png at 2.3 MB,
 * blog/blog1.png at 2.3 MB, logo.png at 1.4 MB (1024×1024, rendered at 36 px).
 * next/image re-encodes on the fly, but a heavy source still costs the first
 * optimisation pass, the build cache and the repo, and any direct hit on the
 * raw path serves the full file.
 *
 * This converts photographic/illustrative assets to WebP at sensible max
 * widths, and rewrites the few assets whose path must stay a PNG (the logo is
 * referenced from schema.org and by external consumers) in place.
 *
 * Originals are replaced, not duplicated — there is no second copy in public/.
 *
 * Usage:
 *   npx tsx scripts/optimize-images.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

type SharpPipeline = ReturnType<typeof sharp>;

const DRY_RUN = process.argv.includes('--dry-run');
const PUBLIC = path.join(process.cwd(), 'public');
/**
 * App Router icon conventions live in app/, not public/, but the browser
 * downloads them on every page load — app/icon.png and app/apple-icon.png were
 * 1,383 KB each at 1024×1024 while declaring 512×512 and 180×180.
 * [file, exact square size] — sizes must match app/layout.tsx `icons`.
 */
const APP_ICONS: Array<[string, number]> = [
  ['app/icon.png', 512],
  ['app/apple-icon.png', 180],
];

interface Rule {
  /** Glob-ish directory under public/, or a specific file. */
  match: RegExp;
  maxWidth: number;
  /** 'webp' converts and removes the original; 'png' rewrites in place. */
  format: 'webp' | 'png' | 'jpeg';
  quality: number;
  /** Keep the original extension/path (for URLs that must not change). */
  inPlace?: boolean;
}

const RULES: Rule[] = [
  // The logo path is referenced from schema.org and by external consumers —
  // it must stay /logo.png. 1024×1024 → 512×512, palette-quantised.
  { match: /^logo\.png$/, maxWidth: 512, format: 'png', quality: 80, inPlace: true },
  { match: /^logo_name\.png$/, maxWidth: 512, format: 'png', quality: 80, inPlace: true },
  // The OG image must stay a JPEG at 1200×630 for social scrapers.
  { match: /^images\/og-default\.jpg$/, maxWidth: 1200, format: 'jpeg', quality: 82, inPlace: true },
  // Blog illustrations — rendered as cards and article heroes.
  { match: /^blog\//, maxWidth: 1200, format: 'webp', quality: 78 },
  // Hero / service / section imagery.
  { match: /^hero\//, maxWidth: 1920, format: 'webp', quality: 78 },
  { match: /^images\//, maxWidth: 1920, format: 'webp', quality: 78 },
  { match: /^services\//, maxWidth: 1200, format: 'webp', quality: 78 },
  { match: /^FAQ\.png$/, maxWidth: 1200, format: 'webp', quality: 78 },
];

/** Files never touched: icons the browser and manifest resolve by exact path. */
const SKIP = /^(favicon\.ico|icon\.png|apple-icon\.png|.*\.svg|.*\.webp)$/;

function walk(dir: string, base = ''): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, rel));
    else out.push(rel);
  }
  return out;
}

async function main() {
  const files = walk(PUBLIC).filter((f) => /\.(png|jpe?g)$/i.test(f) && !SKIP.test(f));

  let before = 0;
  let after = 0;
  const renames: Array<{ from: string; to: string }> = [];
  const broken: string[] = [];

  for (const rel of files) {
    const rule = RULES.find((r) => r.match.test(rel));
    if (!rule) {
      const size = fs.statSync(path.join(PUBLIC, rel)).size;
      before += size;
      after += size;
      continue;
    }

    const full = path.join(PUBLIC, rel);
    const originalSize = fs.statSync(full).size;
    before += originalSize;

    let pipeline: SharpPipeline;
    try {
      pipeline = sharp(full).resize({ width: rule.maxWidth, withoutEnlargement: true });
      await pipeline.metadata();
    } catch {
      // A file sharp cannot read is not an image (public/hero/hero-tow-truck.jpg
      // is 29 bytes of nothing) — report it instead of crashing.
      broken.push(rel);
      after += originalSize;
      continue;
    }

    let buffer: Buffer;
    if (rule.format === 'webp') buffer = await pipeline.webp({ quality: rule.quality }).toBuffer();
    else if (rule.format === 'jpeg')
      buffer = await pipeline.jpeg({ quality: rule.quality, mozjpeg: true }).toBuffer();
    else buffer = await pipeline.png({ palette: true, quality: rule.quality, effort: 9 }).toBuffer();

    if (buffer.length >= originalSize) {
      // Never make a file bigger.
      after += originalSize;
      continue;
    }

    const target = rule.inPlace
      ? rel
      : rel.replace(/\.(png|jpe?g)$/i, `.${rule.format === 'jpeg' ? 'jpg' : rule.format}`);

    after += buffer.length;
    console.log(
      `  ${rel.padEnd(38)} ${String(Math.round(originalSize / 1024)).padStart(5)} KB → ` +
        `${String(Math.round(buffer.length / 1024)).padStart(5)} KB` +
        (target !== rel ? `  (${path.basename(target)})` : '')
    );

    if (DRY_RUN) continue;

    fs.writeFileSync(path.join(PUBLIC, target), buffer);
    if (target !== rel) {
      fs.unlinkSync(full);
      renames.push({ from: `/${rel}`, to: `/${target}` });
    }
  }

  // App Router icons — resized to exactly the dimensions layout.tsx declares.
  for (const [rel, size] of APP_ICONS) {
    const full = path.join(process.cwd(), rel);
    if (!fs.existsSync(full)) continue;
    const originalSize = fs.statSync(full).size;
    const buffer = await sharp(full)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ palette: true, quality: 90, effort: 9 })
      .toBuffer();
    if (buffer.length >= originalSize) continue;
    console.log(
      `  ${rel.padEnd(38)} ${String(Math.round(originalSize / 1024)).padStart(5)} KB → ` +
        `${String(Math.round(buffer.length / 1024)).padStart(5)} KB  (${size}×${size})`
    );
    if (!DRY_RUN) fs.writeFileSync(full, buffer);
  }

  console.log(`\n📦 public/ images: ${Math.round(before / 1024 / 1024)} MB → ${Math.round(after / 1024 / 1024)} MB`);

  if (broken.length) {
    console.log(`\n⚠️  Not readable as images (fix or remove the reference):`);
    broken.forEach((b) => console.log(`     public/${b}`));
  }

  if (renames.length) {
    console.log(`\n🔁 Update these references (${renames.length}):`);
    renames.forEach((r) => console.log(`     ${r.from}  →  ${r.to}`));
    const manifest = path.join(process.cwd(), 'seo-audit', 'image-renames.json');
    fs.mkdirSync(path.dirname(manifest), { recursive: true });
    fs.writeFileSync(manifest, JSON.stringify(renames, null, 2));
    console.log(`\n   Manifest: ${path.relative(process.cwd(), manifest)}`);
  }

  if (DRY_RUN) console.log('\n(dry run — nothing written)\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
