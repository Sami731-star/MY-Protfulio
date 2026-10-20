import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram,
  ArrowRight,
  Code2,
  MessageSquare,
  Camera,
  Maximize2
} from 'lucide-react';
import { WhatsAppIcon, getWhatsAppUrl } from '../components/SocialIcons';

interface HeroSectionProps {
  onOpenPhotoLightbox?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPhotoLightbox }) => {
  const { personal, downloadResume, setIsAdminOpen } = usePortfolio();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[82vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Exactly matches the demo screenshot (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Main Heading matching the screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1e293b] dark:text-white leading-[1.12]">
              Hi, I'm <span className="text-[#1e293b] dark:text-white">{personal.name}</span>
            </h1>

            {/* Subtitle Paragraph 1 with bold highlights */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <span className="font-semibold text-slate-900 dark:text-white">Undergraduate CSE Student</span> | Building practical web applications &amp; backend systems at{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{personal.university}</span> | Engineered{' '}
              <span className="font-semibold text-slate-900 dark:text-white">PHP</span>,{' '}
              <span className="font-semibold text-slate-900 dark:text-white">MySQL</span>, and{' '}
              <span className="font-semibold text-slate-900 dark:text-white">modern React</span> full-stack solutions
            </p>

            {/* Horizontal Divider Line matching the screenshot */}
            <div className="w-12 h-[2px] bg-slate-300 dark:bg-slate-700 my-4" />

            {/* Subtitle Paragraph 2 with bold highlights */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <span className="font-semibold text-slate-900 dark:text-white">C++ Problem Solver</span> | Algorithmic Practice at{' '}
              <span className="font-semibold text-slate-900 dark:text-white">Beecrowd &amp; Codeforces</span> | Database Systems &amp; Web Architect
            </p>

            {/* Social Media Icon Row matching the screenshot */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}

              {personal.facebook && (
                <a
                  href={personal.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                  title="Facebook Profile"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}

              {personal.instagram && (
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {personal.whatsapp && (
                <a
                  href={getWhatsAppUrl(personal.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-400 transition-all flex items-center justify-center shadow-xs"
                  title="Chat on WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </a>
              )}

              <a
                href="#achievements"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('achievements');
                }}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                title="Problem Solving & Code"
                aria-label="Problem Solving & Code"
              >
                <Code2 className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center shadow-xs"
                title="Send Message"
                aria-label="Send Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Action Buttons: Contact Me & See My Resume (Direct Download) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={downloadResume}
                className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#5658df] dark:text-indigo-300 border-2 border-[#5658df] font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm"
                title="Download Official CV"
              >
                <Download className="w-4 h-4" />
                <span>See My Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: PERFECT ROUND CIRCLE PHOTO (5 cols) matching the screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Soft ambient blur halo behind the circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5658df]/20 via-purple-500/20 to-sky-400/20 blur-2xl scale-105 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* The Round Shape Image Container exactly like the demo */}
              <div 
                onClick={personal.avatarUrl && onOpenPhotoLightbox ? onOpenPhotoLightbox : () => setIsAdminOpen(true)}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 ring-4 ring-slate-100 dark:ring-slate-800/80 cursor-pointer bg-slate-100 dark:bg-slate-800 transition-transform duration-300 group-hover:scale-[1.02]"
                title="Click to view full photo / change photo in Admin"
              >
                {personal.avatarUrl ? (
                  <img 
                    src={personal.avatarUrl} 
                    alt={personal.name} 
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    <div className="w-20 h-20 rounded-full bg-[#5658df]/15 flex items-center justify-center font-bold text-2xl text-[#5658df]">
                      {personal.initials || "OS"}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white text-sm">{personal.name}</span>
                    <span className="text-xs text-[#5658df] font-semibold underline">Click to upload photo</span>
                  </div>
                )}

                {/* Hover overlay with photo options */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  {onOpenPhotoLightbox && personal.avatarUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPhotoLightbox();
                      }}
                      className="p-3 rounded-full bg-white/90 text-slate-900 hover:bg-white shadow-lg transition-transform hover:scale-110"
                      title="View Full Size"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdminOpen(true);
                    }}
                    className="p-3 rounded-full bg-[#5658df] text-white hover:bg-[#4338ca] shadow-lg transition-transform hover:scale-110"
                    title="Change Photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
