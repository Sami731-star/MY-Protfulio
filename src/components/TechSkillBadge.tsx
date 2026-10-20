import React from 'react';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Server, 
  Database, 
  Brain, 
  Cpu, 
  Cloud, 
  Globe, 
  Shield, 
  FileCode, 
  GitBranch, 
  BarChart3, 
  CheckCircle2, 
  Boxes, 
  Sparkles,
  Zap,
  Flame,
  Binary,
  Workflow,
  Activity,
  Bot,
  Wrench,
  Search,
  Award,
  Link as LinkIcon,
  Play,
  Share2,
  FileSpreadsheet,
  Coins,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface TechSkillBadgeProps {
  name: string;
}

export const TechSkillBadge: React.FC<TechSkillBadgeProps> = ({ name }) => {
  const getSkillIcon = (skillName: string) => {
    const s = skillName.toLowerCase();
    
    // Languages
    if (s.includes('c++')) {
      return (
        <span className="font-extrabold text-[10px] text-blue-600 dark:text-blue-400 font-mono tracking-tighter">
          C++
        </span>
      );
    }
    if (s === 'c') {
      return (
        <span className="font-extrabold text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">
          C
        </span>
      );
    }
    if (s.includes('python')) {
      return (
        <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 6.48 4.41 6.48 4.41V6.9h5.62v.83H4.19S2 7.46 2 13.06c0 5.61 1.93 5.48 1.93 5.48h1.16v-2.73s-.06-3.26 3.2-3.26h5.48v-.84H8.29s-3.03.17-3.03-3.26c0-3.44 2.96-3.3 2.96-3.3h5.78S16.5 5.14 16.5 2H12zm-1.88 1.66c.47 0 .84.38.84.84 0 .47-.38.84-.84.84-.47 0-.84-.38-.84-.84 0-.47.38-.84.84-.84zM12 22c5.52 0 5.52-2.41 5.52-2.41V17.1h-5.62v-.83h7.91S22 16.54 22 10.94c0-5.61-1.93-5.48-1.93-5.48h-1.16v2.73s.06 3.26-3.2 3.26h-5.48v.84h5.48s3.03-.17 3.03 3.26c0 3.44-2.96 3.3-2.96 3.3H6.96S7.5 18.86 7.5 22H12zm1.88-1.66c-.47 0-.84-.38-.84-.84 0-.47.38-.84.84-.84.47 0 .84.38.84.84 0 .47-.38.84-.84.84z"/>
        </svg>
      );
    }
    if (s.includes('javascript') || s === 'js') {
      return (
        <span className="font-black text-[9px] bg-[#f7df1e] text-black px-1 py-0.5 rounded-xs leading-none">
          JS
        </span>
      );
    }
    if (s.includes('typescript') || s === 'ts') {
      return (
        <span className="font-black text-[9px] bg-[#3178c6] text-white px-1 py-0.5 rounded-xs leading-none">
          TS
        </span>
      );
    }
    if (s.includes('php')) {
      return (
        <span className="font-bold text-[9px] bg-[#777bb4] text-white px-1 py-0.5 rounded-xs leading-none">
          PHP
        </span>
      );
    }

    // Frontend
    if (s.includes('react')) {
      return (
        <svg className="w-3.5 h-3.5 text-[#61dafb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    }
    if (s.includes('next.js') || s.includes('next')) {
      return (
        <span className="w-3.5 h-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black text-[9px] leading-none">
          N
        </span>
      );
    }
    if (s.includes('tailwind')) {
      return (
        <svg className="w-3.5 h-3.5 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C9.337,13.382,7.976,12,6.001,12z"/>
        </svg>
      );
    }
    if (s.includes('chakra')) {
      return (
        <svg className="w-3.5 h-3.5 text-[#319795]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    }
    if (s.includes('heroui') || s.includes('nextui')) {
      return (
        <span className="font-extrabold text-[9px] bg-slate-900 text-white dark:bg-slate-200 dark:text-black px-1 rounded-xs">
          UI
        </span>
      );
    }
    if (s.includes('html')) {
      return <span className="font-bold text-[9px] text-[#e34f26] font-mono">5</span>;
    }
    if (s.includes('css')) {
      return <span className="font-bold text-[9px] text-[#1572b6] font-mono">3</span>;
    }

    // Backend
    if (s.includes('fastapi')) {
      return <Zap className="w-3.5 h-3.5 text-[#059669]" />;
    }
    if (s.includes('node')) {
      return <Server className="w-3.5 h-3.5 text-[#22c55e]" />;
    }
    if (s.includes('express')) {
      return <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />;
    }
    if (s.includes('rest')) {
      return <Share2 className="w-3.5 h-3.5 text-indigo-500" />;
    }

    // Databases
    if (s.includes('postgres')) {
      return <Database className="w-3.5 h-3.5 text-[#336791]" />;
    }
    if (s.includes('redis')) {
      return <Layers className="w-3.5 h-3.5 text-[#dc2626]" />;
    }
    if (s.includes('firebase')) {
      return <Flame className="w-3.5 h-3.5 text-[#f59e0b]" />;
    }
    if (s.includes('supabase')) {
      return <Zap className="w-3.5 h-3.5 text-[#10b981]" />;
    }
    if (s.includes('pinecone')) {
      return <Boxes className="w-3.5 h-3.5 text-teal-600" />;
    }
    if (s.includes('mysql')) {
      return <Database className="w-3.5 h-3.5 text-[#00758f]" />;
    }

    // AI
    if (s.includes('rag')) {
      return <Layers className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (s.includes('vector db') || s.includes('vector databases')) {
      return <Database className="w-3.5 h-3.5 text-violet-500" />;
    }
    if (s.includes('vector embeddings') || s.includes('embeddings')) {
      return <Boxes className="w-3.5 h-3.5 text-purple-500" />;
    }
    if (s.includes('agent')) {
      return <Bot className="w-3.5 h-3.5 text-sky-500" />;
    }
    if (s.includes('prompt')) {
      return <FileCode className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (s.includes('mcp') || s.includes('model context')) {
      return <Cpu className="w-3.5 h-3.5 text-cyan-600" />;
    }
    if (s.includes('tool calling')) {
      return <Wrench className="w-3.5 h-3.5 text-emerald-500" />;
    }
    if (s.includes('langchain')) {
      return <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />;
    }
    if (s.includes('vercel ai')) {
      return (
        <span className="font-black text-[9px] text-black dark:text-white">▲</span>
      );
    }

    // AI Development Tools
    if (s.includes('codex')) {
      return <Sparkles className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (s.includes('claude')) {
      return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
    }
    if (s.includes('cursor')) {
      return <Terminal className="w-3.5 h-3.5 text-blue-600" />;
    }

    // Data Science
    if (s.includes('pandas')) {
      return <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />;
    }
    if (s.includes('numpy')) {
      return <Boxes className="w-3.5 h-3.5 text-sky-600" />;
    }
    if (s.includes('matplotlib')) {
      return <BarChart3 className="w-3.5 h-3.5 text-rose-500" />;
    }
    if (s.includes('jupyter')) {
      return <Activity className="w-3.5 h-3.5 text-orange-500" />;
    }
    if (s === 'sql') {
      return <Database className="w-3.5 h-3.5 text-blue-500" />;
    }

    // QA
    if (s.includes('pytest')) {
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
    }
    if (s.includes('jest')) {
      return <Activity className="w-3.5 h-3.5 text-rose-600" />;
    }
    if (s.includes('mocha')) {
      return <Flame className="w-3.5 h-3.5 text-amber-700" />;
    }
    if (s.includes('load testing') || s.includes('k6')) {
      return <Activity className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (s.includes('unit testing')) {
      return <Shield className="w-3.5 h-3.5 text-emerald-600" />;
    }

    // DevOps & Cloud
    if (s.includes('docker')) {
      return <Boxes className="w-3.5 h-3.5 text-sky-500" />;
    }
    if (s.includes('kubernetes')) {
      return <Compass className="w-3.5 h-3.5 text-blue-600" />;
    }
    if (s.includes('github actions') || s.includes('pipeline')) {
      return <Workflow className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />;
    }
    if (s.includes('datadog')) {
      return <Activity className="w-3.5 h-3.5 text-purple-500" />;
    }
    if (s.includes('argo')) {
      return <Workflow className="w-3.5 h-3.5 text-teal-500" />;
    }
    if (s.includes('airflow')) {
      return <Cloud className="w-3.5 h-3.5 text-cyan-500" />;
    }
    if (s.includes('aws')) {
      return <Cloud className="w-3.5 h-3.5 text-amber-500" />;
    }

    // Blockchain
    if (s.includes('solidity')) {
      return <Coins className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />;
    }
    if (s.includes('web3')) {
      return <Globe className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (s.includes('remix') || s.includes('hardhat') || s.includes('alchemy')) {
      return <Wrench className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (s.includes('ethers')) {
      return <Coins className="w-3.5 h-3.5 text-violet-500" />;
    }

    // Others
    if (s === 'git' || s === 'github') {
      return <GitBranch className="w-3.5 h-3.5 text-orange-500" />;
    }
    if (s.includes('linux')) {
      return <Terminal className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (s.includes('system design')) {
      return <Layers className="w-3.5 h-3.5 text-blue-500" />;
    }
    if (s === 'vercel') {
      return <span className="font-bold text-[9px] text-black dark:text-white">▲</span>;
    }
    if (s.includes('scraping')) {
      return <Search className="w-3.5 h-3.5 text-teal-500" />;
    }
    if (s.includes('data structures') || s.includes('algorithms')) {
      return <Binary className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (s.includes('competitive')) {
      return <Award className="w-3.5 h-3.5 text-amber-500" />;
    }

    return <Code2 className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#161c2e] border border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-normal hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-2xs select-none">
      <span className="flex-shrink-0 flex items-center justify-center">
        {getSkillIcon(name)}
      </span>
      <span className="whitespace-nowrap text-[12px]">{name}</span>
    </div>
  );
};
