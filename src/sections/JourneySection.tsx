import React from 'react';
import { journeyTimeline } from '../data/journey';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Calendar, Briefcase, CheckCircle2 } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section 
      id="journey" 
      ref={elementRef}
      className="py-20 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header with Fade-In-Up Animation */}
        <div 
          className={`border-b border-slate-200 dark:border-slate-800 pb-6 space-y-1.5 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202a48] dark:text-white">
            Experience &amp; Journey
          </h2>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5658df] dark:text-indigo-400 font-semibold">
            ROLES, HANDS-ON PROJECTS &amp; TECHNICAL PROGRESSION
          </p>
          <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 max-w-xl">
            Key developmental milestones, software engineering projects, and undergraduate leadership at Uttara University.
          </p>
        </div>

        {/* Timeline Cards with Staggered Fade-In-Up Animation */}
        <div className="space-y-6">
          {journeyTimeline.map((item, index) => {
            const delayClasses = [
              'delay-100',
              'delay-200',
              'delay-300',
              'delay-400',
              'delay-500'
            ];
            const delayClass = delayClasses[index % delayClasses.length];

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-700 ${delayClass} ease-out will-change-transform space-y-5 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-[#5658df] flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#202a48] dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#5658df] dark:text-indigo-400">
                        {item.organization || item.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-[#5658df]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Highlights / Details */}
                {item.details && item.details.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Key Deliverables &amp; Learnings:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#5658df] mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Badges */}
                {item.keyTechnologies && item.keyTechnologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {item.keyTechnologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
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
