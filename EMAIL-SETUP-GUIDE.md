# 📧 EMAIL SETUP GUIDE - contact@lesepavistespro.fr

## ✅ WHAT'S BEEN UPDATED

Your professional email `contact@lesepavistespro.fr` is now:

### **1. Displayed Everywhere** ✅
- ✅ Footer (all pages)
- ✅ FAQ section
- ✅ Schema.org structured data (for Google)
- ✅ All contact forms

### **2. Form Submissions Ready** ✅
- ✅ API endpoint created (`/api/contact/route.ts`)
- ✅ Form sends data to API
- ✅ Email content formatted
- ✅ All form fields included

---

## 🚀 NEXT STEP: CHOOSE EMAIL SERVICE

You need to connect an email service to actually send the form submissions. Here are your options:

### **Option 1: Resend (RECOMMENDED - Easiest)**

**Why Resend?**
- ✅ Built for Next.js
- ✅ Free tier: 100 emails/day
- ✅ Simple setup (5 minutes)
- ✅ Great deliverability
- ✅ Beautiful email templates

**Setup Steps:**

1. **Sign up:** https://resend.com
2. **Get API Key**
3. **Install package:**
   ```bash
   npm install resend
   ```

4. **Add to `.env.local`:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In the POST function, replace the TODO with:
   const { data, error } = await resend.emails.send({
     from: 'noreply@lesepavistespro.fr',
     to: 'contact@lesepavistespro.fr',
     subject: `Nouvelle demande: ${formData.service} - ${formData.nom}`,
     text: emailContent,
   });
   
   if (error) {
     console.error('Email error:', error);
   }
   ```

6. **Verify your domain** in Resend dashboard

---

### **Option 2: SendGrid (Popular)**

**Why SendGrid?**
- ✅ Free tier: 100 emails/day
- ✅ Well-established
- ✅ Good documentation

**Setup Steps:**

1. **Sign up:** https://sendgrid.com
2. **Get API Key**
3. **Install package:**
   ```bash
   npm install @sendgrid/mail
   ```

4. **Add to `.env.local`:**
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ```

5. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   // In the POST function:
   await sgMail.send({
     to: 'contact@lesepavistespro.fr',
     from: 'noreply@lesepavistespro.fr',
     subject: `Nouvelle demande: ${formData.service} - ${formData.nom}`,
     text: emailContent,
   });
   ```

---

### **Option 3: Nodemailer (SMTP)**

**Why Nodemailer?**
- ✅ Works with any SMTP server
- ✅ Use your email provider's SMTP
- ✅ No third-party service needed

**Setup Steps:**

1. **Install package:**
   ```bash
   npm install nodemailer
   ```

2. **Get SMTP credentials** from your email provider

3. **Add to `.env.local`:**
   ```
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_USER=contact@lesepavistespro.fr
   SMTP_PASS=your_password_here
   ```

4. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT!),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });
   
   // In the POST function:
   await transporter.sendMail({
     from: 'contact@lesepavistespro.fr',
     to: 'contact@lesepavistespro.fr',
     subject: `Nouvelle demande: ${formData.service} - ${formData.nom}`,
     text: emailContent,
   });
   ```

---

## 📧 EMAIL CONTENT FORMAT

When someone submits the form, you'll receive an email like this:

```
Subject: Nouvelle demande: epaviste - Janaszak

Nouvelle demande de devis - Les Épavistes Pro
=============================================

SERVICE
-------
Enlèvement d'Épave

VÉHICULE
--------
Immatriculation: ER-688-QT
Marque: Renault
Modèle: Grand Modus
Année: 2005
Kilométrage: 170000 km
Énergie: diesel
Boîte: manuelle
État: non-roulant

LOCALISATION
------------
Ville: LIMOGES
Code postal: 87000
Département: 87

CONTACT
-------
Nom: Janaszak
Prénom: Simon
Téléphone: 0770268125
Email: simon.janaszak@gmail.com

MESSAGE
-------
Le véhicule est dans un garage, besoin d'un treuil

=============================================
Date: 10/11/2024 22:15:30
```

---

## 🎯 RECOMMENDED SETUP

**For you, I recommend:**

1. **Use Resend** (easiest and best for Next.js)
2. **Takes 5 minutes** to set up
3. **Free tier is enough** for your volume
4. **Great deliverability** (emails won't go to spam)

---

## 📝 QUICK START (Resend)

```bash
# 1. Install
npm install resend

# 2. Add to .env.local
echo "RESEND_API_KEY=your_key_here" >> .env.local

# 3. Update the API route (I can do this for you)

# 4. Test the form!
```

---

## ✅ CURRENT STATUS

- ✅ **Email displayed** everywhere on website
- ✅ **Form collects** all data
- ✅ **API endpoint** ready
- ✅ **Email content** formatted
- ⚠️ **Email service** needs to be connected

---

## 🚀 NEXT STEPS

1. **Choose email service** (Resend recommended)
2. **Get API key**
3. **Tell me which service** you chose
4. **I'll complete the integration** for you

**Which email service do you want to use?**
- Resend (recommended)
- SendGrid
- Nodemailer (SMTP)
- Other?
