
import React, { useState } from 'react';
import { Job } from '../types';
import { ApplicationWizard } from './ApplicationWizard';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (id: number) => void;
  isApplied: boolean;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose, onApply, isApplied }) => {
  const [showApplicationWizard, setShowApplicationWizard] = useState(false);

  if (!job) return null;

  const handleExternalApply = () => {
    // Check if job has email for application wizard
    const hasEmail = job.company_email || job.email;
    
    if (hasEmail) {
      // Open AI Application Wizard
      setShowApplicationWizard(true);
      // Mark as applied
      onApply(job.id);
    } else {
      // Fallback to external URL
      onApply(job.id);
      window.open(job.url, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl h-[95vh] sm:h-auto sm:max-h-[92vh] sm:rounded-xl rounded-t-xl flex flex-col overflow-hidden shadow-3xl animate-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle for mobile */}
        <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mt-2.5 mb-1.5 sm:hidden shrink-0"></div>

        <div className="h-12 sm:h-14 flex items-center justify-between px-4 sm:px-6 border-b border-zinc-50 shrink-0">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-400">Opportunité IA</span>
          <button onClick={onClose} className="w-7 h-7 sm:w-8 sm:h-8 bg-zinc-50 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors active:scale-90">
            <i className="fa fa-times text-zinc-400 text-xs"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto px-4 sm:px-8 py-2 sm:py-3 scroll-smooth">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-xl shadow-zinc-900/10 rotate-[-5deg] shrink-0 mx-auto sm:mx-0">
              {job.company[0]}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wide">{job.company}</span>
                <span className="text-zinc-200 hidden sm:block">•</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">{job.time}</span>
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-zinc-900 leading-tight tracking-tight">{job.title}</h2>
            </div>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 mb-3">
            <div className="p-3 sm:p-3.5 bg-zinc-50 rounded-lg sm:rounded-xl border border-zinc-100/50">
              <span className="text-[8px] font-black text-zinc-400 block mb-1 uppercase tracking-wide">Ville</span>
              <span className="font-extrabold text-zinc-800 text-[10px] sm:text-xs flex items-center gap-1.5">
                <i className="fa fa-location-dot text-zinc-300 text-[9px]"></i> {job.city}
              </span>
            </div>
            <div className="p-3 sm:p-3.5 bg-zinc-50 rounded-lg sm:rounded-xl border border-zinc-100/50">
              <span className="text-[8px] font-black text-zinc-400 block mb-1 uppercase tracking-wide">Contrat</span>
              <span className="font-extrabold text-zinc-800 text-[10px] sm:text-xs flex items-center gap-1.5">
                <i className="fa fa-file-contract text-zinc-300 text-[9px]"></i> {job.contract}
              </span>
            </div>
            {job.salary && (
              <div className="p-3 sm:p-3.5 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100/50 col-span-1">
                <span className="text-[8px] font-black text-emerald-600 block mb-1 uppercase tracking-wide">Salaire</span>
                <span className="font-extrabold text-emerald-800 text-[10px] sm:text-xs uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                  {job.salary}
                </span>
              </div>
            )}
            <div className="p-3 sm:p-3.5 bg-indigo-50 rounded-lg sm:rounded-xl border border-indigo-100/50 col-span-1">
              <span className="text-[8px] font-black text-indigo-600 block mb-1 uppercase tracking-wide">Status</span>
              <span className="font-extrabold text-indigo-800 text-[10px] sm:text-xs uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></span> Ouvert
              </span>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-4 mb-3">
            <section>
              <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Présentation
              </h4>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">
                {job.description}
              </p>
            </section>

            {job.tasks && job.tasks.length > 0 && (
              <section className="bg-zinc-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-100/80">
                <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Missions clés
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                  {job.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-500 shrink-0 mt-0.5">
                        <i className="fa fa-circle-check text-[9px]"></i>
                      </div>
                      <span className="text-zinc-700 font-bold text-xs sm:text-sm leading-tight">{task}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Votre Profil
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {job.requirements.map((req, i) => (
                    <span key={i} className="bg-white border border-zinc-100 px-2.5 py-1.5 rounded-lg text-zinc-600 font-bold text-[10px] sm:text-xs shadow-sm">
                      {req}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {(job.email || job.contactPhone || job.company_email || job.company_phone || job.company_website) && (
              <section className="p-3 sm:p-4 bg-zinc-900 rounded-xl sm:rounded-2xl text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
                <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-wide mb-2.5">Contact Direct</h4>
                <div className="flex flex-col gap-2">
                  {(job.email || job.company_email) && (
                    <div className="group">
                      <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Email</p>
                      <a href={`mailto:${job.company_email || job.email}`} className="text-xs sm:text-sm font-black hover:text-indigo-400 transition-colors flex items-center gap-2 truncate">
                        <i className="fa fa-envelope-open text-zinc-700 text-[10px]"></i> {job.company_email || job.email}
                      </a>
                    </div>
                  )}
                  {(job.contactPhone || job.company_phone) && (
                    <div className="group">
                      <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Téléphone</p>
                      <a href={`tel:${job.company_phone || job.contactPhone}`} className="text-xs sm:text-sm font-black hover:text-indigo-400 transition-colors flex items-center gap-2">
                        <i className="fa fa-phone-volume text-zinc-700 text-[10px]"></i> {job.company_phone || job.contactPhone}
                      </a>
                    </div>
                  )}
                  {job.company_website && (
                    <div className="group">
                      <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Site Web</p>
                      <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-black hover:text-indigo-400 transition-colors flex items-center gap-2 truncate">
                        <i className="fa fa-globe text-zinc-700 text-[10px]"></i> {job.company_website}
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Action Bar */}
          <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl pt-2 pb-2 sm:pb-0 border-t border-zinc-50 flex flex-col items-center">
            <button 
              onClick={handleExternalApply}
              disabled={isApplied}
              className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all duration-500 shadow-xl relative overflow-hidden active:scale-95 flex items-center justify-center gap-2.5 ${
                isApplied 
                ? 'bg-yellow-400 text-black cursor-not-allowed opacity-75' 
                : 'bg-zinc-900 text-white hover:bg-indigo-600 shadow-indigo-500/10 hover:shadow-indigo-500/30'
              }`}
            >
              {isApplied ? (
                <>
                  <i className="fa fa-check-circle text-xs"></i>
                  <span>Déjà Postulé</span>
                </>
              ) : (
                <>
                  <span>Postuler maintenant</span>
                  <i className="fa fa-arrow-right text-[10px]"></i>
                </>
              )}
            </button>
            <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.15em] mt-2.5 mb-1.5">
              Lien sécurisé • Hireme Maroc v3.0
            </p>
          </div>
        </div>
      </div>

      {/* Application Wizard Modal */}
      {showApplicationWizard && (
        <ApplicationWizard 
          job={job}
          onClose={() => {
            setShowApplicationWizard(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};
