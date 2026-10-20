import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  Sparkles,
  Layers,
  Wrench
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0f1218] light:bg-white text-slate-200 light:text-slate-800 rounded-2xl border border-slate-800 light:border-slate-300 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 light:border-slate-200 bg-[#0a0d12]/90 light:bg-slate-50/90 sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-medium">
              Case Study · {project.year}
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400 light:text-slate-600 font-sans">
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white light:hover:text-slate-900 rounded-lg hover:bg-slate-800 light:hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white light:text-slate-900">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-slate-300 light:text-slate-600 leading-relaxed">
              {project.tagline}
            </p>

            {/* Clean metadata (no pill enclosures, clean typographic separators) */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-cyan-400 light:text-cyan-700 font-mono">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span className="text-slate-600 light:text-slate-400" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Project Screenshot / Hero Image */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 light:border-slate-200 bg-slate-950">
            <img 
              src={project.image} 
              alt={`${project.title} interface preview`}
              className="w-full aspect-video object-cover object-top"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 light:bg-slate-900 light:hover:bg-slate-800 border border-slate-700 light:border-slate-300 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-500 bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 rounded-lg cursor-not-allowed opacity-75"
                title="Repository link placeholder"
              >
                <Github className="w-4 h-4" />
                GitHub (Private / In Preparation)
              </button>
            )}

            {project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-500 bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 rounded-lg cursor-not-allowed opacity-75"
                title="Live deployment placeholder"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo (Local / Academic Environment)
              </button>
            )}
          </div>

          {/* Deep Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800/80 light:border-slate-200">
            {/* The Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 light:text-amber-600 font-semibold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 light:text-emerald-600 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
            <h3 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Key Features &amp; Modules
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-300 light:text-slate-700">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1 flex-shrink-0">▪</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Development Process */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
            <h3 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Development Process &amp; Architecture
            </h3>
            <div className="space-y-2.5">
              {project.developmentProcess.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 light:text-slate-700">
                  <span className="font-mono text-xs text-cyan-400/80 font-bold mt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Learnings */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
            <h3 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              Key Engineering Challenges Overcome
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 light:text-slate-700">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-slate-500 mt-1">―</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
            <h3 className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Future Roadmap &amp; Planned Enhancements
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 light:text-slate-700">
              {project.futureImprovements.map((improvement, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0a0d12] light:bg-slate-100 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>Oakimul Sami · Portfolio Project</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 light:bg-white text-slate-200 light:text-slate-800 border border-slate-700 light:border-slate-300 hover:bg-slate-700 light:hover:bg-slate-50 transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
