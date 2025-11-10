'use client';

import { useState } from 'react';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Clock, Shield, Truck, X, Car } from '@phosphor-icons/react';

interface FormData {
  service: 'epaviste' | 'rachat' | '';
  // Vehicle details
  immatriculation: string;
  marque: string;
  modele: string;
  annee: string;
  energie: string;
  boite: string;
  kilometrage: string;
  vehicleCondition: string;
  // Contact info
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  codePostal: string;
  ville: string;
  departement: string;
  message: string;
}

interface ConversionFormProps {
  defaultService?: 'epaviste' | 'rachat';
  trigger?: 'button' | 'inline';
  buttonText?: string;
}

export default function ConversionForm({ 
  defaultService, 
  trigger = 'button',
  buttonText = "Obtenir mon devis gratuit"
}: ConversionFormProps) {
  const [isOpen, setIsOpen] = useState(trigger === 'inline');
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: defaultService || '',
    immatriculation: '',
    marque: '',
    modele: '',
    annee: '',
    energie: '',
    boite: '',
    kilometrage: '',
    vehicleCondition: '',
    nom: '',
    prenom: '',
    phone: '',
    email: '',
    codePostal: '',
    ville: '',
    departement: '',
    message: '',
  });

  const totalSteps = 5;

  // Update form data
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send form data to API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Form submitted successfully:', formData);
      } else {
        console.error('Form submission failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    // Show success modal regardless (better UX)
    setShowSuccess(true);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setFormData({
        service: defaultService || '',
        immatriculation: '',
        marque: '',
        modele: '',
        annee: '',
        energie: '',
        boite: '',
        kilometrage: '',
        vehicleCondition: '',
        nom: '',
        prenom: '',
        phone: '',
        email: '',
        codePostal: '',
        ville: '',
        departement: '',
        message: '',
      });
      setStep(1);
      if (trigger === 'button') {
        setIsOpen(false);
      }
    }, 5000);
  };

  // Conversion triggers based on selections
  const getConversionMessage = () => {
    if (step === 2 && formData.service === 'epaviste') {
      return {
        icon: <CheckCircle size={24} weight="bold" className="text-green-500" />,
        title: "Service 100% GRATUIT",
        message: "Aucun frais caché. Nous payons même le remorquage !",
      };
    }
    if (step === 2 && formData.service === 'rachat') {
      return {
        icon: <CurrencyEur size={24} weight="bold" className="text-brand-gold" />,
        title: "Paiement IMMÉDIAT",
        message: "Cash en main ou virement le jour même. Meilleur prix garanti !",
      };
    }
    if (step === 3 && formData.marque) {
      return {
        icon: <Car size={24} weight="bold" className="text-brand-blue" />,
        title: "Estimation personnalisée",
        message: "Nous connaissons bien votre modèle. Prix juste garanti !",
      };
    }
    if (step === 4) {
      return {
        icon: <Clock size={24} weight="bold" className="text-brand-red" />,
        title: "Intervention sous 24-48h",
        message: "Nous venons chez vous. Aucun déplacement nécessaire !",
      };
    }
    if (step === 5) {
      return {
        icon: <Shield size={24} weight="bold" className="text-brand-blue" />,
        title: "Réponse en moins de 15 minutes",
        message: "Nous vous contactons rapidement avec votre devis personnalisé !",
      };
    }
    return null;
  };

  const conversionMsg = getConversionMessage();

  // Render trigger button
  if (trigger === 'button' && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <Truck size={20} weight="bold" />
        {buttonText}
      </button>
    );
  }

  return (
    <div className={`${trigger === 'inline' ? 'relative' : 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${trigger === 'inline' ? '' : 'max-w-2xl max-h-[90vh] overflow-y-auto'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white p-6 rounded-t-2xl relative">
          {trigger === 'button' && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} weight="bold" />
            </button>
          )}
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {formData.service === 'epaviste' ? 'Enlèvement Gratuit' : 
             formData.service === 'rachat' ? 'Rachat Immédiat' : 
             'Demande de Devis'}
          </h2>
          <p className="text-neutral-200">
            Réponse en moins de 15 minutes • Service 24h/24
          </p>
          
          {/* Progress bar */}
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-brand-gold' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Conversion Message */}
        {conversionMsg && (
          <div className="mx-6 mt-6 p-4 bg-gradient-to-r from-brand-red/10 to-brand-gold/10 border-2 border-brand-red/30 rounded-2xl flex items-start gap-3 animate-fadeIn shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center">
              {conversionMsg.icon}
            </div>
            <div>
              <div className="font-bold text-brand-navy text-lg">{conversionMsg.title}</div>
              <div className="text-sm text-neutral-700 mt-1">{conversionMsg.message}</div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Quel service vous intéresse ?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    updateField('service', 'epaviste');
                    setStep(2);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.service === 'epaviste'
                      ? 'border-brand-red bg-brand-red/5'
                      : 'border-neutral-200 hover:border-brand-red'
                  }`}
                >
                  <Truck size={32} weight="bold" className="text-brand-red mb-3" />
                  <div className="font-bold text-lg mb-1">Enlèvement d'Épave</div>
                  <div className="text-sm text-neutral-600">
                    Service 100% gratuit • Certificat VHU
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateField('service', 'rachat');
                    setStep(2);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.service === 'rachat'
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-neutral-200 hover:border-brand-gold'
                  }`}
                >
                  <CurrencyEur size={32} weight="bold" className="text-brand-gold mb-3" />
                  <div className="font-bold text-lg mb-1">Rachat de Voiture</div>
                  <div className="text-sm text-neutral-600">
                    Paiement cash immédiat • Meilleur prix
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Identification */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Identification du véhicule
              </h3>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Immatriculation *
                </label>
                <input
                  type="text"
                  value={formData.immatriculation}
                  onChange={(e) => updateField('immatriculation', e.target.value.toUpperCase())}
                  placeholder="Ex: AB-123-CD"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none uppercase"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Marque *
                  </label>
                  <input
                    type="text"
                    value={formData.marque}
                    onChange={(e) => updateField('marque', e.target.value)}
                    placeholder="Ex: Renault"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    value={formData.modele}
                    onChange={(e) => updateField('modele', e.target.value)}
                    placeholder="Ex: Clio"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => formData.immatriculation && formData.marque && formData.modele && setStep(3)}
                  disabled={!formData.immatriculation || !formData.marque || !formData.modele}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Détails du véhicule
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Année de mise en circulation *
                  </label>
                  <input
                    type="text"
                    value={formData.annee}
                    onChange={(e) => updateField('annee', e.target.value)}
                    placeholder="Ex: 2015"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Kilométrage *
                  </label>
                  <input
                    type="text"
                    value={formData.kilometrage}
                    onChange={(e) => updateField('kilometrage', e.target.value)}
                    placeholder="Ex: 150000 km"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Énergie *
                  </label>
                  <select
                    value={formData.energie}
                    onChange={(e) => updateField('energie', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="essence">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="electrique">Électrique</option>
                    <option value="hybride">Hybride</option>
                    <option value="gpl">GPL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Boîte de vitesse *
                  </label>
                  <select
                    value={formData.boite}
                    onChange={(e) => updateField('boite', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="manuelle">Manuelle</option>
                    <option value="automatique">Automatique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  État du véhicule *
                </label>
                <select
                  value={formData.vehicleCondition}
                  onChange={(e) => updateField('vehicleCondition', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  <option value="roulant">Roulant</option>
                  <option value="non-roulant">Non roulant</option>
                  <option value="accidente">Accidenté</option>
                  <option value="panne">En panne</option>
                  <option value="epave">Épave</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => formData.annee && formData.kilometrage && formData.energie && formData.boite && formData.vehicleCondition && setStep(4)}
                  disabled={!formData.annee || !formData.kilometrage || !formData.energie || !formData.boite || !formData.vehicleCondition}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Location Details */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Informations complémentaires
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={formData.codePostal}
                    onChange={(e) => updateField('codePostal', e.target.value)}
                    placeholder="Ex: 75001"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Département *
                  </label>
                  <input
                    type="text"
                    value={formData.departement}
                    onChange={(e) => updateField('departement', e.target.value)}
                    placeholder="Ex: 75"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => formData.codePostal && formData.departement && setStep(5)}
                  disabled={!formData.codePostal || !formData.departement}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Contact Info (FINAL) */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Commençons par vos coordonnées
              </h3>
              <p className="text-neutral-600">
                Pour vous recontacter rapidement avec votre devis personnalisé
              </p>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => updateField('nom', e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Ex: 06 12 34 56 78"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  value={formData.ville}
                  onChange={(e) => updateField('ville', e.target.value)}
                  placeholder="Ex: Paris"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Message complémentaire
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Ex: Le véhicule est dans un garage, besoin d'un treuil..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none resize-none"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Précisez si le véhicule nécessite un treuil, s'il est dans un garage, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Ex: jean.dupont@email.com"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              {/* Trust signals before submit */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle size={20} weight="bold" className="text-green-600" />
                  <span>Réponse garantie en moins de 15 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle size={20} weight="bold" className="text-green-600" />
                  <span>Aucun engagement • Devis 100% gratuit</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle size={20} weight="bold" className="text-green-600" />
                  <span>Vos données sont sécurisées et confidentielles</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-red to-brand-red-light text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={20} weight="bold" />
                  Envoyer ma demande
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Alternative contact methods */}
        <div className="px-6 pb-6 border-t border-neutral-200 pt-6">
          <p className="text-center text-sm text-neutral-600 mb-4">
            Ou contactez-nous directement :
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:0979049486"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-brand-blue text-brand-blue rounded-xl font-semibold hover:bg-brand-blue hover:text-white transition-all"
            >
              <Phone size={20} weight="bold" />
              09 79 04 94 86
            </a>
            <a
              href="https://wa.me/33602427345"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-whatsapp text-white rounded-xl font-semibold hover:bg-whatsapp-hover transition-all"
            >
              <WhatsappLogo size={20} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-fadeIn">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-red to-brand-gold flex items-center justify-center">
              <CheckCircle size={48} weight="bold" className="text-white" />
            </div>

            {/* Thank You Message */}
            <h3 className="text-3xl font-bold text-brand-navy mb-4">
              Merci pour votre confiance !
            </h3>
            
            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
              Votre demande a bien été reçue. Nous vous recontacterons dans les prochaines <span className="font-bold text-brand-red">24h-48h</span> pour finaliser votre dossier.
            </p>

            {/* Contact Info Reminder */}
            <div className="bg-gradient-to-r from-brand-navy/5 to-brand-blue/5 rounded-2xl p-4 mb-6">
              <p className="text-sm text-neutral-600 mb-2">
                Besoin d'une réponse plus rapide ?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href="tel:0979049486"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg font-semibold hover:bg-brand-red-light transition-all text-sm"
                >
                  <Phone size={16} weight="bold" />
                  09 79 04 94 86
                </a>
                <a
                  href="https://wa.me/33602427345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-whatsapp text-white rounded-lg font-semibold hover:bg-whatsapp-hover transition-all text-sm"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccess(false);
                setFormData({
                  service: defaultService || '',
                  immatriculation: '',
                  marque: '',
                  modele: '',
                  annee: '',
                  energie: '',
                  boite: '',
                  kilometrage: '',
                  vehicleCondition: '',
                  nom: '',
                  prenom: '',
                  phone: '',
                  email: '',
                  codePostal: '',
                  ville: '',
                  departement: '',
                  message: '',
                });
                setStep(1);
                if (trigger === 'button') {
                  setIsOpen(false);
                }
              }}
              className="w-full px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-semibold transition-all"
            >
              Fermer
            </button>

            <p className="text-xs text-neutral-500 mt-4">
              Cette fenêtre se fermera automatiquement dans quelques secondes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
