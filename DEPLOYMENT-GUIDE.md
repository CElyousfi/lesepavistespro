# 🚀 Deployment Guide - Les Épavistes Pro

## 📦 Pre-Deployment Checklist

### 1. **Environment Variables**
Create `.env.local` file:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Ads Conversion
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Facebook Pixel (Optional)
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://lesepavistespro.fr

# Contact Information
NEXT_PUBLIC_PHONE=0979049486
NEXT_PUBLIC_WHATSAPP=+33602427345
NEXT_PUBLIC_EMAIL=lesepavistespro@gmail.com
```

### 2. **Dependencies Check**
```bash
npm install
npm run build
npm run lint
```

### 3. **Performance Audit**
```bash
# Run Lighthouse
npx lighthouse https://localhost:3000 --view

# Target Scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

---

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**

#### Why Vercel?
- ✅ Built for Next.js
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ Free SSL
- ✅ Analytics included
- ✅ Zero configuration

#### Steps:
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Production deployment
vercel --prod
```

#### Custom Domain Setup:
1. Go to Vercel Dashboard
2. Project Settings > Domains
3. Add `lesepavistespro.fr`
4. Add DNS records (provided by Vercel):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

### **Option 2: Netlify**

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Deploy
netlify deploy --prod
```

#### Build Settings:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### **Option 3: Self-Hosted (VPS/Dedicated Server)**

#### Requirements:
- Node.js 18+ installed
- Nginx or Apache
- PM2 for process management
- SSL certificate (Let's Encrypt)

#### Steps:

```bash
# 1. Clone repository
git clone your-repo-url
cd lesepavistespro

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Install PM2
npm install -g pm2

# 5. Start with PM2
pm2 start npm --name "lesepavistespro" -- start

# 6. Save PM2 configuration
pm2 save
pm2 startup
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name lesepavistespro.fr www.lesepavistespro.fr;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lesepavistespro.fr www.lesepavistespro.fr;

    ssl_certificate /etc/letsencrypt/live/lesepavistespro.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lesepavistespro.fr/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

---

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d lesepavistespro.fr -d www.lesepavistespro.fr

# Auto-renewal (runs automatically)
sudo certbot renew --dry-run
```

---

## 📊 Post-Deployment Setup

### 1. **Google Search Console**
```
1. Go to: https://search.google.com/search-console
2. Add property: lesepavistespro.fr
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: https://lesepavistespro.fr/sitemap.xml
5. Request indexing for main pages
```

### 2. **Google Analytics 4**
```
1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Update in /app/layout.tsx
4. Set up conversion goals:
   - Phone calls
   - WhatsApp clicks
   - Email clicks
   - Form submissions
```

### 3. **Google My Business**
```
1. Create/claim business profile
2. Add:
   - Business name: Les Épavistes Pro
   - Category: Auto Wrecker, Towing Service
   - Phone: 09 79 04 94 86
   - Website: https://lesepavistespro.fr
   - Hours: Mon-Sun 8:00-21:00
   - Service area: Île-de-France
3. Upload photos
4. Respond to reviews
```

### 4. **Bing Webmaster Tools**
```
1. Go to: https://www.bing.com/webmasters
2. Add site
3. Submit sitemap
4. Verify ownership
```

---

## 🔍 SEO Post-Launch

### Week 1:
- [ ] Verify all pages are indexed
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Test all conversion tracking

### Week 2-4:
- [ ] Start content marketing (blog posts)
- [ ] Build local citations
- [ ] Get first reviews on Google
- [ ] Monitor keyword rankings

### Month 2+:
- [ ] Analyze traffic sources
- [ ] Optimize underperforming pages
- [ ] A/B test CTAs
- [ ] Expand content strategy

---

## 📈 Monitoring & Maintenance

### **Daily**:
- Check website uptime
- Monitor conversion tracking
- Respond to inquiries

### **Weekly**:
- Review analytics
- Check Search Console for errors
- Monitor keyword rankings
- Backup database (if applicable)

### **Monthly**:
- Full SEO audit
- Performance optimization
- Content updates
- Competitor analysis
- Review and respond to all reviews

---

## 🚨 Troubleshooting

### **Site Not Loading**
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs lesepavistespro

# Restart
pm2 restart lesepavistespro
```

### **Build Errors**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### **Slow Performance**
```bash
# Check bundle size
npm run build
# Look for large chunks

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 📞 Emergency Contacts

### **Technical Issues**:
- Hosting provider support
- DNS provider support
- SSL certificate issues: Let's Encrypt community

### **SEO Issues**:
- Google Search Console Help
- Bing Webmaster Tools Support

---

## ✅ Launch Day Checklist

### **Morning of Launch**:
- [ ] Final build test
- [ ] Verify all environment variables
- [ ] Test all CTAs (phone, WhatsApp, email)
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Verify analytics tracking

### **During Launch**:
- [ ] Deploy to production
- [ ] Verify DNS propagation
- [ ] Test from different locations
- [ ] Check SSL certificate
- [ ] Submit sitemap to Search Console
- [ ] Test conversion tracking

### **After Launch**:
- [ ] Monitor error logs
- [ ] Check analytics for traffic
- [ ] Test all forms and CTAs
- [ ] Share on social media
- [ ] Notify Google My Business
- [ ] Monitor phone call volume

---

## 🎉 Success Metrics

### **Week 1 Goals**:
- Site fully indexed by Google
- 0 critical errors in Search Console
- All conversion tracking working
- First organic visitors

### **Month 1 Goals**:
- 100+ organic visitors
- 10+ conversion actions
- 5+ Google reviews
- Ranking for brand name

### **Month 3 Goals**:
- 500+ organic visitors
- 50+ conversion actions
- 20+ Google reviews
- Ranking in top 10 for main keywords

---

**Deployment Status**: Ready for Production ✅
**Last Updated**: 2024
**Next Review**: Post-launch +7 days
