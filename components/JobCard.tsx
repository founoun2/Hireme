
import React, { useEffect, useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaRegCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

// Utility to format time ago
function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}
import { applicationService } from '../services/applicationService';

interface JobCardProps {
  job: any;
  userEmail?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const JobCard: React.FC<JobCardProps> = ({ job, userEmail, onClick, style }) => {
  const hasArabic = /[\u0600-\u06FF]/.test(job.title + job.company);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (userEmail && job.id) {
      applicationService.hasApplied(String(job.id), userEmail)
        .then(setHasApplied)
        .catch(() => setHasApplied(false));
    }
  }, [userEmail, job.id]);

  return (
    <div
      className="relative bg-white rounded-3xl shadow-2xl border border-zinc-100 p-0 mt-[5px] mb-[5px] cursor-pointer hover:scale-[1.02] transition-transform duration-150 group flex flex-col sm:flex-row overflow-hidden"
      style={style}
      onClick={onClick}
    >
      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-extrabold text-xl sm:text-2xl text-zinc-900 truncate" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>{job.title}</span>
            {job.isNew && (
              <span className="bg-indigo-500 text-white text-xs font-bold uppercase px-2 py-1 rounded-full shadow-sm">New</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 mt-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <FaBuilding className="text-indigo-400 text-base" />
              <span className="font-semibold" style={{ fontFamily: hasArabic ? 'Cairo, sans-serif' : 'inherit' }}>{job.company}</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <FaMapMarkerAlt className="text-emerald-400 text-base" />
              <span>{job.city}</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <FaRegCalendarAlt className="text-pink-400 text-base" />
              <span>{job.contract}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <FaMoneyBillWave className="text-amber-400 text-base" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom section for mobile, right for desktop: time and button */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-4 p-4 sm:p-6 w-full sm:w-56 bg-zinc-50 border-t sm:border-t-0 sm:border-l border-zinc-100">
        {job.created_at && (
          <span className="inline-flex items-center gap-1 text-xs text-zinc-400 font-medium px-3 py-1 rounded-full bg-white border border-zinc-100 shadow-sm">
            <i className="fa fa-clock text-indigo-400"></i>
            {getTimeAgo(job.created_at)}
          </span>
        )}
        {hasApplied ? (
          <span className="bg-yellow-300 text-zinc-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-yellow-400 shadow-sm">
            ✓ Déjà postulé
          </span>
        ) : (
          <button
            className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-indigo-500 text-white shadow-sm`}
            onClick={onClick}
          >
            <span className="tracking-wide">Postuler</span>
            <i className="fa fa-arrow-right text-xs"></i>
          </button>
        )}
      </div>
    </div>
  );
};
