# Les Épavistes Pro - Website

Professional website for épaviste (scrap vehicle removal) and vehicle buyback services in Île-de-France.

## 🚀 Features

- **Modern Design**: Clean, professional UI inspired by Artea Audit with navy blue theme
- **SEO Optimized**: Complete Schema.org JSON-LD, meta tags, sitemap, and robots.txt
- **Dynamic Location Pages**: Automated pages for all 8 Île-de-France departments and major cities
- **Mobile-First**: Fully responsive with sticky CTA and optimized forms
- **Analytics Ready**: Google Analytics 4 integration with event tracking
- **Performance**: Optimized for Core Web Vitals (LCP < 2s, CLS < 0.05)

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
lesepavistespro/
├── app/
│   ├── epaviste/[slug]/     # Dynamic department pages
│   ├── rachat-voiture/      # Vehicle buyback pages
│   ├── blog/                # Blog system
│   ├── layout.tsx           # Root layout with Schema.org
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── Header.tsx           # Navigation
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # Services cards
│   ├── Process.tsx          # 3-step process
│   ├── Coverage.tsx         # Department coverage
│   ├── Stats.tsx            # Statistics
│   ├── Testimonials.tsx     # Client reviews
│   ├── FAQ.tsx              # FAQ accordion
│   ├── CTASection.tsx       # Call-to-action
│   ├── ContactForm.tsx      # Lead form
│   └── Footer.tsx           # Footer
├── lib/
│   ├── locations.ts         # Department/city data
│   ├── schema.ts            # Schema.org helpers
│   ├── analytics.ts         # GA4 tracking
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## 🎨 Design System

### Colors
- **Navy Primary**: `#2D3250`
- **Navy Secondary**: `#424769`
- **Lavender**: `#9B9FE8`
- **Lavender Light**: `#B8BCFF`
- **Cream**: `#F6F4EB`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2xl-5xl
- **Body**: Regular, base-lg

## 📊 SEO Features

### Schema.org Markup
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList
- Article (blog)

### Meta Tags
- Title, description, keywords
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- Canonical URLs

### Dynamic Sitemap
- Homepage
- Service pages
- All department pages (8 × 2 = 16)
- Blog articles

## 🎯 Keywords Targeted

### Primary
- épaviste, enlèvement épave gratuit
- rachat voiture, rachat épave
- épaviste Paris, VHU agréé

### Location-Based
- épaviste [department]
- enlèvement épave [city]
- rachat voiture [department]

### Long-Tail
- certificat de destruction
- prime à la conversion
- ZFE Grand Paris
- Crit'Air vignette

## 📱 Mobile Optimization

- Sticky CTA bar
- Click-to-call buttons
- Short forms (name/phone/postal code)
- Touch-friendly UI elements

## 🔧 Configuration

### Google Analytics
Replace `G-XXXXXXXXXX` in `app/layout.tsx` with your GA4 ID.

### Contact Information
Update phone number and email in:
- `components/Hero.tsx`
- `components/CTASection.tsx`
- `components/Footer.tsx`

### Domain
Update base URL in:
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/schema.ts`

## 📈 Performance

- **LCP**: < 2s (Largest Contentful Paint)
- **CLS**: < 0.05 (Cumulative Layout Shift)
- **INP**: < 200ms (Interaction to Next Paint)
- **Lighthouse Score**: 95+

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual
```bash
npm run build
npm start
```

## 📝 Content Management

### Adding a Department
Edit `lib/locations.ts` and add to the `departments` array.

### Adding a Blog Post
Create a new file in `app/blog/[slug]/page.tsx`.

### Updating Services
Edit component files in `components/`.

## 🤝 Support

For questions or issues, contact: contact@lesepavistespro.fr

## 📄 License

© 2025 Les Épavistes Pro - All rights reserved
