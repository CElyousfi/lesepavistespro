'use client';

import { Analytics } from '@vercel/analytics/next';
import { BOT_UA_RE } from '@/lib/bot-guard';

/**
 * Vercel Analytics without our own monitor and lab tools (S3.5): events from
 * HeadlessChrome, Lighthouse, PageSpeed, LesEpavistesPro-SEO-Monitor or a
 * webdriver-controlled browser are dropped before they are sent.
 */
export default function AnalyticsGuarded() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (typeof navigator !== 'undefined' && (BOT_UA_RE.test(navigator.userAgent) || (navigator as Navigator & { webdriver?: boolean }).webdriver === true)) {
          return null;
        }
        return event;
      }}
    />
  );
}
