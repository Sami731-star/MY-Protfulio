import React from 'react';
import { X, Download, Camera, Maximize2, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({ isOpen, onClose }) => {
  const { personal, setIsAdminOpen } = usePortfolio();

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!personal.avatarUrl) return;
    const link = document.createElement('a');
    link.href = personal.avatarUrl;
    link.download = `oakimul-sami-portrait.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenAdminPhoto = () => {
    onClose();
    setIsAdminOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-[#0d1117] light:bg-white border border-slate-800 light:border-slate-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 light:border-slate-200 bg-[#090c10] light:bg-slate-50">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white light:text-slate-900 font-mono">
              Oakimul Sami — Portrait Showcase
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800/60 light:hover:bg-slate-200 transition-colors"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Large Photo Display */}
        <div className="relative p-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#090c10] to-[#0d1117] light:from-slate-100 light:to-white min-h-[360px] sm:min-h-[460px]">
          {/* Subtle Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -top-10" />

          {personal.avatarUrl ? (
            <div className="relative group max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/30 bg-slate-900">
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className="w-full h-auto max-h-[65vh] object-contain mx-auto"
              />
            </div>
          ) : (
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-[#121824] flex flex-col items-center justify-center text-center p-6 space-y-4 shadow-xl">
              <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono text-3xl font-bold">
                {personal.initials || "OS"}
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-semibold text-base">{personal.name}</h4>
                <p className="text-xs text-slate-400">Uttara University · CSE</p>
              </div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                No custom photo has been uploaded yet. Click below to add your photo and show it here!
              </p>
              <button
                onClick={handleOpenAdminPhoto}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-medium text-xs shadow-md transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload My Photo</span>
              </button>
            </div>
          )}

          {/* Photo Metadata Footer */}
          <div className="mt-5 text-center space-y-1 z-10">
            <h4 className="text-base font-bold text-white light:text-slate-900">
              {personal.name}
            </h4>
            <p className="text-xs text-cyan-400 light:text-cyan-700 font-mono">
              {personal.headline}
            </p>
            <p className="text-[11px] text-slate-400 light:text-slate-500">
              {personal.university} • {personal.department} • {personal.location}
            </p>
          </div>
        </div>

        {/* Modal Actions Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 light:border-slate-200 bg-[#090c10] light:bg-slate-50 text-xs">
          <span className="text-slate-400 light:text-slate-600 font-mono text-[11px]">
            Personal Portfolio Asset
          </span>
          <div className="flex items-center gap-2">
            {personal.avatarUrl && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 light:border-slate-300 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            )}
            <button
              onClick={handleOpenAdminPhoto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 light:text-cyan-800 font-medium transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
