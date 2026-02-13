# Google Sheets Integration Setup

This guide explains how to connect form submissions to a Google Sheet automatically.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"Les Épavistes Pro - Leads"**
3. In **Row 1**, add these headers (exactly):

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date | Service | Type | Marque | Modèle | Année | État | Prénom | Téléphone | Email | Code Postal | Ville | Sous-sol |

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.date || new Date().toLocaleString('fr-FR'),
      data.service || '',
      data.vehicleType || '',
      data.marque || '',
      data.modele || '',
      data.annee || '',
      data.etat || '',
      data.prenom || '',
      data.phone || '',
      data.email || '',
      data.codePostal || '',
      data.ville || '',
      data.sousSol || '',
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (Ctrl+S) and name the project **"LesEpavistesPro Webhook"**

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set:
   - **Description**: Form submissions webhook
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **Authorize** the app when prompted (click through the "unsafe" warning — it's your own script)
6. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 4: Add the URL to your environment

### Local development (.env.local)
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

### Vercel (production)
1. Go to your Vercel project → **Settings > Environment Variables**
2. Add:
   - **Key**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: Your Web app URL from Step 3
3. **Redeploy** for the variable to take effect

## Data Columns

Each form submission adds a row with:

| Column | Field | Example |
|--------|-------|---------|
| A | Date | 13/02/2026 16:30 |
| B | Service | Enlèvement d'Épave |
| C | Type | Auto / Moto |
| D | Marque | Renault |
| E | Modèle | Clio V |
| F | Année | 2019 |
| G | État | Roulante |
| H | Prénom | Mohamed |
| I | Téléphone | 0612345678 |
| J | Email | client@email.com |
| K | Code Postal | 75001 |
| L | Ville | Paris |
| M | Sous-sol | Non |

## Troubleshooting

- **No data appearing?** Check that the `GOOGLE_SHEETS_WEBHOOK_URL` env variable is set and the app is redeployed
- **Permission error?** Make sure the web app access is set to "Anyone"
- **Need to update the script?** Go to Extensions > Apps Script, edit, then Deploy > Manage deployments > Edit > New version
