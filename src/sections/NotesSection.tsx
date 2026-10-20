import React, { useState } from 'react';
import { NotePost, notesData } from '../data/notes';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';

interface NotesSectionProps {
  onSelectNote: (note: NotePost) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ onSelectNote }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const tags = ['All', 'Backend', 'Foundations', 'Database Systems', 'AI & Innovation'];

  const filteredNotes = notesData.filter((note) => {
    if (selectedTag === 'All') return true;
    if (selectedTag === 'Backend') return note.category.includes('Backend');
    if (selectedTag === 'Foundations') return note.category.includes('Computer Science');
    if (selectedTag === 'Database Systems') return note.category.includes('Database');
    if (selectedTag === 'AI & Innovation') return note.category.includes('AI');
    return true;
  });

  const displayedNotes = showAll ? filteredNotes : filteredNotes.slice(0, 3);

  return (
    <section id="writing" className="py-20 px-4 sm:px-6 border-t border-slate-800/80 light:border-slate-200">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Notes &amp; Writing
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white light:text-slate-900">
              Technical Writing &amp; Learning Logs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 max-w-xl">
              Documenting key architectural decisions, database normalization lessons, and reflections as an undergraduate computer science student.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 light:bg-slate-100 rounded-lg border border-slate-800 light:border-slate-300 overflow-x-auto self-start sm:self-auto max-w-full">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-slate-800 light:bg-white text-cyan-400 light:text-slate-900 shadow-sm'
                    : 'text-slate-400 light:text-slate-600 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedNotes.map((note) => (
            <article
              key={note.id}
              onClick={() => onSelectNote(note)}
              className="group p-6 rounded-xl bg-[#0e1117] light:bg-white border border-slate-800 light:border-slate-200 hover:border-slate-700 light:hover:border-slate-300 transition-all flex flex-col justify-between space-y-5 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Metadata: Unboxed text with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 light:text-slate-500 font-mono">
                  <span className="text-cyan-400 light:text-cyan-700 font-medium">
                    {note.category}
                  </span>
                  <span>·</span>
                  <span>{note.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition-colors leading-snug line-clamp-2">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed line-clamp-3">
                  {note.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.date}
                </span>

                <span className="text-cyan-400 light:text-cyan-700 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Note <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA for reading all posts */}
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800 bg-slate-900 light:bg-slate-100 hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-800 light:border-slate-300 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{showAll ? 'Show Fewer Posts' : 'Read All Posts'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
