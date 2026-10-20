import React from 'react';
import { currentlyBuildingList } from '../data/building';
import { Sparkles, Bot, Globe, Binary } from 'lucide-react';

export const CurrentlyBuildingSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'ai-applications':
        return <Bot className="w-4 h-4 text-cyan-400" />;
      case 'web-development':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'problem-solving':
        return <Binary className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 border-t border-slate-800/80 light:border-slate-200 bg-[#090b0f] light:bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            Active Focus
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900">
            Currently Building &amp; Experimenting
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">
            Current software initiatives and engineering areas receiving active development focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentlyBuildingList.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-[#0f1218] light:bg-white border border-slate-800 light:border-slate-200 hover:border-slate-700 light:hover:border-slate-300 transition-all space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 light:border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-xs font-semibold text-white light:text-slate-900">
                    {item.category}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 light:text-cyan-700">
                  {item.status}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white light:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 light:border-slate-200 space-y-2">
                <div className="text-[11px] text-slate-500 font-mono">
                  Focus: {item.focus}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400 light:text-slate-600">
                  {item.technologies.map((t, idx) => (
                    <React.Fragment key={t}>
                      <span>{t}</span>
                      {idx < item.technologies.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
