import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../data/projects';
import { Github, ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolio();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-1.5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202a48] dark:text-white">
            Projects
          </h2>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5658df] dark:text-indigo-400 font-semibold">
            OPEN SOURCE &amp; PRACTICAL SOFTWARE APPLICATIONS
          </p>
          <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 max-w-xl">
            Software built with clean architectures, relational data modeling, and practical user utility.
          </p>
        </div>

        {/* 3-Column Project Grid (.project-cards-div style from shahjalalshohag.com) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 hover:border-[#5658df]/50 dark:hover:border-[#5658df]/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Image thumbnail */}
              {project.image && (
                <div 
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>{project.year || '2025'}</span>
                    <span className="text-[#5658df] dark:text-indigo-400 font-semibold">{project.status}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-[#202a48] dark:text-white group-hover:text-[#5658df] dark:group-hover:text-[#6869f1] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#5658df] transition-colors" />
                  </h3>

                  <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 leading-relaxed line-clamp-3">
                    {project.tagline || project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                    {(project.technologies || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-[#5658df] hover:text-white text-slate-700 dark:text-slate-300 font-medium transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}

                    {project.liveDemoUrl && project.liveDemoUrl !== '#' ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#5658df] text-white hover:bg-[#4338ca] font-medium transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#5658df] text-slate-700 dark:text-slate-300 hover:text-[#5658df] font-medium transition-colors"
                      >
                        <span>Case Study</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
