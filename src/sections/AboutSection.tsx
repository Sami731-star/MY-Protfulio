import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  BookOpen, 
  Cpu,
  Camera,
  Maximize2,
  ExternalLink,
  UserCheck,
  Code2,
  Sparkles
} from 'lucide-react';

interface AboutSectionProps {
  onOpenPhotoLightbox?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPhotoLightbox }) => {
  const { personal, education, setIsAdminOpen } = usePortfolio();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 border-t border-slate-800/80 light:border-slate-200 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div 
        className="absolute top-1/2 -right-32 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white light:text-slate-900">
            Building software with curiosity, discipline, and purpose.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story / Prose (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed">
            {personal.extendedBio && personal.extendedBio.length > 0 ? (
              personal.extendedBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{personal.shortBio}</p>
            )}

            {/* Core Interests List */}
            {personal.coreInterests && personal.coreInterests.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 font-semibold mb-3">
                  Core Engineering Interests
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-300 light:text-slate-800 font-medium">
                  {personal.coreInterests.map((interest) => (
                    <div 
                      key={interest}
                      className="p-2.5 rounded-lg bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-300/80 flex items-center gap-2 transition-all hover:border-cyan-500/40 hover:-translate-y-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Currently Learning Area */}
            {personal.currentlyLearning && personal.currentlyLearning.length > 0 && (
              <div className="pt-6 border-t border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold">
                    Currently Learning &amp; Deepening
                  </h3>
                </div>
                <p className="text-xs text-slate-400 light:text-slate-600 mb-3">
                  Dedicated daily time focused on deepening technical competence and architectural patterns:
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {personal.currentlyLearning.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-md bg-[#11141c] light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300 hover:border-cyan-500/40 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Prominent Photo Slot & Academic Details Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dedicated Large Portrait Photo Card */}
            <div className="relative group">
              {/* Soft breathing ambient glow halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-blue-500/20 blur-xl opacity-60 group-hover:opacity-90 transition duration-500 animate-glow-pulse pointer-events-none" />

              <div className="relative p-6 rounded-2xl bg-[#0e1117] light:bg-slate-50 border border-slate-800 light:border-slate-200 shadow-xl space-y-5">
                {/* Photo Display Frame - Prominent & Big (Single Dedicated Place) */}
                <div className="relative group">
                  <div 
                    onClick={personal.avatarUrl && onOpenPhotoLightbox ? onOpenPhotoLightbox : () => setIsAdminOpen(true)}
                    className="relative w-full aspect-[4/5] sm:aspect-square max-h-[340px] rounded-2xl overflow-hidden border-2 border-slate-700/80 light:border-slate-300 group-hover:border-cyan-400 bg-slate-900 shadow-lg cursor-pointer transition-all duration-300"
                  >
                  {personal.avatarUrl ? (
                    <img 
                      src={personal.avatarUrl} 
                      alt={personal.name} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-cyan-300 p-6 text-center space-y-3">
                      <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-3xl font-bold text-cyan-300 shadow-inner">
                        {personal.initials || "OS"}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white text-base block">{personal.name}</span>
                        <span className="text-xs text-slate-400 font-mono">Uttara University CSE</span>
                      </div>
                      <span className="text-xs text-cyan-400 underline underline-offset-2">
                        Click to upload your portrait photo
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                  {/* Bottom Text on Photo */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-10">
                    <div>
                      <div className="text-sm font-bold text-white drop-shadow">
                        {personal.name}
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono drop-shadow">
                        {personal.department}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {onOpenPhotoLightbox && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPhotoLightbox();
                          }}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm transition-all"
                          title="Enlarge photo"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAdminOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-black/60 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm transition-all"
                        title="Upload/change photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status chip */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Student Developer</span>
                  </div>
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Camera className="w-3 h-3" />
                    <span>{personal.avatarUrl ? 'Update Photo' : 'Upload Photo'}</span>
                  </button>
                </div>
              </div>

              {/* Academic & Profile Details */}
              <div className="pt-2 border-t border-slate-800 light:border-slate-200 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 light:text-slate-500 block text-xs">University &amp; Degree</span>
                    <span className="font-medium text-slate-200 light:text-slate-900">
                      {personal.university || education.institution}
                    </span>
                    <span className="text-xs text-slate-400 light:text-slate-600 block">
                      {personal.degree || education.degree}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 light:text-slate-500 block text-xs">Location</span>
                    <span className="font-medium text-slate-200 light:text-slate-900">
                      {personal.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 light:text-slate-500 block text-xs">Direct Email</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-mono text-xs text-cyan-400 light:text-cyan-600 hover:underline"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 light:text-slate-500 block text-xs">Academic Status</span>
                    <span className="font-medium text-slate-200 light:text-slate-900">
                      {education.status} ({education.period})
                    </span>
                  </div>
                </div>
              </div>

              {/* Developer Mindset quote */}
              <div className="pt-3 border-t border-slate-800 light:border-slate-200">
                <blockquote className="text-xs text-slate-400 light:text-slate-600 italic">
                  "Writing code is about clarity, understanding data flows, and creating software that serves a genuine purpose."
                </blockquote>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
