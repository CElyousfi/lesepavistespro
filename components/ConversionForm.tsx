'use client';

import { useState } from 'react';
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
  className?: string; // Add className prop
}

export default function ConversionFormNew({
  defaultService,
  trigger = 'button',
  buttonText = "Être rappelé en 15 min",
  cityName,
  departmentName,
  pageType = 'home',
  className = '', // Default empty string
}: ConversionFormProps) {
  const [isOpen, setIsOpen] = useState(trigger === 'inline');
  const [step, setStep] = useState(defaultService ? 2 : 1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [hasStartedForm, setHasStartedForm] = useState(false);

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

  const totalSteps = 4;

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

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

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setIsSubmitting(true);
    trackFormSubmit(formData.service || 'unknown');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto-close after 8 seconds
    setTimeout(() => {
      setShowSuccess(false);
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
      if (trigger === 'button') setIsOpen(false);
    }, 8000);
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn border border-neutral-200">
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} weight="fill" className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy mb-4">Demande Reçue !</h3>
            <p className="text-neutral-600 mb-8">
              Un conseiller va vous rappeler dans les <span className="font-bold text-brand-red">15 prochaines minutes</span> pour finaliser votre demande.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full px-8 py-4 bg-brand-red text-white rounded-full font-bold hover:bg-brand-red/90 transition-colors"
            >
              Fermer
            </button>
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
        className={`w-full sm:w-auto px-8 py-4 bg-brand-red text-white hover:bg-brand-red/90 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 active:scale-95 group hover:scale-[1.02] ${className}`}
      >
        <Phone size={20} weight="bold" />
        {buttonText}
      </button>
    );
  }

  return (
    <div className={`${trigger === 'inline' ? 'relative' : 'fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm'}`}>
      <div className={`bg-white shadow-xl w-full border border-neutral-200 ${trigger === 'inline' ? 'max-w-2xl mx-auto rounded-2xl' : 'max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl'}`}>
        {/* Header */}
        <div className="bg-brand-surface p-5 sm:p-6 md:p-8 rounded-t-2xl relative border-b border-neutral-200">
          {trigger === 'button' && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-brand-navy hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X size={24} weight="bold" />
            </button>
          )}

          <div className="mb-6">
            <div className="text-xs font-bold text-brand-red tracking-wider uppercase mb-2">
              Étape {step} sur 4
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
              {getStepTitle()}
            </h2>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8">
          <div className="min-h-[260px] sm:min-h-[300px]">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      updateField('service', 'epaviste');
                      setStep(2);
                    }}
                    className={`p-5 rounded-xl border transition-all text-left group hover:-translate-y-0.5 ${formData.service === 'epaviste'
                      ? 'border-brand-red/30 bg-brand-red/5'
                      : 'border-neutral-200 bg-white hover:border-brand-red/20 hover:bg-neutral-50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${formData.service === 'epaviste' ? 'bg-brand-red text-white' : 'bg-neutral-100 text-neutral-400 group-hover:bg-brand-red/10 group-hover:text-brand-red'
                        }`}>
                        <span className="font-bold text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-brand-navy mb-0.5">Enlèvement d&apos;Épave</h3>
                        <p className="text-sm text-neutral-500">Service 100% gratuit &bull; Certificat VHU</p>
                      </div>
                      <ArrowRight size={20} className="text-neutral-400 group-hover:text-brand-red transition-colors" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateField('service', 'rachat');
                      setStep(2);
                    }}
                    className={`p-5 rounded-xl border transition-all text-left group hover:-translate-y-0.5 ${formData.service === 'rachat'
                      ? 'border-brand-gold/30 bg-brand-gold/5'
                      : 'border-neutral-200 bg-white hover:border-brand-gold/20 hover:bg-neutral-50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${formData.service === 'rachat' ? 'bg-brand-gold text-white' : 'bg-neutral-100 text-neutral-400 group-hover:bg-brand-gold/10 group-hover:text-brand-gold'
                        }`}>
                        <span className="font-bold text-lg">&euro;</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-brand-navy mb-0.5">Rachat de Voiture</h3>
                        <p className="text-sm text-neutral-500">Paiement cash immédiat &bull; Meilleur prix</p>
                      </div>
                      <ArrowRight size={20} className="text-neutral-400 group-hover:text-brand-gold transition-colors" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Marque</label>
                    <input
                      type="text"
                      value={formData.marque}
                      onChange={(e) => updateField('marque', e.target.value)}
                      placeholder="Renault, Peugeot..."
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                    />
                    {errors.marque && <p className="text-xs text-brand-red font-semibold">{errors.marque}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Modèle</label>
                    <input
                      type="text"
                      value={formData.modele}
                      onChange={(e) => updateField('modele', e.target.value)}
                      placeholder="Clio, 208..."
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                    />
                    {errors.modele && <p className="text-xs text-brand-red font-semibold">{errors.modele}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Année</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.annee}
                      onChange={(e) => updateField('annee', e.target.value)}
                      placeholder="2010"
                      maxLength={4}
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                    />
                    {errors.annee && <p className="text-xs text-brand-red font-semibold">{errors.annee}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">État</label>
                    <select
                      value={formData.etat}
                      onChange={(e) => updateField('etat', e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all"
                    >
                      <option value="">Choisir...</option>
                      <option value="roulante">Roulante</option>
                      <option value="non-roulante">Non roulante</option>
                      <option value="accidentee">Accidentée</option>
                    </select>
                    {errors.etat && <p className="text-xs text-brand-red font-semibold">{errors.etat}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Code Postal</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.codePostal}
                    onChange={(e) => updateField('codePostal', e.target.value)}
                    placeholder="75001"
                    maxLength={5}
                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                  />
                  {errors.codePostal && <p className="text-xs text-brand-red font-semibold">{errors.codePostal}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sous-sol / Parking difficile ?</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateField('sousSol', true)}
                      className={`flex-1 h-12 rounded-xl font-semibold transition-all border ${formData.sousSol
                        ? 'bg-brand-red/5 border-brand-red/30 text-brand-red'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                        }`}
                    >
                      OUI
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('sousSol', false)}
                      className={`flex-1 h-12 rounded-xl font-semibold transition-all border ${!formData.sousSol
                        ? 'bg-brand-red/5 border-brand-red/30 text-brand-red'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                        }`}
                    >
                      NON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Prénom</label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => updateField('prenom', e.target.value)}
                    placeholder="Votre prénom"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                  />
                  {errors.prenom && <p className="text-xs text-brand-red font-semibold">{errors.prenom}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Téléphone</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-brand-navy focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/10 outline-none transition-all placeholder:text-neutral-400"
                  />
                  {errors.phone && <p className="text-xs text-brand-red font-semibold">{errors.phone}</p>}
                </div>

                <div className="p-4 bg-brand-red/[0.04] rounded-xl border border-brand-red/10 flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-brand-red mt-0.5" />
                  <p className="text-sm text-neutral-600">
                    <strong className="text-brand-navy">Réponse immédiate garantie.</strong> Vos données restent confidentielles et ne sont jamais revendues.
                  </p>
                </div>
              </div>
            )}

          </div>

          <div className="flex gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-200 pb-[env(safe-area-inset-bottom)]">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3.5 rounded-full border border-neutral-200 text-neutral-500 font-semibold hover:bg-neutral-50 transition-colors"
                aria-label="Retour"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
            )}

            <button
              type={step === totalSteps ? 'submit' : 'button'}
              onClick={step === totalSteps ? undefined : handleNext}
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3.5 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-brand-red text-white hover:bg-brand-red/90 shadow-lg'
                }`}
            >
              {isSubmitting ? 'Envoi...' : step === totalSteps ? 'Valider ma demande' : 'Continuer'}
              {!isSubmitting && <ArrowRight size={18} weight="bold" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
