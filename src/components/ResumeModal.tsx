import React, { useEffect, useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Github, 
  MapPin, 
  ExternalLink, 
  FileText, 
  Check, 
  Eye, 
  Sparkles,
  GraduationCap,
  Code2,
  BookOpen,
  Award,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, education, skills, projects, researchPapers, setIsAdminOpen } = usePortfolio();
  
  const hasCustomCv = Boolean(personal.resumeUrl && personal.resumeUrl !== '#');
  const [activeTab, setActiveTab] = useState<'formatted' | 'document'>('formatted');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Detect whether the uploaded file is an image scan or a PDF
  const isImageFile = useMemo(() => {
    if (!personal.resumeUrl) return false;
    const url = personal.resumeUrl.toLowerCase();
    const type = (personal.resumeFileType || '').toLowerCase();
    const name = (personal.resumeFileName || '').toLowerCase();
    return (
      url.startsWith('data:image/') ||
      type.includes('image') ||
      name.endsWith('.png') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.webp')
    );
  }, [personal.resumeUrl, personal.resumeFileType, personal.resumeFileName]);

  // Convert Base64 data URL to a local Blob URL so browser doesn't block or auto-download PDF
  const safeDocumentUrl = useMemo(() => {
    if (!personal.resumeUrl || personal.resumeUrl === '#') return '';

    // If it's a data URL for PDF, convert to a Blob URL for reliable display
    if (personal.resumeUrl.startsWith('data:')) {
      try {
        const parts = personal.resumeUrl.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        return URL.createObjectURL(blob);
      } catch (err) {
        console.warn('Error creating blob url for resume:', err);
        return '/api/portfolio/resume-file';
      }
    }

    // If it's a Google Drive link, convert to /preview mode
    if (personal.resumeUrl.includes('drive.google.com')) {
      return personal.resumeUrl.replace(/\/view(\?.*)?$/, '/preview').replace(/\/edit(\?.*)?$/, '/preview');
    }

    return personal.resumeUrl;
  }, [personal.resumeUrl]);

  // Clean up blob URL on unmount or change
  useEffect(() => {
    return () => {
      if (safeDocumentUrl && safeDocumentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(safeDocumentUrl);
      }
    };
  }, [safeDocumentUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Direct Download of the CV file
  const handleDownload = () => {
    if (hasCustomCv) {
      const link = document.createElement('a');
      link.href = personal.resumeUrl;
      link.download = personal.resumeFileName || `${personal.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } else {
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenInNewTab = () => {
    if (safeDocumentUrl) {
      window.open(safeDocumentUrl, '_blank');
    } else if (hasCustomCv) {
      window.open(personal.resumeUrl, '_blank');
    }
  };

  const handleOpenAdminUpload = () => {
    onClose();
    setIsAdminOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-[#0b0e14] light:bg-white text-slate-200 light:text-slate-800 rounded-2xl border border-slate-800 light:border-slate-300 shadow-2xl overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 light:border-slate-200 bg-[#07090e]/95 light:bg-slate-50/95 sticky top-0 z-20 backdrop-blur-md print:hidden">
          
          {/* Title & Status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span id="modal-resume-title" className="text-xs sm:text-sm font-mono font-bold text-white light:text-slate-900 tracking-wide block">
                {personal.name} — Curriculum Vitae
              </span>
              <span className="text-[11px] text-cyan-400 font-mono hidden sm:inline-block">
                Uttara University · CSE Department
              </span>
            </div>
          </div>

          {/* Center Tabs: Always lets user see both the formatted CV and the original document */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 light:bg-slate-200 border border-slate-800 light:border-slate-300 text-xs">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                activeTab === 'formatted'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive CV</span>
            </button>

            {hasCustomCv && (
              <button
                onClick={() => setActiveTab('document')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  activeTab === 'document'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Uploaded Document</span>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Primary Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer font-sans"
              title={hasCustomCv ? `Download ${personal.resumeFileName || 'CV'}` : 'Print or Save as PDF'}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                  <span>{hasCustomCv ? 'Download CV' : 'Save PDF'}</span>
                </>
              )}
            </button>

            {hasCustomCv && (
              <button
                onClick={handleOpenInNewTab}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 light:text-slate-700 bg-slate-900 light:bg-slate-200 hover:bg-slate-800 light:hover:bg-slate-300 border border-slate-700 light:border-slate-300 rounded-lg transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Open in Tab</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 light:text-slate-700 bg-slate-900 light:bg-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white light:hover:text-slate-900 rounded-lg hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: INTERACTIVE FORMATTED CV (ALWAYS VISIBLE & READABLE) ===================== */}
        {activeTab === 'formatted' && (
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090b10] light:bg-white text-slate-200 light:text-slate-900 font-sans print:p-8 print:text-black">
            
            {/* Custom CV Notification Banner */}
            {hasCustomCv ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs font-mono text-emerald-300 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Your uploaded file <strong>{personal.resumeFileName || 'Oakimul_Sami_CV.pdf'}</strong> is active and ready to download!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('document')}
                    className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 font-semibold text-[11px] transition-colors"
                  >
                    View Original File
                  </button>
                  <button
                    onClick={handleOpenAdminUpload}
                    className="text-slate-400 hover:text-white text-[11px] underline underline-offset-2 transition-colors"
                  >
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Displaying live Curriculum Vitae sheet. You can also upload your custom PDF via Admin Panel.</span>
                </div>
                <button
                  onClick={handleOpenAdminUpload}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-[11px] transition-colors"
                >
                  Upload CV File
                </button>
              </div>
            )}

            {/* Resume Header */}
            <div className="border-b border-slate-800 light:border-slate-300 pb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
                    {personal.name}
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-cyan-400 light:text-cyan-700 mt-1">
                    {personal.headline}
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-400 light:text-slate-600 sm:text-right space-y-1">
                  <div className="flex items-center sm:justify-end gap-1.5 text-slate-300 light:text-slate-800 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{personal.university}</span>
                  </div>
                  <div>Department of Computer Science &amp; Engineering</div>
                  <div className="flex items-center sm:justify-end gap-1 text-slate-500">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Contact strip */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 light:text-slate-600 border-t border-slate-800/80 light:border-slate-200">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 text-cyan-400 light:text-cyan-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personal.email}</span>
                </a>
                <span>·</span>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white light:hover:text-black transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>github.com/sami731-star</span>
                </a>
                <span>·</span>
                <span className="text-slate-400">Available for Software Roles &amp; Collaborations</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Executive Summary</span>
              </h2>
              <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                {personal.shortBio}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Academic Education</span>
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-white light:text-slate-900">
                      {education.institution || personal.university}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400 light:text-cyan-700">
                      {education.degree || personal.degree} · {education.department || personal.department}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 light:text-slate-500">
                    {education.period} ({education.status})
                  </div>
                </div>

                {education.coursework && education.coursework.length > 0 && (
                  <div className="text-xs text-slate-300 light:text-slate-700 pt-1 border-t border-slate-800/60 light:border-slate-200">
                    <span className="font-semibold text-slate-400 light:text-slate-500">Key Coursework: </span>
                    {education.coursework.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Technical Skills Matrix */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Technical Skills &amp; Architecture</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skills.map((cat) => (
                  <div key={cat.id} className="p-3.5 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                    <span className="font-semibold text-white light:text-slate-900 block mb-1">
                      {cat.title}
                    </span>
                    <span className="text-slate-300 light:text-slate-700 font-mono text-[11px] leading-relaxed">
                      {cat.skills.join(' • ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Software Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Selected Software Projects</span>
              </h2>
              <div className="space-y-3">
                {projects.slice(0, 4).map((project) => (
                  <div key={project.id} className="p-4 rounded-xl bg-slate-900/40 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-bold text-white light:text-slate-900">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        {project.year || '2025'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed">
                      {project.tagline || project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-cyan-400 light:text-cyan-700">
                      {(project.technologies || []).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-800/80 light:bg-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research & Publications (if any) */}
            {researchPapers && researchPapers.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Research &amp; Scholarly Work</span>
                </h2>
                <div className="space-y-2.5">
                  {researchPapers.map((paper) => (
                    <div key={paper.id} className="p-3.5 rounded-xl bg-slate-900/40 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                        <span>{paper.status} ({paper.year})</span>
                        <span className="text-slate-500">{paper.venue}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white light:text-slate-900">
                        {paper.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Authors: {paper.authors.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Notice */}
            <div className="pt-6 border-t border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono">
              <span>{personal.name} · Uttara University CSE Portfolio</span>
              <button
                onClick={handleDownload}
                className="text-cyan-400 hover:underline flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{hasCustomCv ? 'Download Official Uploaded File' : 'Save PDF'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: ORIGINAL UPLOADED DOCUMENT VIEWER ===================== */}
        {activeTab === 'document' && hasCustomCv && (
          <div className="flex-1 flex flex-col bg-[#06080d] overflow-hidden">
            {/* Document Info Strip */}
            <div className="px-5 py-2.5 bg-[#05070a] border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{personal.resumeFileName || 'Oakimul_Sami_CV.pdf'}</span>
                </span>
                {personal.resumeFileSize && (
                  <span className="text-slate-500">({personal.resumeFileSize})</span>
                )}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-3">
                {isImageFile && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoomLevel((prev) => Math.max(50, prev - 15))}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-400">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel((prev) => Math.min(200, prev + 15))}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleOpenInNewTab}
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Fullscreen</span>
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={handleOpenAdminUpload}
                  className="text-slate-400 hover:text-white text-[11px] underline underline-offset-2"
                >
                  Change File
                </button>
              </div>
            </div>

            {/* Document Display Canvas */}
            <div className="flex-1 p-2 sm:p-4 bg-[#06080d] overflow-auto flex flex-col items-center justify-center min-h-[64vh] max-h-[75vh]">
              {isImageFile ? (
                /* High-Res Image Scan of CV */
                <div className="overflow-auto max-h-full max-w-full flex items-center justify-center p-2">
                  <img
                    src={personal.resumeUrl}
                    alt={`${personal.name} Curriculum Vitae`}
                    style={{ width: `${zoomLevel}%` }}
                    className="max-w-none transition-all duration-150 rounded-lg shadow-2xl border border-slate-800 bg-white"
                  />
                </div>
              ) : (
                /* PDF Document Display via Blob URL and /api/portfolio/resume-file */
                <div className="w-full h-full flex flex-col flex-1">
                  <object
                    data={safeDocumentUrl || '/api/portfolio/resume-file'}
                    type="application/pdf"
                    className="w-full flex-1 rounded-xl border border-slate-800 shadow-inner bg-slate-950 min-h-[60vh]"
                  >
                    {/* Fallback if browser does not support embedded PDF viewer */}
                    <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center p-8 bg-slate-900/90 rounded-xl border border-slate-800 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-white">
                          {personal.resumeFileName || 'Oakimul_Sami_CV.pdf'}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md">
                          Your PDF document is loaded and ready. You can open it in a new window or read the full Interactive CV.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          onClick={handleOpenInNewTab}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open PDF in New Window</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('formatted')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span>Switch to Interactive CV View</span>
                        </button>
                      </div>
                    </div>
                  </object>
                </div>
              )}

              {/* Bottom helper bar */}
              <div className="w-full mt-2 flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
                <span className="text-[11px] text-slate-500">
                  {isImageFile ? 'CV Image Document' : 'Official PDF Document'}
                </span>
                <button
                  onClick={handleDownload}
                  className="text-cyan-400 hover:underline flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download file directly</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
