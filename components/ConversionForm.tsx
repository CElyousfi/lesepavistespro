'use client';

import { useState } from 'react';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Clock, Shield, Truck, X } from '@phosphor-icons/react';

interface FormData {
  service: 'epaviste' | 'rachat' | '';
  vehicleType: string;
  vehicleCondition: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  postalCode: string;
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
  const [formData, setFormData] = useState<FormData>({
    service: defaultService || '',
    vehicleType: '',
    vehicleCondition: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    postalCode: '',
    message: '',
  });

  const totalSteps = 4;

  // Update form data
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send to your backend/email service
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Merci ! Nous vous contactons dans les 15 minutes. 📞');
    
    // Reset form
    setFormData({
      service: defaultService || '',
      vehicleType: '',
      vehicleCondition: '',
      name: '',
      phone: '',
      email: '',
      city: '',
      postalCode: '',
      message: '',
    });
    setStep(1);
    setIsOpen(false);
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
    if (step === 3 && formData.vehicleCondition) {
      return {
        icon: <Clock size={24} weight="bold" className="text-brand-red" />,
        title: "Intervention sous 24-48h",
        message: "Nous venons chez vous. Aucun déplacement nécessaire !",
      };
    }
    if (step === 4) {
      return {
        icon: <Shield size={24} weight="bold" className="text-brand-blue" />,
        title: "Certificat de destruction garanti",
        message: "Vous êtes dégagé de toute responsabilité légale !",
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
            {[1, 2, 3, 4].map((s) => (
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
          <div className="mx-6 mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
            {conversionMsg.icon}
            <div>
              <div className="font-bold text-neutral-900">{conversionMsg.title}</div>
              <div className="text-sm text-neutral-600">{conversionMsg.message}</div>
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

          {/* Step 2: Vehicle Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Parlez-nous de votre véhicule
              </h3>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Type de véhicule *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => updateField('vehicleType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  <option value="voiture">Voiture</option>
                  <option value="utilitaire">Utilitaire</option>
                  <option value="moto">Moto</option>
                  <option value="camion">Camion</option>
                </select>
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
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => formData.vehicleType && formData.vehicleCondition && setStep(3)}
                  disabled={!formData.vehicleType || !formData.vehicleCondition}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Où se trouve votre véhicule ?
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Ex: Paris"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="Ex: 75001"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Informations complémentaires (optionnel)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Marque, modèle, année, état général..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-brand-blue focus:outline-none resize-none"
                />
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
                  onClick={() => formData.city && formData.postalCode && setStep(4)}
                  disabled={!formData.city || !formData.postalCode}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Comment vous contacter ?
              </h3>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
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
                  onClick={() => setStep(3)}
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
    </div>
  );
}
