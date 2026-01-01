
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  isApplied: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isApplied, onClick, style }) => {
  const isLive = job.url.includes('linkedin') || job.url.includes('emploi') || job.url.includes('rekrute') || job.url.includes('wadifa') || job.url.includes('anapec');
  
  // Detect if text contains Arabic characters
  const hasArabic = /[\u0600-\u06FF]/.test(job.title + job.company + job.city);

  return (
    <div 
      onClick={onClick}
      style={style}
      className="group bg-white p-5 sm:p-7 flex flex-col cursor-pointer border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(79,70,229,0.08)] hover:border-indigo-100 hover:translate-y-[-2px] active:scale-[0.98]"
      dir={hasArabic ? 'rtl' : 'ltr'}
    >
      {/* Top section: Title and badges */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className="text-lg sm:text-2xl font-black text-zinc-900 group-hover:text-indigo-600 transition-colors tracking-tight flex-grow" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>
            {job.title}
          </h3>
        </div>
        
        <div className="flex gap-1.5 flex-wrap">
          {isLive ? (
            <span className="bg-emerald-50 text-emerald-600 text-[9px] sm:text-[10px] font-black uppercase px-3 py-1.5 rounded-lg tracking-tighter flex items-center gap-1.5 border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
            </span>
          ) : job.isNew && (
            <span className="bg-indigo-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-3 py-1.5 rounded-lg tracking-tighter">Nouveau</span>
          )}

          {isApplied && (
            <span className="bg-zinc-100 text-zinc-500 px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">✓ Postulé</span>
          )}
        </div>
      </div>

      {/* Company info with enhanced design */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-50">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-xl sm:text-2xl font-black text-indigo-600">{job.company[0]}</span>
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-base sm:text-lg font-black text-zinc-800 truncate" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>
            {job.company}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-bold">
            <i className="fa fa-location-dot text-[10px]"></i>
            <span style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>{job.city || 'Maroc'}</span>
          </div>
        </div>
      </div>

      {/* Job details grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa fa-file-contract text-indigo-600 text-xs"></i>
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Contrat</span>
          </div>
          <p className="text-sm font-bold text-zinc-800">{job.contract || 'CDI'}</p>
        </div>
        
        {job.salary && (
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <i className="fa fa-money-bill-wave text-emerald-600 text-xs"></i>
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Salaire</span>
            </div>
            <p className="text-sm font-bold text-emerald-800 truncate">{job.salary}</p>
          </div>
        )}
      </div>

      {/* Contact info if available */}
      {(job.company_email || job.company_phone) && (
        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa fa-address-card text-indigo-600 text-xs"></i>
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">Contact Direct</span>
          </div>
          <div className="space-y-1">
            {job.company_email && (
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <i className="fa fa-envelope text-[9px]"></i>
                <span className="truncate">{job.company_email}</span>
              </div>
            )}
            {job.company_phone && (
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <i className="fa fa-phone text-[9px]"></i>
                <span>{job.company_phone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer: Time and action */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
        <div className="flex items-center gap-2">
          <i className="fa fa-clock text-zinc-300 text-xs"></i>
          <span className="text-xs font-bold text-zinc-400">{job.time}</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-black text-sm group-hover:gap-3 transition-all">
          <span>Voir détails</span>
          <i className="fa fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </div>
  );
};
