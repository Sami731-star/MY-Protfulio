import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CompanyLogo } from '../components/CompanyLogo';
import { 
  Briefcase, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  BadgeCheck
} from 'lucide-react';

export const WorkExperienceSection: React.FC = () => {
  const { workExperiences } = usePortfolio();
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section 
      id="experience" 
      ref={elementRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header with Fade-In-Up Animation */}
        <div 
          className={`space-y-2 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5658df] dark:text-indigo-400 font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Professional Career &amp; Operational Roles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161e38] dark:text-white">
            Work Experience
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Hands-on professional experience in organizational management, financial documentation, banking operations, and enterprise retail Point-of-Sale systems.
          </p>
        </div>

        {/* Experience Cards with Staggered Fade-In-Up Animation */}
        <div className="space-y-6 sm:space-y-8">
          {workExperiences.map((item, index) => {
            const isPresent = item.status === 'Present';
            const delayClass = index === 0 ? 'delay-100' : 'delay-200';

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all duration-700 ${delayClass} ease-out will-change-transform space-y-6 group hover:border-indigo-300 dark:hover:border-indigo-500/40 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Header Row: Company Logo, Role & Duration */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-start gap-4">
                    {/* Distinctive Company Logo with Custom Image Fallback */}
                    <div className="group-hover:scale-105 transition-transform flex-shrink-0">
                      <CompanyLogo 
                        company={item.company} 
                        logoUrl={item.logoUrl} 
                        size="md" 
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#161e38] dark:text-white tracking-tight">
                          {item.role}
                        </h3>
                        {isPresent && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Present / Continuing</span>
                          </span>
                        )}
                        {!isPresent && item.department && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                            Dept: {item.department}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#5658df] dark:text-indigo-400">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{item.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Period & Location Metadata */}
                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#5658df]" />
                      <span>{item.period}</span>
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                        <MapPin className="w-3 h-3 text-[#5658df]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Duties / Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#5658df]" />
                    <span>Key Duties &amp; Responsibilities:</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 dark:bg-[#161c2e]/70 border border-slate-200/60 dark:border-slate-800/60 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Competencies Badges */}
                {item.skills && item.skills.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 mr-1">Skills:</span>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-50/80 dark:bg-indigo-950/40 text-[#5658df] dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
