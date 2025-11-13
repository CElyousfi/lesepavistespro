'use client';

import { useState, useEffect } from 'react';
import { Phone, WhatsappLogo, CheckCircle, X, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { trackFormSubmit } from '@/lib/analytics';

interface FormData {
  service: 'epaviste' | 'rachat' | '';
  // Step 1: Vehicle
  marque: string;
  modele: string;
  annee: string;
  etat: 'roulante' | 'non-roulante' | 'accidentee' | '';
  // Step 2: Location
  codePostal: string;
  ville: string;
  sousSol: boolean;
  // Step 3: Contact
  prenom: string;
  phone: string;
  email: string;
  // Hidden tracking fields
  department?: string;
  city?: string;
  pageType?: string;
}

interface ConversionFormProps {
  defaultService?: 'epaviste' | 'rachat';
  trigger?: 'button' | 'inline';
  buttonText?: string;
  cityName?: string;
  departmentName?: string;
  pageType?: 'home' | 'pillar' | 'department' | 'city';
}

export default function ConversionFormNew({ 
  defaultService, 
  trigger = 'button',
  buttonText = "📞 Être rappelé en 15 min",
  cityName,
  departmentName,
  pageType = 'home'
}: ConversionFormProps) {
  const [isOpen, setIsOpen] = useState(trigger === 'inline');
  const [step, setStep] = useState(defaultService ? 2 : 1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    service: defaultService || '',
    marque: '',
    modele: '',
    annee: '',
    etat: '',
    codePostal: '',
    ville: cityName || '',
    sousSol: false,
    prenom: '',
    phone: '',
    email: '',
    // Hidden tracking fields
    department: departmentName,
    city: cityName,
    pageType: pageType,
  });

  const totalSteps = 3;
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Update form data with validation
  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track form start on first interaction
    if (!hasStartedForm) {
      setHasStartedForm(true);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_start', {
          service: formData.service || defaultService,
          page_type: formData.pageType,
          department: formData.department,
          city: formData.city,
        });
      }
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validation functions
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.service) {
        newErrors.service = 'Choisissez un service';
      }
    }

    if (currentStep === 2) {
      if (!formData.marque) newErrors.marque = 'Indiquez la marque';
      if (!formData.modele) newErrors.modele = 'Indiquez le modèle';
      if (!formData.annee) newErrors.annee = 'Indiquez l\'année';
      if (!formData.etat) newErrors.etat = 'Précisez l\'état';
    }

    if (currentStep === 3) {
      if (!formData.codePostal) newErrors.codePostal = 'Code postal requis';
      if (formData.codePostal && !/^\d{5}$/.test(formData.codePostal)) {
        newErrors.codePostal = 'Code postal invalide (5 chiffres)';
      }
    }

    if (currentStep === 4) {
      if (!formData.prenom) newErrors.prenom = 'Votre prénom pour vous rappeler';
      if (!formData.phone) newErrors.phone = 'Numéro requis pour vous rappeler';
      if (formData.phone && !/^0[1-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Numéro invalide (ex: 06 12 34 56 78)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Track form submission
    trackFormSubmit(formData.service || 'unknown');
    
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
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Track success modal display
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_success_displayed', {
        service: formData.service,
        page_type: formData.pageType,
        department: formData.department,
        city: formData.city,
      });
    }
    
    // Auto-close after 8 seconds
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setFormData({
        service: defaultService || '',
        marque: '',
        modele: '',
        annee: '',
        etat: '',
        codePostal: '',
        ville: cityName || '',
        sousSol: false,
        prenom: '',
        phone: '',
        email: '',
      });
      setStep(defaultService ? 2 : 1);
      if (trigger === 'button') {
        setIsOpen(false);
      }
    }, 8000);
  };

  // Next step handler
  const handleNext = () => {
    if (validateStep(step)) {
      const nextStep = Math.min(step + 1, totalSteps + 1);
      setStep(nextStep);
      
      // Track form step progression
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_step', {
          step_number: nextStep,
          service: formData.service,
          page_type: formData.pageType,
          department: formData.department,
          city: formData.city,
        });
      }
    }
  };

  // Previous step handler
  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Get step title
  const getStepTitle = () => {
    if (step === 1) return 'Quel service ?';
    if (step === 2) return 'Votre véhicule';
    if (step === 3) return 'Lieu d\'enlèvement';
    if (step === 4) return 'Vos coordonnées';
    return '';
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
          {/* Hero Section with Illustration */}
          <div className="relative bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-blue p-8 md:p-12 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Success Icon with Animation */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle size={56} weight="fill" className="text-green-500" />
                </div>
              </div>
              
              {/* Illustration */}
              <div className="mb-6">
                <div className="text-8xl mb-4 animate-bounce">🎉</div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                C'est noté !
              </h3>
              
              <p className="text-lg md:text-xl text-neutral-200 mb-2">
                Votre demande a été envoyée avec succès
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 mt-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">Demande reçue</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10">
            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-gradient-to-br from-brand-red/10 to-red-50 border-2 border-brand-red/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                    <Phone size={20} weight="bold" className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-neutral-600 font-medium">Réponse rapide</div>
                    <div className="text-lg font-bold text-brand-red">Sous 15 min</div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-brand-gold/10 to-yellow-50 border-2 border-brand-gold/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                    <CheckCircle size={20} weight="bold" className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-neutral-600 font-medium">Service</div>
                    <div className="text-lg font-bold text-brand-gold">24h/24, 7j/7</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl border-2 border-neutral-200 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-600 font-medium">Votre numéro :</span>
                <span className="text-lg font-bold text-brand-navy">{formData.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 font-medium">Service demandé :</span>
                <span className="text-lg font-bold text-brand-navy">
                  {formData.service === 'epaviste' ? '🚛 Enlèvement d\'épave' : '💰 Rachat de voiture'}
                </span>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Que se passe-t-il maintenant ?
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-blue font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Un conseiller vous appelle</div>
                    <div className="text-sm text-neutral-600">Dans les 15 prochaines minutes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-blue font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Estimation gratuite</div>
                    <div className="text-sm text-neutral-600">Devis personnalisé en quelques minutes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-blue font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Intervention rapide</div>
                    <div className="text-sm text-neutral-600">Enlèvement sous 24-48h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/33979049486?text=Bonjour, je viens de remplir le formulaire pour ${formData.service === 'epaviste' ? 'un enlèvement d\'épave' : 'un rachat de voiture'}. Voici les photos de mon véhicule :`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
                onClick={() => {
                  // Track WhatsApp click
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_whatsapp', {
                      service: formData.service,
                      page_type: formData.pageType,
                      department: formData.department,
                      city: formData.city,
                    });
                  }
                }}
              >
                <WhatsappLogo size={24} weight="fill" />
                <span>📸 Envoyer des photos sur WhatsApp</span>
              </a>
              
              <a
                href="tel:0979049486"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
                onClick={() => {
                  // Track call click
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_call', {
                      service: formData.service,
                      page_type: formData.pageType,
                      department: formData.department,
                      city: formData.city,
                    });
                  }
                }}
              >
                <Phone size={24} weight="bold" />
                <span>📞 Appeler maintenant</span>
              </a>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full px-6 py-3 text-neutral-600 hover:text-neutral-900 font-medium transition-colors rounded-xl hover:bg-neutral-100"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render trigger button
  if (trigger === 'button' && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
      >
        <Phone size={20} weight="bold" />
        {buttonText}
      </button>
    );
  }

  return (
    <div className={`${trigger === 'inline' ? 'relative' : 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${trigger === 'inline' ? 'max-w-2xl mx-auto' : 'max-w-2xl max-h-[90vh] overflow-y-auto'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white p-6 md:p-8 rounded-t-2xl relative">
          {trigger === 'button' && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X size={24} weight="bold" />
            </button>
          )}
          
          <div className="mb-4">
            <div className="text-sm text-neutral-300 mb-2">
              Étape {step} sur 4
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {getStepTitle()}
            </h2>
          </div>
          
          {/* Progress bar */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-brand-gold' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="min-h-[300px]">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-neutral-600 mb-6">
                  Choisissez le service dont vous avez besoin
                </p>
                
                <div className="grid gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      updateField('service', 'epaviste');
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all text-left group hover:scale-[1.02] ${
                      formData.service === 'epaviste'
                        ? 'border-brand-red bg-brand-red/5 shadow-lg'
                        : 'border-neutral-200 hover:border-brand-red hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🚗</div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1 text-neutral-900 group-hover:text-brand-red transition-colors">
                          Enlèvement d'Épave
                        </div>
                        <div className="text-sm text-neutral-600">
                          Service 100% gratuit • Certificat VHU • Intervention 24h
                        </div>
                      </div>
                      <ArrowRight size={24} className="text-neutral-400 group-hover:text-brand-red transition-colors" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateField('service', 'rachat');
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all text-left group hover:scale-[1.02] ${
                      formData.service === 'rachat'
                        ? 'border-brand-gold bg-brand-gold/5 shadow-lg'
                        : 'border-neutral-200 hover:border-brand-gold hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">💰</div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1 text-neutral-900 group-hover:text-brand-gold transition-colors">
                          Rachat de Voiture
                        </div>
                        <div className="text-sm text-neutral-600">
                          Paiement cash immédiat • Meilleur prix • Enlèvement gratuit
                        </div>
                      </div>
                      <ArrowRight size={24} className="text-neutral-400 group-hover:text-brand-gold transition-colors" />
                    </div>
                  </button>
                </div>
                
                {errors.service && (
                  <p className="text-red-500 text-sm mt-2">⚠️ {errors.service}</p>
                )}
              </div>
            )}

            {/* Step 2: Vehicle Details */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Marque du véhicule *
                  </label>
                  <input
                    type="text"
                    value={formData.marque}
                    onChange={(e) => updateField('marque', e.target.value)}
                    placeholder="Ex: Renault, Peugeot, Citroën..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                      errors.marque ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                    }`}
                    autoComplete="off"
                  />
                  {errors.marque && (
                    <p className="text-red-500 text-sm mt-1">⚠️ {errors.marque}</p>
                  )}
                  {formData.marque && !errors.marque && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle size={16} weight="fill" /> Parfait !
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    value={formData.modele}
                    onChange={(e) => updateField('modele', e.target.value)}
                    placeholder="Ex: Clio, 308, C3..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                      errors.modele ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                    }`}
                    autoComplete="off"
                  />
                  {errors.modele && (
                    <p className="text-red-500 text-sm mt-1">⚠️ {errors.modele}</p>
                  )}
                  {formData.modele && !errors.modele && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle size={16} weight="fill" /> Parfait !
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Année *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.annee}
                      onChange={(e) => updateField('annee', e.target.value)}
                      placeholder="2015"
                      maxLength={4}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                        errors.annee ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                      }`}
                      autoComplete="off"
                    />
                    {errors.annee && (
                      <p className="text-red-500 text-sm mt-1">⚠️ {errors.annee}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      État *
                    </label>
                    <select
                      value={formData.etat}
                      onChange={(e) => updateField('etat', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all appearance-none bg-white ${
                        errors.etat ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                      }`}
                    >
                      <option value="">Choisir...</option>
                      <option value="roulante">Roulante</option>
                      <option value="non-roulante">Non roulante</option>
                      <option value="accidentee">Accidentée</option>
                    </select>
                    {errors.etat && (
                      <p className="text-red-500 text-sm mt-1">⚠️ {errors.etat}</p>
                    )}
                  </div>
                </div>

                {formData.service === 'epaviste' && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle size={20} weight="fill" className="text-green-600" />
                      <strong>Service 100% GRATUIT</strong> • Aucun frais caché
                    </p>
                  </div>
                )}

                {formData.service === 'rachat' && (
                  <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <span className="text-xl">💰</span>
                      <strong>Paiement IMMÉDIAT</strong> • Cash ou virement le jour même
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.codePostal}
                    onChange={(e) => updateField('codePostal', e.target.value)}
                    placeholder="75001"
                    maxLength={5}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                      errors.codePostal ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                    }`}
                    autoComplete="postal-code"
                  />
                  {errors.codePostal && (
                    <p className="text-red-500 text-sm mt-1">⚠️ {errors.codePostal}</p>
                  )}
                  {formData.codePostal && !errors.codePostal && /^\d{5}$/.test(formData.codePostal) && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle size={16} weight="fill" /> Code postal valide
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Ville {cityName ? '' : '*'}
                  </label>
                  <input
                    type="text"
                    value={formData.ville}
                    onChange={(e) => updateField('ville', e.target.value)}
                    placeholder="Paris"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                    autoComplete="address-level2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Le véhicule est-il en sous-sol ou parking ?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateField('sousSol', true)}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                        formData.sousSol
                          ? 'border-brand-blue bg-brand-blue text-white shadow-lg'
                          : 'border-neutral-200 text-neutral-700 hover:border-brand-blue'
                      }`}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('sousSol', false)}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                        !formData.sousSol
                          ? 'border-brand-blue bg-brand-blue text-white shadow-lg'
                          : 'border-neutral-200 text-neutral-700 hover:border-brand-blue'
                      }`}
                    >
                      Non
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    ⏱️ <strong>Intervention sous 24-48h</strong> • Nous venons chez vous
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Votre prénom (pour vous rappeler) *
                  </label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => updateField('prenom', e.target.value)}
                    placeholder="Jean"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                      errors.prenom ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                    }`}
                    autoComplete="given-name"
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">⚠️ {errors.prenom}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Téléphone 📞 *
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-neutral-200 focus:border-brand-blue'
                    }`}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">⚠️ {errors.phone}</p>
                  )}
                  {formData.phone && !errors.phone && /^0[1-9]\d{8}$/.test(formData.phone.replace(/\s/g, '')) && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle size={16} weight="fill" /> Numéro valide
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email (facultatif)
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="jean@exemple.fr"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                    autoComplete="email"
                  />
                </div>

                <div className="p-4 bg-gradient-to-r from-brand-red/10 to-brand-gold/10 border-2 border-brand-red/30 rounded-xl">
                  <p className="text-sm text-neutral-800 flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <strong>Réponse en moins de 15 minutes</strong> • Nous vous contactons rapidement
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-neutral-100">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
              >
                <ArrowLeft size={20} weight="bold" />
                Retour
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                Continuer
                <ArrowRight size={20} weight="bold" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Phone size={20} weight="bold" />
                    📞 Être rappelé en 15 min
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
