import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Mail, Linkedin, Facebook, Instagram, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { WhatsAppIcon, getWhatsAppUrl } from './SocialIcons';

export const Footer: React.FC = () => {
  const { personal, setIsAdminOpen, isAuthenticated } = usePortfolio();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0d14] transition-colors relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#5658df] dark:text-[#6869f1]">
              &lt; {personal.name} /&gt;
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-xs text-slate-500 font-mono">Uttara University CSE</span>
          </div>

          {/* Center: "Made with ❤️ by Oakimul Sami" (signature style from developerfolio / shahjalalshohag) */}
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
            <span>by</span>
            <span className="font-bold text-[#202a48] dark:text-white">{personal.name}</span>
          </div>

          {/* Social links row */}
          <div className="flex items-center gap-3">
            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#5658df] transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#5658df] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {personal.facebook && (
              <a
                href={personal.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#1877f2] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            {personal.instagram && (
              <a
                href={personal.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {personal.whatsapp && (
              <a
                href={getWhatsAppUrl(personal.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#25D366] transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}

            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#5658df] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#5658df] transition-colors"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-600 font-mono pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <span>© {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
        </div>
      </div>

      {/* Floating Scroll to Top Button (#topButton matching shahjalalshohag.com) */}
      {showTopButton && (
        <button
          id="topButton"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-[#121624]/90 text-[#5658df] dark:text-[#6869f1] border border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
