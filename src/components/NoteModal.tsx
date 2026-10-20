import React, { useEffect } from 'react';
import { NotePost } from '../data/notes';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';

interface NoteModalProps {
  note: NotePost | null;
  onClose: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ note, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (note) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [note, onClose]);

  if (!note) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-note-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0f1218] light:bg-white text-slate-200 light:text-slate-800 rounded-2xl border border-slate-800 light:border-slate-300 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 light:border-slate-200 bg-[#0a0d12]/90 light:bg-slate-50/90 sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notes &amp; Learning</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white light:hover:text-slate-900 rounded-lg hover:bg-slate-800 light:hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Close note modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 light:text-slate-500 mb-2">
              <span className="font-medium text-cyan-400 light:text-cyan-600">{note.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {note.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {note.readTime}
              </span>
            </div>

            <h2 id="modal-note-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900 leading-snug">
              {note.title}
            </h2>
          </div>

          <div className="prose prose-invert max-w-none space-y-4 text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed">
            {note.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags (unboxed text separators per constitution) */}
          <div className="pt-6 border-t border-slate-800 light:border-slate-200">
            <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-sans">Topics:</span>
              {note.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span className="text-cyan-400/90">#{tag}</span>
                  {idx < note.tags.length - 1 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a0d12] light:bg-slate-100 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>By Oakimul Sami</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 light:bg-white text-slate-200 light:text-slate-800 border border-slate-700 light:border-slate-300 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
