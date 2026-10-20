import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram,
  Mail, 
  FileText, 
  Code2, 
  BookOpen, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Sparkles,
  Trophy,
  Globe
} from 'lucide-react';
import { WhatsAppIcon, getWhatsAppUrl } from '../components/SocialIcons';

export const ContactSection: React.FC = () => {
  const { personal, downloadResume } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!personal.email) return;
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const socialLinks = [
    {
      id: 'github',
      label: 'GitHub',
      href: personal.github || 'https://github.com/sami731-star',
      icon: <Github className="w-4 h-4" />
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: personal.linkedin || 'https://linkedin.com/in/oakimul-sami',
      icon: <Linkedin className="w-4 h-4" />
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: getWhatsAppUrl(personal.whatsapp || '+8801700000000'),
      icon: <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: personal.facebook || 'https://facebook.com/oakimul.sami',
      icon: <Facebook className="w-4 h-4" />
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: personal.instagram || 'https://instagram.com/oakimul.sami',
      icon: <Instagram className="w-4 h-4" />
    },
    {
      id: 'resume',
      label: 'Resume / CV',
      href: personal.resumeUrl || '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        downloadResume();
      },
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '#projects',
      icon: <Code2 className="w-4 h-4" />
    },
    {
      id: 'achievements',
      label: 'Achievements',
      href: '#achievements',
      icon: <Trophy className="w-4 h-4" />
    },
    {
      id: 'journey',
      label: 'Journey',
      href: '#journey',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'email-link',
      label: 'Direct Email',
      href: `mailto:${personal.email}`,
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        
        {/* Top Header & Prominent Email Area matching demo screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#161e38] dark:text-white">
              Contact Me
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Interested in working together? Feel free to reach out about engineering roles, collaborations, or other questions. I usually reply within 24 hours.
            </p>
          </div>

          {/* Right Column: Prominent Email Card matching demo */}
          <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-10">
            <div className="relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all group">
              <a
                href={`mailto:${personal.email}`}
                className="text-lg sm:text-2xl lg:text-[26px] font-normal tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate"
                title={`Send email to ${personal.email}`}
              >
                {personal.email}
              </a>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 sm:p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <a
                  href={`mailto:${personal.email}`}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-white group-hover:border-indigo-400 dark:group-hover:border-indigo-500 group-hover:scale-105 transition-all shadow-xs"
                  title="Open mail client"
                  aria-label="Open mail client"
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {copied && (
                <div className="absolute -top-3 right-4 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-medium shadow-md animate-fade-in">
                  Email copied to clipboard!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <div className="border-t border-slate-200/90 dark:border-slate-800/90" />

        {/* 5-Column Grid of Link Cards matching demo screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {socialLinks.map((item) => {
            const isExternal = item.href.startsWith('http') || item.href.startsWith('mailto');
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={item.onClick}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#121624] border border-slate-200/90 dark:border-slate-800 hover:border-slate-400/80 dark:hover:border-slate-600 transition-all group shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">
                    {item.label}
                  </span>
                </div>

                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
