import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// HTML Email Template — matches website brand identity
function generateEmailHTML(formData: any) {
  const isEpaviste = formData.service === 'epaviste';
  const serviceName = isEpaviste ? 'Enlèvement d\'Épave' : 'Rachat de Voiture';
  const isMoto = formData.vehicleType === 'moto';
  const etatLabel = formData.etat === 'roulante' ? 'Roulante' : formData.etat === 'non-roulante' ? 'Non roulante' : 'Accidentée';
  const etatColor = formData.etat === 'roulante' ? '#16a34a' : formData.etat === 'non-roulante' ? '#d97706' : '#A92020';
  const dateStr = new Date().toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const whatsappLink = `https://wa.me/33602427345?text=${encodeURIComponent(`Bonjour, suite à la demande de ${formData.prenom} (${formData.phone}) pour ${serviceName} - ${formData.marque} ${formData.modele}`)}`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle Demande - Les Épavistes Pro</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8F9FB; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F9FB; padding: 32px 16px;">
    <tr>
      <td align="center">

        <!-- Pre-header text (hidden) -->
        <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #F8F9FB;">
          ${serviceName} — ${formData.prenom} • ${formData.phone} • ${formData.marque} ${formData.modele} ${formData.annee}
        </div>

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px -4px rgba(20, 38, 65, 0.12);">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background-color: #142641; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 32px 36px 24px 36px;">
                    <!-- Logo -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                          <span style="color: #ffffff;">LesEpavistes</span><span style="color: #A92020;">pro</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 36px 32px 36px;">
                    <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">
                      Nouvelle demande reçue
                    </h1>
                    <p style="margin: 0; color: #D4B372; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                      ${serviceName}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ DATE BAR ═══ -->
          <tr>
            <td style="background-color: #D4B372; padding: 10px 36px;">
              <p style="margin: 0; color: #142641; font-size: 13px; font-weight: 600;">
                Reçu le ${dateStr}
              </p>
            </td>
          </tr>

          <!-- ═══ CLIENT PRIORITY CARD ═══ -->
          <tr>
            <td style="padding: 28px 36px 0 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #142641; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 4px 0; color: #D4B372; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Client</p>
                    <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 20px; font-weight: 700;">${formData.prenom}</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 16px;">
                          <a href="tel:${formData.phone}" style="color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; letter-spacing: 0.5px;">${formData.phone}</a>
                        </td>
                        ${formData.email ? `
                        <td style="border-left: 1px solid rgba(255,255,255,0.2); padding-left: 16px;">
                          <a href="mailto:${formData.email}" style="color: #D4B372; font-size: 13px; text-decoration: none;">${formData.email}</a>
                        </td>
                        ` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ VEHICLE SECTION ═══ -->
          <tr>
            <td style="padding: 28px 36px 0 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 14px; border-bottom: 2px solid #D4B372;">
                    <p style="margin: 0; color: #142641; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Véhicule
                    </p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px;">
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F9FB; border-radius: 8px 8px 0 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Type</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 600;">${isMoto ? 'Moto' : 'Auto'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Marque</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 700;">${formData.marque}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F9FB;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Modèle</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 700;">${formData.modele}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Année</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 600;">${formData.annee}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F9FB; border-radius: 0 0 8px 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">État</td>
                        <td>
                          <span style="display: inline-block; background-color: ${etatColor}; color: #ffffff; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">
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

          <!-- ═══ LOCATION SECTION ═══ -->
          <tr>
            <td style="padding: 28px 36px 0 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 14px; border-bottom: 2px solid #D4B372;">
                    <p style="margin: 0; color: #142641; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Localisation
                    </p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px;">
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F9FB; border-radius: 8px 8px 0 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Code postal</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 700; letter-spacing: 1px;">${formData.codePostal}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${formData.ville ? `
                <tr>
                  <td style="padding: 10px 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Ville</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 700;">${formData.ville}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 14px; ${formData.ville ? 'background-color: #F8F9FB;' : ''} border-radius: 0 0 8px 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="color: #737373; font-size: 13px;">Sous-sol / Parking</td>
                        <td style="color: #142641; font-size: 14px; font-weight: 600;">${formData.sousSol ? 'Oui — accès difficile' : 'Non'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ MESSAGE (if any) ═══ -->
          ${formData.message ? `
          <tr>
            <td style="padding: 28px 36px 0 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 14px; border-bottom: 2px solid #D4B372;">
                    <p style="margin: 0; color: #142641; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Message
                    </p>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 16px; background-color: #F8F9FB; border-left: 4px solid #D4B372; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #142641; font-size: 14px; line-height: 1.7;">${formData.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- ═══ ACTION BUTTONS ═══ -->
          <tr>
            <td style="padding: 32px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Call Button -->
                  <td width="48%" align="center">
                    <a href="tel:${formData.phone}" style="display: block; background-color: #A92020; color: #ffffff; padding: 14px 20px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center;">
                      Appeler ${formData.prenom}
                    </a>
                  </td>
                  <td width="4%"></td>
                  <!-- WhatsApp Button -->
                  <td width="48%" align="center">
                    <a href="${whatsappLink}" target="_blank" style="display: block; background-color: #25D366; color: #ffffff; padding: 14px 20px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
                ${formData.email ? `
                <tr>
                  <td colspan="3" align="center" style="padding-top: 12px;">
                    <a href="mailto:${formData.email}" style="display: inline-block; color: #142641; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 13px; border: 2px solid #e5e5e5;">
                      Envoyer un email
                    </a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background-color: #142641; padding: 24px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">
                      <span style="color: #ffffff;">LesEpavistes</span><span style="color: #A92020;">pro</span>
                    </p>
                    <p style="margin: 0; color: #737373; font-size: 12px; line-height: 1.6;">
                      Service d'enlèvement d'épave et rachat de voiture<br>
                      France entière &bull; 24h/24, 7j/7
                    </p>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <p style="margin: 0; color: #D4B372; font-size: 12px; font-weight: 600;">
                      09 79 04 94 86
                    </p>
                    <p style="margin: 4px 0 0 0;">
                      <a href="https://www.lesepavistespro.fr" style="color: #737373; font-size: 12px; text-decoration: none;">
                        lesepavistespro.fr
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Sub-footer -->
        <table width="600" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 16px 0;">
              <p style="margin: 0; color: #a3a3a3; font-size: 11px;">
                Cet email a été généré automatiquement suite à une demande sur lesepavistespro.fr
              </p>
            </td>
          </tr>
        </table>

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
Année: ${formData.annee}
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
            annee: formData.annee,
            etat: formData.etat === 'roulante' ? 'Roulante' : formData.etat === 'non-roulante' ? 'Non roulante' : 'Accidentée',
            prenom: formData.prenom,
            phone: formData.phone,
            email: formData.email || '',
            codePostal: formData.codePostal,
            ville: formData.ville || '',
            sousSol: formData.sousSol ? 'Oui' : 'Non',
            source: formData.pageType || 'home',
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
