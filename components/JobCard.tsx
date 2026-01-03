
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
      className="group bg-white p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 cursor-pointer border border-zinc-100 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-indigo-200 hover:bg-indigo-50/30 active:scale-[0.99]"
      dir={hasArabic ? 'rtl' : 'ltr'}
    >
      {/* Left section: Main info */}
      <div className="flex-grow min-w-0 space-y-3">
        {/* Title and badges */}
        <div>
          <div className="flex items-start gap-3 mb-2">
            <h3 className="text-base sm:text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-2" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {job.title}
            </h3>
            <div className="flex gap-1.5 flex-wrap shrink-0">
              {isApplied ? (
                <span className="bg-yellow-400 text-black text-[9px] font-bold uppercase px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-yellow-500">
                  ✓ Postulé
                </span>
              ) : (
                <>
                  {isLive && (
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
                    </span>
                  )}
                  {job.isNew && !isLive && (
                    <span className="bg-indigo-600 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-md">New</span>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Company and location */}
          <div className="flex items-center gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <i className="fa fa-building text-indigo-500 text-xs"></i>
              <span className="font-semibold" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa fa-location-dot text-indigo-500 text-xs"></i>
              <span className="font-medium" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>{job.city || 'Maroc'}</span>
            </div>
          </div>
        </div>

        {/* Job details inline */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
            <i className="fa fa-file-contract text-indigo-600 text-xs"></i>
            <span className="font-semibold text-zinc-700">{job.contract || 'CDI'}</span>
          </div>
          
          {job.salary && (
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <i className="fa fa-money-bill-wave text-emerald-600 text-xs"></i>
              <span className="font-bold text-emerald-700">{job.salary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Time and action */}
      <div className="flex flex-col items-end justify-between shrink-0 min-w-[120px]">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
          <i className="fa fa-clock text-[10px]"></i>
          <span>{job.time}</span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-md flex items-center gap-2 group/btn">
          <span>Détails</span>
          <i className="fa fa-arrow-right text-xs group-hover/btn:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};
