import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResearchPaper } from '../data/research';
import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Quote, 
  Check, 
  PlusCircle, 
  Calendar,
  GraduationCap
} from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const { researchPapers, setIsAdminOpen, isAuthenticated } = usePortfolio();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleCopyCitation = (paper: ResearchPaper) => {
    const citation = paper.citationBibtex || 
      `${paper.authors.join(', ')} (${paper.year}). "${paper.title}". ${paper.venue}.`;
    
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(paper.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const allTopics = Array.from(
    new Set(researchPapers.flatMap((p) => p.topics || []))
  );

  const filteredPapers = activeFilter === 'all' 
    ? researchPapers 
    : researchPapers.filter((p) => p.topics?.includes(activeFilter));

  const getStatusBadge = (status: ResearchPaper['status']) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40';
      case 'Accepted':
        return 'bg-indigo-50 text-[#5658df] dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40';
      case 'Under Review':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800/40';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section 
      id="research" 
      className="py-20 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202a48] dark:text-white">
              Research &amp; Publications
            </h2>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5658df] dark:text-indigo-400 font-semibold">
              SCHOLARLY INQUIRIES &amp; INVESTIGATIONS
            </p>
            <p className="text-xs sm:text-sm text-[#65708a] dark:text-slate-400 max-w-xl">
              Academic investigations into Reinforcement Learning, algorithmic strategy optimization, and intelligent computational systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg">
              {researchPapers.length} {researchPapers.length === 1 ? 'Paper' : 'Papers'}
            </span>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5658df] dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-colors"
              title="Add or edit research papers"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? 'Manage Papers' : 'Add Paper'}</span>
            </button>
          </div>
        </div>

        {/* Filter tags */}
        {allTopics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Topic:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#5658df] text-white font-medium'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Topics
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveFilter(topic)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  activeFilter === topic
                    ? 'bg-[#5658df] text-white font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        {/* Papers List */}
        <div className="space-y-5">
          {filteredPapers.map((paper) => (
            <article
              key={paper.id}
              className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 hover:border-[#5658df]/50 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${getStatusBadge(paper.status)}`}>
                    {paper.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.year}
                  </span>
                  <span className="text-xs text-slate-500 font-sans hidden sm:inline">
                    · {paper.venue}
                  </span>
                </div>

                {paper.doi && (
                  <span className="font-mono text-[11px] text-slate-400">
                    DOI: {paper.doi}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#202a48] dark:text-white tracking-tight leading-snug group-hover:text-[#5658df] dark:group-hover:text-[#6869f1] transition-colors">
                {paper.title}
              </h3>

              <div className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-mono text-xs">Authors:</span>
                {paper.authors.map((author, aIdx) => (
                  <span 
                    key={aIdx} 
                    className={author.includes('Oakimul Sami') ? 'text-[#5658df] dark:text-indigo-400 font-bold' : ''}
                  >
                    {author}{aIdx < paper.authors.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[#65708a] dark:text-slate-400 leading-relaxed">
                {paper.description}
              </p>

              {paper.bulletPoints && paper.bulletPoints.length > 0 && (
                <ul className="mt-3 space-y-1.5 pl-1">
                  {paper.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                      <span className="text-[#5658df] dark:text-indigo-400 font-bold select-none leading-5">●</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {paper.topics && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {paper.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* IEEE Xplore Link */}
                  {(paper.ieeeUrl || paper.paperUrl) && (
                    <a
                      href={paper.ieeeUrl || paper.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[#5658df] dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/70 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>IEEE Xplore</span>
                    </a>
                  )}

                  {/* ResearchGate Link */}
                  {paper.researchGateUrl && (
                    <a
                      href={paper.researchGateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/70 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>ResearchGate</span>
                    </a>
                  )}

                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-mono text-[11px] px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                    >
                      <span>DOI: {paper.doi}</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleCopyCitation(paper)}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Citation Copied!</span>
                    </>
                  ) : (
                    <>
                      <Quote className="w-3.5 h-3.5" />
                      <span>Cite</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
