import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  Trophy, 
  Wrench, 
  Code2, 
  FolderGit2, 
  PenTool, 
  ChevronDown, 
  Download, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Mail,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
}) => {
  const { personal, setIsAdminOpen, isAuthenticated, downloadResume } = usePortfolio();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'education', 'journey', 'projects', 'achievements', 'research', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Experience', href: '#experience', id: 'experience', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Achievements', href: '#achievements', id: 'achievements', icon: <Trophy className="w-4 h-4" /> },
    { label: 'Skills', href: '#skills', id: 'skills', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Problem Solving', href: '#achievements', id: 'problem-solving', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Projects', href: '#projects', id: 'projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Research', href: '#research', id: 'research', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
      {/* Floating White Rounded Navbar Pill (matching Screenshot 2026-09-26 191356.png) */}
      <div className="pointer-events-auto max-w-6xl w-full bg-white/95 dark:bg-[#121625]/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-slate-200/90 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Signature Handwritten Name (single line on all screen sizes) */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2 focus:outline-none group pr-2 flex-shrink-0 whitespace-nowrap"
          aria-label={`${personal.name} Homepage`}
        >
          <span 
            className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#253052] dark:text-white tracking-wide transition-colors group-hover:text-[#5658df] dark:group-hover:text-[#6869f1] select-none whitespace-nowrap"
            style={{ fontFamily: "'Alex Brush', 'Caveat', cursive", fontStyle: 'normal', whiteSpace: 'nowrap' }}
          >
            {personal.name}
          </span>
        </a>

        {/* Center: Nav Items with Icons (EXACTLY AS IN SCREENSHOT) */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-[#475569] dark:text-slate-300"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#5658df] dark:text-[#6869f1] bg-indigo-50/80 dark:bg-indigo-950/40'
                    : 'hover:text-[#253052] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="text-[#5658df] dark:text-indigo-400">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* "More ⌵" Dropdown */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:text-[#253052] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-all font-semibold"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-[#5658df]' : ''}`} />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#161c2e] border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="#education"
                  onClick={(e) => handleLinkClick(e, '#education')}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <GraduationCap className="w-4 h-4 text-[#5658df]" />
                  <span>Education</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Mail className="w-4 h-4 text-[#5658df]" />
                  <span>Contact Me</span>
                </a>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    downloadResume();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#5658df]" />
                  <span>Download CV</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Direct Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Direct Resume Download Action Button */}
          <button
            onClick={downloadResume}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-[#5658df] hover:bg-[#4338ca] rounded-xl sm:rounded-full shadow-sm hover:shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Download Official Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Admin Panel Quick Lock Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className={`p-2 rounded-full transition-all ${
              isAuthenticated
                ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Admin Panel"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-700 dark:text-slate-300 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-3 right-3 bg-white dark:bg-[#121625] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xl pointer-events-auto space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#5658df]"
              >
                <span className="text-[#5658df]">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
            <a
              href="#education"
              onClick={(e) => handleLinkClick(e, '#education')}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#5658df]"
            >
              <GraduationCap className="w-4 h-4 text-[#5658df]" />
              <span>Education</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#5658df]"
            >
              <Mail className="w-4 h-4 text-[#5658df]" />
              <span>Contact Me</span>
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                downloadResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5658df] text-white font-bold text-xs shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (CV)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
