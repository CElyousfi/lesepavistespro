import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// HTML Email Template
function generateEmailHTML(formData: any) {
  const serviceColor = formData.service === 'epaviste' ? '#DC2626' : '#D97706';
  const serviceName = formData.service === 'epaviste' ? 'Enlèvement d\'Épave' : 'Rachat de Voiture';
  const serviceIcon = formData.service === 'epaviste' ? '🚛' : '💰';
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle Demande - Les Épavistes Pro</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #002654 0%, #003d7a 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ${serviceIcon} Nouvelle Demande
              </h1>
              <p style="margin: 10px 0 0 0; color: #e5e7eb; font-size: 16px;">
                Les Épavistes Pro
              </p>
            </td>
          </tr>

          <!-- Service Badge -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <div style="background-color: ${serviceColor}; color: #ffffff; padding: 12px 20px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                ${serviceName}
              </div>
              <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
                Reçu le ${new Date().toLocaleString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </td>
          </tr>

          <!-- Vehicle Information -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                🚗 Informations du Véhicule
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0" border="0">
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; width: 40%; padding: 8px 10px;">Marque</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 10px;">${formData.marque}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Modèle</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">${formData.modele}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 10px;">Année</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 10px;">${formData.annee}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">État</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">
                    ${formData.etat === 'roulante' ? '✅ Roulante' : formData.etat === 'non-roulante' ? '⚠️ Non roulante' : '🚨 Accidentée'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                👤 Coordonnées du Client
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0" border="0">
                <tr>
                  <td style="color: #6b7280; font-size: 14px; width: 40%; padding: 8px 0;">Prénom</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">${formData.prenom}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 10px;">Téléphone</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 10px;">
                    <a href="tel:${formData.phone}" style="color: #DC2626; text-decoration: none; font-weight: bold; font-size: 16px;">📞 ${formData.phone}</a>
                  </td>
                </tr>
                ${formData.email ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Email</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">
                    <a href="mailto:${formData.email}" style="color: #DC2626; text-decoration: none;">${formData.email}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Location Information -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                📍 Localisation
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0" border="0">
                <tr>
                  <td style="color: #6b7280; font-size: 14px; width: 40%; padding: 8px 0;">Code postal</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">${formData.codePostal}</td>
                </tr>
                ${formData.ville ? `
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 10px;">Ville</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 10px;">${formData.ville}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Sous-sol / Parking</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 600; padding: 8px 0;">
                    ${formData.sousSol ? '✅ Oui' : '❌ Non'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          ${formData.message ? `
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                💬 Message Complémentaire
              </h2>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  ${formData.message}
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Quick Actions -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb;">
              <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold; text-align: center;">
                Actions Rapides
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 5px;">
                    <a href="tel:${formData.phone}" style="display: inline-block; background-color: #DC2626; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                      📞 Appeler le client
                    </a>
                  </td>
                  <td align="center" style="padding: 5px;">
                    <a href="mailto:${formData.email}" style="display: inline-block; background-color: #002654; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                      ✉️ Envoyer un email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Les Épavistes Pro - Service d'enlèvement d'épave 24h/24, 7j/7<br>
                Île-de-France • 09 79 04 94 86 • contact@lesepavistespro.fr
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
          subject: `🚗 Nouvelle demande: ${formData.service === 'epaviste' ? 'Épaviste' : 'Rachat'} - ${formData.prenom} (${formData.phone})`,
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
