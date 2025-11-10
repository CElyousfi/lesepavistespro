import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Here you would integrate with your email service
    // Options:
    // 1. SendGrid
    // 2. Resend
    // 3. Nodemailer with SMTP
    // 4. Your hosting provider's email service

    // For now, we'll log the data and return success
    console.log('Form submission received:', formData);

    // Format email content
    const emailContent = `
Nouvelle demande de devis - Les Épavistes Pro
=============================================

SERVICE
-------
${formData.service === 'epaviste' ? 'Enlèvement d\'Épave' : 'Rachat de Voiture'}

VÉHICULE
--------
Immatriculation: ${formData.immatriculation}
Marque: ${formData.marque}
Modèle: ${formData.modele}
Année: ${formData.annee}
Kilométrage: ${formData.kilometrage}
Énergie: ${formData.energie}
Boîte: ${formData.boite}
État: ${formData.vehicleCondition}

LOCALISATION
------------
Ville: ${formData.ville}
Code postal: ${formData.codePostal}
Département: ${formData.departement}

CONTACT
-------
Nom: ${formData.nom}
Prénom: ${formData.prenom || 'Non renseigné'}
Téléphone: ${formData.phone}
Email: ${formData.email}

MESSAGE
-------
${formData.message || 'Aucun message complémentaire'}

=============================================
Date: ${new Date().toLocaleString('fr-FR')}
    `;

    console.log('Email content:', emailContent);

    // TODO: Send email using your preferred service
    // Example with Resend (you'll need to install and configure):
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@lesepavistespro.fr',
    //   to: 'contact@lesepavistespro.fr',
    //   subject: `Nouvelle demande: ${formData.service} - ${formData.nom}`,
    //   text: emailContent,
    // });

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
