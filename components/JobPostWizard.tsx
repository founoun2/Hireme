import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface JobPostWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobPostWizard: React.FC<JobPostWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    title: '',
    profile: '',
    description: '',
    contract: 'CDI',
    salary: ''
  });

  const cities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 
    'Oujda', 'Kenitra', 'Tétouan', 'Salé', 'Mohammedia', 'Khouribga', 
    'Béni Mellal', 'El Jadida', 'Nador', 'Settat', 'Taza', 'Laâyoune'
  ];

  const contracts = ['CDI', 'CDD', 'Stage', 'Freelance', 'Interim', 'Temporaire'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    return formData.companyName && formData.city && formData.email;
  };

  const validateStep2 = () => {
    return formData.title && formData.description && formData.contract;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const jobId = `user-post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const { error } = await supabase.from('jobs').insert([{
        id: jobId,
        title: formData.title,
        company: formData.companyName,
        city: formData.city,
        description: `${formData.description}\n\nProfil recherché: ${formData.profile}\n\nAdresse: ${formData.address}${formData.salary ? `\n\nSalaire: ${formData.salary}` : ''}`,
        url: `https://user-posted-${Date.now()}`,
        source: 'user-posted',
        company_email: formData.email,
        company_phone: formData.phone,
        contract: formData.contract,
        salary: formData.salary || null,
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setFormData({
          companyName: '',
          city: '',
          address: '',
          email: '',
          phone: '',
          title: '',
          profile: '',
          description: '',
          contract: 'CDI',
          salary: ''
        });
        setStep(1);
      }, 5000);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Erreur lors de la publication de l\'offre');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-300">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa fa-check text-4xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-4">Succès !</h3>
            <p className="text-zinc-600 leading-relaxed mb-2">
              Merci d'avoir choisi <span className="font-bold text-indigo-600">HireMe Maroc</span> ! 
            </p>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Nous espérons que vous trouverez le meilleur employé.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800">
                <i className="fa fa-info-circle mr-2"></i>
                Votre offre d'emploi sera automatiquement supprimée de notre site web après <span className="font-bold">7 jours</span>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-2xl font-black">Publier une Offre</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <i className="fa fa-times text-base sm:text-xl"></i>
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold">
            <span className={step >= 1 ? 'text-white' : 'text-white/60'}>Entreprise</span>
            <span className={step >= 2 ? 'text-white' : 'text-white/60'}>Détails</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          {step === 1 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-xl font-black text-zinc-900 mb-3 sm:mb-4">Informations Entreprise</h3>
              
              <div>
                <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                  Nom de l'Entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Ex: TechCorp Maroc"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  >
                    <option value="">Sélectionner</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="123 Rue Mohammed V"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="contact@entreprise.ma"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="+212 6XX-XXXXXX"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!validateStep1()}
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all ${
                  validateStep1()
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Suivant <i className="fa fa-arrow-right ml-2"></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-xl font-black text-zinc-900 mb-3 sm:mb-4">Détails de l'Offre</h3>
              
              <div>
                <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                  Titre du Poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Ex: Développeur Full Stack"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                    Contrat <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="contract"
                    value={formData.contract}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  >
                    {contracts.map(contract => (
                      <option key={contract} value={contract}>{contract}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                    Salaire (MAD)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Ex: 8000-12000 MAD"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                  Profil Recherché
                </label>
                <textarea
                  name="profile"
                  value={formData.profile}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                  placeholder="Ex: Diplôme en informatique, 3 ans d'expérience..."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-zinc-700 mb-1.5 sm:mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                  placeholder="Décrivez le poste, responsabilités, compétences..."
                />
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all"
                >
                  <i className="fa fa-arrow-left mr-2"></i> Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!validateStep2() || loading}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all ${
                    validateStep2() && !loading
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <i className="fa fa-spinner fa-spin mr-2"></i> Publication...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check mr-2"></i> Publier
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
