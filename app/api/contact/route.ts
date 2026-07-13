import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ── Déduplication côté serveur ──────────────────────────────────────────────
// Évite les doublons (11% du CSV analysé) causés par le double-clic ou le
// rechargement de page après soumission. Même téléphone → bloqué 5 min.
const DEDUP_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const recentSubmissions = new Map<string, number>(); // phone → timestamp

function isDuplicate(phone: string): boolean {
  const normalizedPhone = phone.replace(/\s/g, '');
  const lastSubmit = recentSubmissions.get(normalizedPhone);
  const now = Date.now();
  if (lastSubmit && now - lastSubmit < DEDUP_WINDOW_MS) {
    return true;
  }
  recentSubmissions.set(normalizedPhone, now);
  // Nettoyage périodique — évite une fuite mémoire sur longue durée
  if (recentSubmissions.size > 500) {
    for (const [key, ts] of recentSubmissions.entries()) {
      if (now - ts > DEDUP_WINDOW_MS) recentSubmissions.delete(key);
    }
  }
  return false;
}
// ─────────────────────────────────────────────────────────────────────────────


// HTML Email Template — mirrors website design system exactly
function generateEmailHTML(formData: any) {
  const isEpaviste = formData.service === 'epaviste';
  const serviceName = isEpaviste ? 'Enlèvement d\'Épave' : 'Rachat de Voiture';
  const serviceAccent = isEpaviste ? '#A92020' : '#D4B372';
  const isMoto = formData.vehicleType === 'moto';
  const etatLabel = formData.etat === 'roulante' ? 'Roulante' : formData.etat === 'non-roulante' ? 'Non roulante' : 'Accidentée';
  const etatBg = formData.etat === 'roulante' ? '#dcfce7' : formData.etat === 'non-roulante' ? '#fef3c7' : '#fee2e2';
  const etatText = formData.etat === 'roulante' ? '#166534' : formData.etat === 'non-roulante' ? '#92400e' : '#991b1b';
  const dateStr = new Date().toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const whatsappLink = `https://wa.me/33602427345?text=${encodeURIComponent(`Bonjour, suite à la demande de ${formData.prenom} (${formData.phone}) pour ${serviceName} - ${formData.marque} ${formData.modele}`)}`;

  // Helper for data rows
  const dataRow = (label: string, value: string, isAlt = false) => `
    <tr>
      <td style="padding: 12px 16px;${isAlt ? ' background-color: #fafafa;' : ''}">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="140" style="color: #a3a3a3; font-size: 13px; font-weight: 500; vertical-align: top;">${label}</td>
            <td style="color: #142641; font-size: 14px; font-weight: 600;">${value}</td>
          </tr>
        </table>
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle Demande - Les Épavistes Pro</title>
  <!--[if mso]><style>body,table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F9FB; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">

  <!-- Hidden preheader -->
  <div style="display:none;font-size:1px;color:#F8F9FB;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${formData.prenom} — ${formData.phone} — ${formData.marque} ${formData.modele} ${formData.immatriculation} — ${formData.ville || formData.codePostal}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F9FB;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- ════════════════════════════════════════════ -->
        <!-- OUTER CARD — like website's white card style -->
        <!-- ════════════════════════════════════════════ -->
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e5e5;">

          <!-- ── TOP BAR: thin accent line ── -->
          <tr>
            <td style="height: 4px; background-color: ${serviceAccent}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- ── HEADER AREA ── -->
          <tr>
            <td style="padding: 36px 40px 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Logo -->
                  <td>
                    <p style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; line-height: 1;">
                      <span style="color: #142641;">LesEpavistes</span><span style="color: #A92020;">pro</span>
                    </p>
                  </td>
                  <!-- Service pill badge — like website's announcement pill -->
                  <td align="right">
                    <span style="display: inline-block; background-color: ${isEpaviste ? '#fee2e2' : '#FFFAEB'}; color: ${isEpaviste ? '#A92020' : '#92400e'}; padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 0.3px;">
                      ${serviceName}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── HEADLINE ── -->
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <h1 style="margin: 0; color: #142641; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2;">
                Nouvelle demande
              </h1>
              <p style="margin: 8px 0 0 0; color: #a3a3a3; font-size: 14px; font-weight: 400;">
                ${dateStr}
              </p>
            </td>
          </tr>

          <!-- ── SEPARATOR ── -->
          <tr>
            <td style="padding: 24px 40px 0 40px;">
              <div style="height: 1px; background-color: #e5e5e5;"></div>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- CLIENT CARD — navy card like hero -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="padding: 24px 40px 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #142641; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <!-- Name -->
                    <p style="margin: 0 0 2px 0; color: #D4B372; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                      Client
                    </p>
                    <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                      ${formData.prenom}
                    </p>
                    <!-- Phone + Email row -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <a href="tel:${formData.phone}" style="display: inline-block; background-color: #A92020; color: #ffffff; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: 0.3px;">
                            ${formData.phone}
                          </a>
                        </td>
                        ${formData.email ? `
                        <td style="padding-left: 12px;">
                          <a href="mailto:${formData.email}" style="display: inline-block; border: 1px solid rgba(255,255,255,0.2); color: #D4B372; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 500;">
                            ${formData.email}
                          </a>
                        </td>
                        ` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- VEHICLE CARD                      -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <!-- Section label — like website's red uppercase labels -->
              <p style="margin: 0 0 16px 0; color: ${serviceAccent}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                Véhicule
              </p>
              <!-- Data card — like website's white bordered cards -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden;">
                ${dataRow('Type', isMoto ? 'Moto' : 'Auto', false)}
                ${dataRow('Marque', formData.marque, true)}
                ${dataRow('Modèle', formData.modele, false)}
                ${dataRow('Immatriculation', formData.immatriculation, true)}
                <tr>
                  <td style="padding: 12px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="140" style="color: #a3a3a3; font-size: 13px; font-weight: 500; vertical-align: middle;">État</td>
                        <td>
                          <span style="display: inline-block; background-color: ${etatBg}; color: ${etatText}; padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700;">
                            ${etatLabel}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- LOCATION CARD                     -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <p style="margin: 0 0 16px 0; color: ${serviceAccent}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                Localisation
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden;">
                ${dataRow('Code postal', `<span style="letter-spacing: 1.5px; font-weight: 700;">${formData.codePostal}</span>`, false)}
                ${formData.ville ? dataRow('Ville', formData.ville, true) : ''}
                ${dataRow('Sous-sol', formData.sousSol ? '<span style="color: #A92020; font-weight: 700;">Oui — accès difficile</span>' : 'Non', formData.ville ? false : true)}
              </table>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- MESSAGE (optional)                -->
          <!-- ══════════════════════════════════ -->
          ${formData.message ? `
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <p style="margin: 0 0 16px 0; color: ${serviceAccent}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                Message
              </p>
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 16px; padding: 20px 24px;">
                <p style="margin: 0; color: #142641; font-size: 14px; line-height: 1.7;">${formData.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- ── SEPARATOR ── -->
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <div style="height: 1px; background-color: #e5e5e5;"></div>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- ACTION BUTTONS — pill style        -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="padding: 28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Call — primary red pill -->
                  <td width="32%" align="center">
                    <a href="tel:${formData.phone}" style="display: block; background-color: #A92020; color: #ffffff; padding: 14px 8px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center;">
                      Appeler
                    </a>
                  </td>
                  <td width="2%"></td>
                  <!-- WhatsApp — green pill -->
                  <td width="32%" align="center">
                    <a href="${whatsappLink}" target="_blank" style="display: block; background-color: #25D366; color: #ffffff; padding: 14px 8px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center;">
                      WhatsApp
                    </a>
                  </td>
                  <td width="2%"></td>
                  <!-- Email — outline navy pill -->
                  <td width="32%" align="center">
                    <a href="mailto:${formData.email || 'lesepavistespro@gmail.com'}" style="display: block; border: 2px solid #142641; color: #142641; padding: 12px 8px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center;">
                      Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- TRUST BADGES — like TrustBadges   -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="padding: 0 40px 28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #e5e5e5; padding-top: 20px;">
                <tr>
                  <td width="25%" align="center" style="padding: 12px 4px;">
                    <p style="margin: 0 0 4px 0; color: ${serviceAccent}; font-size: 18px; font-weight: 800;">24h</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 11px; font-weight: 500;">Intervention</p>
                  </td>
                  <td width="25%" align="center" style="padding: 12px 4px;">
                    <p style="margin: 0 0 4px 0; color: ${serviceAccent}; font-size: 18px; font-weight: 800;">100%</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 11px; font-weight: 500;">Gratuit</p>
                  </td>
                  <td width="25%" align="center" style="padding: 12px 4px;">
                    <p style="margin: 0 0 4px 0; color: ${serviceAccent}; font-size: 18px; font-weight: 800;">7j/7</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 11px; font-weight: 500;">Disponible</p>
                  </td>
                  <td width="25%" align="center" style="padding: 12px 4px;">
                    <p style="margin: 0 0 4px 0; color: ${serviceAccent}; font-size: 18px; font-weight: 800;">VHU</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 11px; font-weight: 500;">Agréé</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════════════════════════════ -->
          <!-- FOOTER — navy like website footer  -->
          <!-- ══════════════════════════════════ -->
          <tr>
            <td style="background-color: #142641; padding: 28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 800; letter-spacing: -0.3px;">
                      <span style="color: #ffffff;">LesEpavistes</span><span style="color: #A92020;">pro</span>
                    </p>
                    <p style="margin: 0; color: #525252; font-size: 12px; line-height: 1.8;">
                      Enlèvement d'épave &amp; rachat de voiture<br>
                      France entière
                    </p>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <p style="margin: 0 0 4px 0;">
                      <a href="tel:0979049486" style="color: #D4B372; font-size: 14px; font-weight: 700; text-decoration: none;">09 79 04 94 86</a>
                    </p>
                    <p style="margin: 0;">
                      <a href="https://www.lesepavistespro.fr" style="color: #525252; font-size: 12px; text-decoration: none;">www.lesepavistespro.fr</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Micro footer -->
        <p style="margin: 20px 0 0 0; color: #d4d4d4; font-size: 11px; text-align: center;">
          Email généré automatiquement &bull; lesepavistespro.fr
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // ── Déduplication — même téléphone dans les 5 min → silently ACK ──────
    if (formData.phone && isDuplicate(formData.phone)) {
      console.warn(`⚠️  Doublon détecté (${formData.phone}) — soumission ignorée`);
      return NextResponse.json({
        success: true,
        message: 'Demande envoyée avec succès',
        deduplicated: true,
      });
    }
    // ─────────────────────────────────────────────────────────────────────

    // Generate HTML email
    const emailHTML = generateEmailHTML(formData);


    // Plain text version for email clients that don't support HTML
    const emailText = `
Nouvelle demande de devis - Les Épavistes Pro
=============================================

SERVICE: ${formData.service === 'epaviste' ? 'Enlèvement d\'Épave' : 'Rachat de Voiture'}

VÉHICULE
--------
Type: ${formData.vehicleType === 'moto' ? 'Moto' : 'Auto'}
Marque: ${formData.marque}
Modèle: ${formData.modele}
Immatriculation: ${formData.immatriculation}
État: ${formData.etat === 'roulante' ? 'Roulante' : formData.etat === 'non-roulante' ? 'Non roulante' : 'Accidentée'}

CONTACT
-------
Prénom: ${formData.prenom}
Téléphone: ${formData.phone}
Email: ${formData.email || 'Non renseigné'}

LOCALISATION
------------
Code postal: ${formData.codePostal}
Ville: ${formData.ville || 'Non renseignée'}
Sous-sol/Parking: ${formData.sousSol ? 'Oui' : 'Non'}

Date: ${new Date().toLocaleString('fr-FR')}
    `;

    console.log('Form submission received:', formData);

    // Send email using Resend (only if API key is configured)
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: ['lesepavistespro@gmail.com'],
          replyTo: formData.email,
          subject: `Nouvelle demande ${formData.service === 'epaviste' ? 'Épaviste' : 'Rachat'} — ${formData.prenom} | ${formData.marque} ${formData.modele} | ${formData.phone}`,
          html: emailHTML,
          text: emailText,
        });

        if (error) {
          console.error('❌ Resend error:', JSON.stringify(error, null, 2));
          console.error('Error details:', error);
        } else {
          console.log('✅ Email sent successfully!');
          console.log('Email ID:', data?.id);
          console.log('Sent to:', 'lesepavistespro@gmail.com');
        }
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        console.error('Error type:', typeof emailError);
        console.error('Error message:', emailError instanceof Error ? emailError.message : 'Unknown error');
      }
    } else {
      console.warn('⚠️ Resend not configured - email not sent. Add RESEND_API_KEY to environment variables.');
    }

    // Send to Google Sheets (non-blocking)
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: new Date().toLocaleString('fr-FR'),
            service: formData.service === 'epaviste' ? 'Enlèvement d\'Épave' : 'Rachat de Voiture',
            vehicleType: formData.vehicleType === 'moto' ? 'Moto' : 'Auto',
            marque: formData.marque,
            modele: formData.modele,
            immatriculation: formData.immatriculation,
            etat: formData.etat === 'roulante' ? 'Roulante' : formData.etat === 'non-roulante' ? 'Non roulante' : 'Accidentée',
            prenom: formData.prenom,
            phone: formData.phone,
            email: formData.email || '',
            codePostal: formData.codePostal,
            ville: formData.ville || '',
            sousSol: formData.sousSol ? 'Oui' : 'Non',
            source: formData.pageType || 'home',
            // Segment géographique — alimenté par GA4 event côté front
            leadRegion: formData.leadRegionTag || 'lead_autre_region',
          }),
        });
        console.log('✅ Google Sheets: data sent');
      } catch (sheetError) {
        console.error('❌ Google Sheets error:', sheetError);
      }
    } else {
      console.warn('⚠️ GOOGLE_SHEETS_WEBHOOK_URL not set - skipping Sheets');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Demande envoyée avec succès' 
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}
