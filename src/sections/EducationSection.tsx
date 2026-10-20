import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CompanyLogo } from '../components/CompanyLogo';
import { MapPin, Calendar } from 'lucide-react';
import { EducationItem } from '../data/education';

export const EducationSection: React.FC = () => {
  const { educations } = usePortfolio();
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const getDegreeTag = (item: EducationItem) => {
    const deg = (item.degree || '').toLowerCase();
    const lvl = (item.level || '').toLowerCase();
    if (deg.includes('b.sc') || deg.includes('bsc') || deg.includes('bachelor') || lvl === 'university') return 'BSC';
    if (deg.includes('hsc') || deg.includes('higher secondary') || lvl === 'college') return 'HSC';
    if (deg.includes('ssc') || deg.includes('secondary school') || lvl === 'school') return 'SSC';
    if (deg.includes('m.sc') || deg.includes('master')) return 'MSC';
    return item.level ? item.level.toUpperCase() : 'EDU';
  };

  return (
    <section 
      id="education" 
      ref={elementRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div 
          className={`space-y-1 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#161e38] dark:text-white">
            Education
          </h2>
        </div>

        {/* Clean Unified Card Container matching reference screenshot */}
        <div 
          className={`rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {educations.map((item) => (
            <div 
              key={item.id}
              className="p-6 sm:p-8 flex items-start gap-4 sm:gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
            >
              {/* Institution Logo Badge */}
              <div className="flex-shrink-0">
                <CompanyLogo 
                  company={item.institution} 
                  logoUrl={item.logoUrl} 
                  size="lg" 
                />
              </div>

              {/* Information Column */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Short Tag (BSC, HSC, SSC) */}
                <div className="mb-1">
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 px-2 py-0.5 rounded-md bg-white dark:bg-[#1a233a] inline-block uppercase">
                    {getDegreeTag(item)}
                  </span>
                </div>

                {/* Institution Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#161e38] dark:text-white tracking-tight leading-snug">
                  {item.institution}
                </h3>

                {/* Degree / Branch */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                  {item.degree}
                </p>

                {/* Meta details: Calendar Date & Location */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-400 pt-1.5 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
