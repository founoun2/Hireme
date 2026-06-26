import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show popup after 1 second delay
      setTimeout(() => {
        setShowConsent(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    // Save consent to localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
  };

  const handleDecline = () => {
    // Save decline to localStorage
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    // Clear any existing applied jobs data
    localStorage.removeItem('appliedJobs');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[200] flex items-end justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            {/* Cookie Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <i className="fa fa-cookie-bite text-white text-xl sm:text-2xl"></i>
            </div>
            
            {/* Text Content */}
            <div className="flex-grow">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-3 tracking-tight">
                Nous utilisons des cookies 🍪
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium mb-4">
                Pour améliorer votre expérience sur <span className="font-black text-indigo-600">HireMe Maroc</span>, 
                nous utilisons des cookies pour sauvegarder vos préférences et suivre vos candidatures. 
                Les données sont stockées localement dans votre navigateur et ne sont jamais partagées.
              </p>
              
              {/* Features list */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="font-semibold">Sauvegarder vos candidatures</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="font-semibold">Personnaliser l'expérience</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="font-semibold">Stocker vos préférences</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="font-semibold">100% sécurisé et local</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleAccept}
              className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fa fa-check-circle text-sm"></i>
              <span>Accepter les cookies</span>
            </button>
            
            <button
              onClick={handleDecline}
              className="sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-4 px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fa fa-times-circle text-sm"></i>
              <span>Refuser</span>
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-[10px] sm:text-xs text-zinc-400 font-medium text-center mt-6 leading-relaxed">
            <i className="fa fa-shield-halved text-indigo-500 mr-1"></i>
            Vos données restent dans votre navigateur. Vous pouvez les supprimer à tout moment en vidant le cache.
          </p>
        </div>
      </div>
    </div>
  );
};
