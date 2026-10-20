import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { 
  Code2, 
  Atom, 
  Layout, 
  Database, 
  Sparkles, 
  Terminal, 
  BarChart2, 
  CheckSquare, 
  Cloud, 
  Coins, 
  Asterisk,
  Layers
} from 'lucide-react';
import { TechSkillBadge } from '../components/TechSkillBadge';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'languages':
        return <Code2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'frontend':
        return <Atom className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'backend':
        return <Layout className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'databases':
        return <Database className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'ai-tools':
        return <Terminal className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'data-science':
        return <BarChart2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'qa':
        return <CheckSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'devops':
        return <Cloud className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'blockchain':
        return <Coins className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'others':
        return <Asterisk className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  // Group by columns (1, 2, 3)
  const col1Categories = skills.filter(
    (c) => c.column === 1 || ['languages', 'frontend', 'backend', 'databases'].includes(c.id)
  );

  const col2Categories = skills.filter(
    (c) => c.column === 2 || ['ai', 'ai-tools', 'data-science', 'qa'].includes(c.id)
  );

  const col3Categories = skills.filter(
    (c) => c.column === 3 || ['devops', 'blockchain', 'others', 'tools'].includes(c.id)
  );

  const renderCategoryBlock = (category: typeof skills[0]) => (
    <div key={category.id} className="p-6 space-y-3.5">
      {/* Category Header matching screenshot */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-400">
          {getSectionIcon(category.id)}
        </div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          {category.title}
        </h3>
      </div>

      {/* Badges flow */}
      <div className="flex flex-wrap gap-2 pt-0.5">
        {category.skills.map((skillName) => (
          <TechSkillBadge key={skillName} name={skillName} />
        ))}
      </div>
    </div>
  );

  return (
    <section 
      id="skills" 
      ref={elementRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Section Header with Fade-In-Up Animation */}
        <div 
          className={`transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161e38] dark:text-white">
            Skills
          </h2>
        </div>

        {/* 3-Column Card Layout with Staggered Fade-In-Up Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
          
          {/* COLUMN 1: Languages, Frontend, Backend, Databases */}
          <div 
            className={`bg-[#fafbfd] dark:bg-[#0f1422] rounded-3xl border border-slate-200/80 dark:border-slate-800/90 shadow-2xs divide-y divide-slate-200/70 dark:divide-slate-800/80 overflow-hidden transition-all duration-700 delay-100 ease-out will-change-transform ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {col1Categories.map(renderCategoryBlock)}
          </div>

          {/* COLUMN 2: AI, AI Development Tools, Data Science, QA */}
          <div 
            className={`bg-[#fafbfd] dark:bg-[#0f1422] rounded-3xl border border-slate-200/80 dark:border-slate-800/90 shadow-2xs divide-y divide-slate-200/70 dark:divide-slate-800/80 overflow-hidden transition-all duration-700 delay-200 ease-out will-change-transform ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {col2Categories.map(renderCategoryBlock)}
          </div>

          {/* COLUMN 3: DevOps & Cloud, Blockchain & Smart Contracts, Others */}
          <div 
            className={`bg-[#fafbfd] dark:bg-[#0f1422] rounded-3xl border border-slate-200/80 dark:border-slate-800/90 shadow-2xs divide-y divide-slate-200/70 dark:divide-slate-800/80 overflow-hidden transition-all duration-700 delay-300 ease-out will-change-transform ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {col3Categories.map(renderCategoryBlock)}
          </div>

        </div>

      </div>
    </section>
  );
};
