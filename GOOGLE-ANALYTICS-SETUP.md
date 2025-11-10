# 📊 Google Analytics 4 Setup Guide

## 🎯 **QUICK SETUP (5 Minutes)**

### Step 1: Get Your Measurement ID

1. **Go to your Google Analytics account:**
   - URL: https://analytics.google.com/analytics/web/?authuser=5#/a298434293p422708706/reports/intelligenthome
   - Email: lesepavistespro.com

2. **Navigate to Admin (bottom left gear icon)**

3. **Click on "Data Streams" (under Property column)**

4. **Click on your Web stream** (should show "lesepavistespro.fr" or similar)

5. **Copy the Measurement ID** - It looks like: `G-XXXXXXXXXX`
   - Example: `G-ABC123DEF4`
   - It's at the top right of the stream details page

### Step 2: Add Measurement ID to Your Website

**Option A: Using Environment Variable (Recommended for Production)**

1. Create a file named `.env.local` in the root folder:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID-HERE
```

2. Replace `G-YOUR-ACTUAL-ID-HERE` with your actual Measurement ID

3. Restart your development server:
```bash
npm run dev
```

**Option B: Direct in Code (Quick Test)**

1. Open `/app/layout.tsx`

2. Find line 102 and 112 where it says `G-XXXXXXXXXX`

3. Replace both instances with your actual Measurement ID

4. Save the file

### Step 3: Verify It's Working

1. **Open your website** in a browser

2. **Open Developer Tools** (F12 or Right-click > Inspect)

3. **Go to Console tab**

4. **Look for:** `Google Analytics is loaded` or check Network tab for `gtag/js` requests

5. **In Google Analytics:**
   - Go to Reports > Realtime
   - You should see yourself as an active user within 30 seconds

---

## 🔧 **DETAILED SETUP INSTRUCTIONS**

### Finding Your Measurement ID (Step-by-Step with Screenshots)

1. **Login to Google Analytics**
   - Go to: https://analytics.google.com
   - Use email: lesepavistespro.com

2. **Click Admin** (gear icon, bottom left)

3. **In the Property column (middle), click "Data Streams"**

4. **You'll see your web stream listed**
   - It might say "Web stream details" or show your domain

5. **Click on the stream**

6. **At the top right, you'll see:**
   ```
   Measurement ID
   G-XXXXXXXXXX
   ```

7. **Click the copy icon** next to the Measurement ID

### Adding to Your Website

**For Development (Local Testing):**

1. Create `.env.local` file in project root:
```bash
cd /home/kali/code/lesepavistespro
nano .env.local
```

2. Add this line:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-MEASUREMENT-ID
```

3. Save (Ctrl+O, Enter, Ctrl+X)

4. Restart dev server:
```bash
npm run dev
```

**For Production (Deployment):**

When you deploy to Vercel/Netlify, add the environment variable in their dashboard:
- Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Value: `G-YOUR-MEASUREMENT-ID`

---

## ✅ **VERIFICATION CHECKLIST**

### Test 1: Check Console
- [ ] Open website
- [ ] Press F12 (Developer Tools)
- [ ] Go to Console tab
- [ ] No errors about Google Analytics
- [ ] See `gtag` function defined

### Test 2: Check Network
- [ ] Open Developer Tools
- [ ] Go to Network tab
- [ ] Reload page
- [ ] Filter by "gtag"
- [ ] See requests to `www.googletagmanager.com`

### Test 3: Check Realtime Reports
- [ ] Go to Google Analytics
- [ ] Click "Reports" (left sidebar)
- [ ] Click "Realtime"
- [ ] See yourself as active user
- [ ] See page views being tracked

### Test 4: Check Events
- [ ] Click around your website
- [ ] In Realtime, go to "Event count by Event name"
- [ ] Should see: `page_view`, `session_start`, etc.

---

## 📊 **WHAT WILL BE TRACKED**

### Automatic Events (No Code Needed)
- ✅ **Page views** - Every page visit
- ✅ **Sessions** - User sessions
- ✅ **Scroll depth** - How far users scroll
- ✅ **Outbound clicks** - Clicks to external sites
- ✅ **File downloads** - PDF, images, etc.
- ✅ **Video engagement** - If you add videos

### Custom Events (Already Configured)
- ✅ **Phone clicks** - When users click phone number
- ✅ **WhatsApp clicks** - When users click WhatsApp button
- ✅ **Form submissions** - Newsletter signups
- ✅ **Service clicks** - Clicks on service cards
- ✅ **Blog post views** - Blog article reads

### User Properties Tracked
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser
- ✅ Operating system
- ✅ Location (city, country)
- ✅ Traffic source (Google, direct, social, etc.)
- ✅ Landing page
- ✅ Exit page

---

## 🎯 **RECOMMENDED REPORTS TO MONITOR**

### Daily Checks
1. **Realtime Overview**
   - Current active users
   - Top pages
   - Traffic sources

### Weekly Checks
1. **Acquisition Overview**
   - Where users come from
   - Organic search performance
   - Social media traffic

