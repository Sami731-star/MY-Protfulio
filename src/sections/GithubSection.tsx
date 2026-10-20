import React, { useState } from 'react';
import { githubProfileData } from '../data/github';
import { Github, ExternalLink, GitBranch, Star, GitFork, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

export const GithubSection: React.FC = () => {
  // Generate a realistic, subtle contribution matrix grid for visualization
  const weeks = 28;
  const daysPerWeek = 7;

  return (
    <section id="github" className="py-20 px-4 sm:px-6 border-t border-slate-800/80 light:border-slate-200 bg-[#090b0e] light:bg-slate-50/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Open Source &amp; Code
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white light:text-slate-900">
              Code, Learn, Build.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 max-w-xl">
              Public repositories, version-controlled lab assignments, and continuous development activity on GitHub.
            </p>
          </div>

          <a
            href={githubProfileData.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 light:bg-slate-900 light:hover:bg-slate-800 border border-slate-700 light:border-slate-300 rounded-lg transition-colors self-start sm:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>@{githubProfileData.username}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {githubProfileData.repositories.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-xl bg-[#0e1117] light:bg-white border border-slate-800 light:border-slate-200 hover:border-slate-700 light:hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm sm:text-base font-semibold text-white light:text-slate-900 hover:text-cyan-400 light:hover:text-cyan-600 font-mono transition-colors"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 light:text-slate-400 border border-slate-800 light:border-slate-200 rounded px-1.5 py-0.5">
                    Public
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {repo.description}
                </p>

                {/* Topics / Tags (clean unboxed text) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400/90 light:text-cyan-700">
                  {repo.topics.map((topic, idx) => (
                    <React.Fragment key={topic}>
                      <span>#{topic}</span>
                      {idx < repo.topics.length - 1 && <span className="text-slate-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Repo Footer Info */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 light:border-slate-200 text-xs font-mono text-slate-400 light:text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  <span>{repo.language}</span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Activity / Contribution Graphic Card */}
        <div className="p-6 rounded-xl bg-[#0e1117] light:bg-white border border-slate-800 light:border-slate-200 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 light:text-slate-800 font-semibold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Development Activity &amp; Commit Discipline</span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Active Commits &amp; Academic Repositories
            </span>
          </div>

          <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
            Consistent learning cadence across university assignments, database scripts, and frontend iterations.
          </p>

          {/* Minimalist Contribution Activity Barcode/Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-[500px]">
              {Array.from({ length: weeks }).map((_, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {Array.from({ length: daysPerWeek }).map((_, dIdx) => {
                    // Seeded calculation for authentic developer pattern
                    const intensity = (wIdx * 7 + dIdx * 3) % 5;
                    const colors = [
                      'bg-slate-800/40 light:bg-slate-200',
                      'bg-emerald-950/60 light:bg-emerald-200',
                      'bg-emerald-800/80 light:bg-emerald-400',
                      'bg-emerald-600 light:bg-emerald-600',
                      'bg-emerald-400 light:bg-emerald-700'
                    ];
                    return (
                      <div
                        key={dIdx}
                        className={`w-2.5 h-2.5 rounded-sm ${colors[intensity]} transition-colors`}
                        title={`Activity level: ${intensity}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
            <span>Learn · Build · Refactor · Repeat</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2 h-2 rounded-sm bg-slate-800/40 light:bg-slate-200" />
              <span className="w-2 h-2 rounded-sm bg-emerald-950/60 light:bg-emerald-200" />
              <span className="w-2 h-2 rounded-sm bg-emerald-700 light:bg-emerald-500" />
              <span className="w-2 h-2 rounded-sm bg-emerald-400 light:bg-emerald-700" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Philosophy Points */}
        <div className="p-6 rounded-xl bg-slate-900/40 light:bg-slate-100/70 border border-slate-800/80 light:border-slate-200">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-semibold mb-3">
            Open-Source &amp; Code Hygiene Philosophy
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            {githubProfileData.contributionPhilosophy.map((philosophy, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{philosophy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
