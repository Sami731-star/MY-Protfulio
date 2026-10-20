import React from 'react';
import { achievementsData } from '../data/achievements';
import { Trophy, Code, Award, CheckCircle2, Star, Sparkles } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-1.5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202a48] dark:text-white">
            Problem Solving &amp; Achievements
          </h2>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5658df] dark:text-indigo-400 font-semibold">
            COMPETITIVE PROGRAMMING PROFILES &amp; MILESTONES
          </p>
          <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 max-w-xl">
            Algorithmic problem-solving milestones, university coding competitions, and software benchmarks.
          </p>
        </div>

        {/* Achievement Cards Grid (.achievement-cards-div style from shahjalalshohag.com) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Category & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5658df] dark:text-indigo-400 font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-medium">
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#202a48] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5658df] dark:text-indigo-300 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {item.items && item.items.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    {item.items.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5658df] mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {item.placeholderNote && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 italic">
                  {item.placeholderNote}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