2. **Engagement Overview**
   - Most viewed pages
   - Average engagement time
   - Events per session

3. **User Attributes**
   - Device breakdown
   - Location data
   - New vs returning users

### Monthly Checks
1. **Traffic Trends**
   - Month-over-month growth
   - Seasonal patterns
   - Top performing content

2. **Conversion Tracking**
   - Phone clicks
   - Form submissions
   - Goal completions

---

## 🔔 **SETTING UP IMPORTANT EVENTS**

### Track Phone Calls

The code is already set up! When users click the phone number, it tracks:
```javascript
Event: 'phone_click'
Parameters: {
  location: 'header' or 'footer' or 'hero'
}
```

### Track WhatsApp Clicks

Already configured! Tracks when users click WhatsApp button.

### Track Form Submissions

Add this to your newsletter form (already in Footer.tsx):
```javascript
gtag('event', 'generate_lead', {
  'event_category': 'Newsletter',
  'event_label': 'Footer Subscription'
});
```

---

## 📈 **CUSTOM GOALS TO SET UP**

### In Google Analytics Admin:

1. **Goal 1: Phone Call**
   - Event name: `phone_click`
   - Value: High priority conversion

2. **Goal 2: WhatsApp Message**
   - Event name: `whatsapp_click`
   - Value: High priority conversion

3. **Goal 3: Newsletter Signup**
   - Event name: `generate_lead`
   - Value: Medium priority conversion

4. **Goal 4: Service Page View**
   - Event name: `page_view`
   - Page path contains: `/epaviste` or `/rachat-voiture`

---

## 🚨 **TROUBLESHOOTING**

### Problem: No data showing in Realtime

**Solution:**
1. Check Measurement ID is correct
2. Clear browser cache
3. Try incognito/private window
4. Check browser console for errors
5. Verify `.env.local` file exists and has correct ID

### Problem: "G-XXXXXXXXXX" still showing

**Solution:**
1. Make sure `.env.local` file is in root folder
2. Restart development server completely
3. Check environment variable name is exactly: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Problem: Events not tracking

**Solution:**
1. Check Network tab for `collect` requests
2. Verify events are firing in console
3. Wait 24-48 hours for full data processing

### Problem: Realtime works but no historical data

**Solution:**
- This is normal! Historical reports take 24-48 hours to populate
- Realtime is instant, but standard reports have a delay

---

## 📱 **MOBILE APP TRACKING (Future)**

If you create a mobile app later, you can use the same GA4 property:
- Add iOS stream
- Add Android stream
- Use same property for web + mobile unified tracking

---

## 🔐 **PRIVACY & GDPR COMPLIANCE**

### Cookie Consent (Recommended)

For GDPR compliance, consider adding a cookie consent banner:

```javascript
// Only load GA after user consent
if (userConsent) {
  gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
}
```

### IP Anonymization

Already configured! GA4 anonymizes IPs by default.

---

## 📊 **EXPECTED METRICS (First 6 Months)**

| Month | Users | Sessions | Conversions |
|-------|-------|----------|-------------|
| 1 | 100-300 | 150-400 | 5-10 |
| 2 | 300-600 | 400-800 | 10-20 |
| 3 | 500-1000 | 700-1400 | 20-40 |
| 4 | 800-1500 | 1100-2100 | 30-60 |
| 5 | 1200-2000 | 1700-2800 | 50-100 |
| 6 | 2000-3000 | 2800-4200 | 80-150 |

---

## 🎓 **LEARNING RESOURCES**

### Google Analytics Academy
- Free courses: https://analytics.google.com/analytics/academy/

### Key Reports to Learn
1. Acquisition reports (where users come from)
2. Engagement reports (what they do)
3. Monetization reports (conversions)
4. Retention reports (returning users)

---

## ✅ **QUICK REFERENCE**

### Your GA4 Details
- **Account ID:** 298434293
- **Property ID:** 422708706
- **Email:** lesepavistespro.com
- **Website:** https://lesepavistespro.fr

### Important Links
- **Analytics Home:** https://analytics.google.com
- **Your Property:** https://analytics.google.com/analytics/web/#/a298434293p422708706
- **Realtime Report:** https://analytics.google.com/analytics/web/#/a298434293p422708706/reports/realtime
- **Admin:** https://analytics.google.com/analytics/web/#/a298434293p422708706/admin

### Files Modified
- `/app/layout.tsx` - GA4 tracking code
- `env.example` - Environment variable template
- `/lib/analytics.ts` - Custom event tracking

---

## 🚀 **NEXT STEPS**

1. ✅ Get your Measurement ID from GA4
2. ✅ Add it to `.env.local` file
3. ✅ Restart dev server
4. ✅ Test in Realtime reports
5. ✅ Set up conversion goals
6. ✅ Monitor daily for first week
7. ✅ Review weekly reports
8. ✅ Optimize based on data

---

**Need Help?**
- Google Analytics Support: https://support.google.com/analytics
- Your setup is ready - just add your Measurement ID!

**Last Updated:** November 2024
