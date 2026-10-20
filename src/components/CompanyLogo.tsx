import React, { useEffect, useState } from 'react';
import { School, GraduationCap, Building2 } from 'lucide-react';

interface CompanyLogoProps {
  company: string;
  logoUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  company,
  logoUrl,
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [logoUrl]);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 sm:w-14 sm:h-14 text-sm',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 text-base',
  };

  // If a custom image URL/Base64 was provided and hasn't failed to load, display it
  if (logoUrl && logoUrl.trim() && !imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-white dark:bg-[#182035] border border-slate-200/90 dark:border-slate-700/80 p-1.5 flex items-center justify-center flex-shrink-0 shadow-xs overflow-hidden ${className}`}
      >
        <img
          src={logoUrl}
          alt={company}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    );
  }

  const name = company.toLowerCase().trim();

  // 1. MN Corporation Official Styled Logo
  if (name.includes('mn')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#0c162c] via-[#16274e] to-[#1e3a8a] text-white border border-indigo-400/30 flex items-center justify-center flex-shrink-0 shadow-md relative overflow-hidden group select-none ${className}`}
        title="MN Corporation"
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
        <div className="relative z-10 flex flex-col items-center justify-center leading-none">
          <div className="flex items-center tracking-tighter font-black font-sans text-base sm:text-lg text-white">
            <span className="text-amber-400">M</span>
            <span className="text-white">N</span>
          </div>
          <span className="text-[7px] font-mono tracking-widest text-indigo-200 uppercase font-bold mt-0.5 scale-90">
            CORP
          </span>
        </div>
      </div>
    );
  }

  // 2. ACI Logistic Limited Logo
  if (name.includes('aci')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-700/80 p-2 flex items-center justify-center flex-shrink-0 shadow-md relative select-none ${className}`}
        title="ACI Logistic Limited"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
          <path
            d="M50 15 C35 15 22 28 22 45 C22 62 38 78 50 85 C42 70 40 55 45 42 C48 35 55 25 50 15 Z"
            fill="#059669"
          />
          <path
            d="M50 15 C65 15 78 28 78 45 C78 62 62 78 50 85 C58 70 60 55 55 42 C52 35 45 25 50 15 Z"
            fill="#dc2626"
          />
          <circle cx="50" cy="50" r="12" fill="#ffffff" />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="10"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            ACI
          </text>
        </svg>
      </div>
    );
  }

  // 3. SUST (Shahjalal University of Science and Technology) Logo
  if (name.includes('shahjalal') || name.includes('sust')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-700/80 p-1 flex items-center justify-center flex-shrink-0 shadow-xs select-none ${className}`}
        title="Shahjalal University of Science and Technology"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#f59e0b" strokeWidth="4" fill="#ffffff" />
          <polygon points="50,15 80,75 20,75" stroke="#dc2626" strokeWidth="4" fill="none" />
          <circle cx="50" cy="50" r="14" fill="#dc2626" />
          <path d="M50 30 L50 70 M30 50 L70 50" stroke="#f59e0b" strokeWidth="3" />
          <text x="50" y="88" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">SUST</text>
        </svg>
      </div>
    );
  }

  // 4. Dhaka Residential Model College / DRMC Logo
  if (name.includes('residential') || name.includes('drmc')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-700/80 p-1 flex items-center justify-center flex-shrink-0 shadow-xs select-none ${className}`}
        title="Dhaka Residential Model College"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#047857" strokeWidth="4" fill="#f0fdf4" />
          <path d="M50 20 C45 35 40 45 50 60 C60 45 55 35 50 20 Z" fill="#ef4444" />
          <circle cx="50" cy="40" r="6" fill="#f59e0b" />
          <path d="M30 65 Q50 55 70 65 L65 75 Q50 68 35 75 Z" fill="#047857" />
          <text x="50" y="88" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">DRMC</text>
        </svg>
      </div>
    );
  }

  // 5. Uttara University Logo Emblem
  if (name.includes('uttara')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#047857] text-white border border-emerald-500/40 p-1 flex items-center justify-center flex-shrink-0 shadow-md relative select-none ${className}`}
        title="Uttara University"
      >
        <div className="flex flex-col items-center justify-center text-center leading-none">
          <div className="w-5 h-5 rounded-full border border-amber-300 flex items-center justify-center mb-0.5">
            <span className="text-[9px] font-black text-amber-300">UU</span>
          </div>
          <span className="text-[7px] font-mono tracking-tighter text-emerald-100 font-bold uppercase">
            UTTARA
          </span>
        </div>
      </div>
    );
  }

  // 4. College Emblem
  if (name.includes('college')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-indigo-200 border border-indigo-500/40 p-1 flex flex-col items-center justify-center flex-shrink-0 shadow-md relative select-none ${className}`}
        title={company}
      >
        <GraduationCap className="w-5 h-5 text-indigo-300 mb-0.5" />
        <span className="text-[7px] font-mono tracking-wider text-indigo-100 font-bold uppercase">
          COLLEGE
        </span>
      </div>
    );
  }

  // 5. School Emblem
  if (name.includes('school')) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#0f2942] to-[#1e3a5f] text-cyan-200 border border-cyan-500/40 p-1 flex flex-col items-center justify-center flex-shrink-0 shadow-md relative select-none ${className}`}
        title={company}
      >
        <School className="w-5 h-5 text-cyan-300 mb-0.5" />
        <span className="text-[7px] font-mono tracking-wider text-cyan-100 font-bold uppercase">
          SCHOOL
        </span>
      </div>
    );
  }

  // 6. Default: Dynamic Initial Badge
  const initials = company
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || 'ED';

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#5658df] to-[#3730a3] text-white border border-indigo-400/40 flex items-center justify-center flex-shrink-0 shadow-md font-extrabold tracking-tight select-none ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};
