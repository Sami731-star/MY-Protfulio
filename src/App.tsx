import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Project } from './data/projects';
import { NotePost } from './data/notes';

// Components
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { NoteModal } from './components/NoteModal';
import { AdminModal } from './components/AdminModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { CodingBackground } from './components/CodingBackground';
import { Footer } from './components/Footer';

// Sections matching shahjalalshohag.com structure
import { HeroSection } from './sections/HeroSection';
import { WorkExperienceSection } from './sections/WorkExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { JourneySection } from './sections/JourneySection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ResearchSection } from './sections/ResearchSection';
import { ContactSection } from './sections/ContactSection';

function PortfolioAppContent() {
  const { theme, toggleTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNote, setSelectedNote] = useState<NotePost | null>(null);
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for animated top progress bar
  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5f7ff] dark:bg-[#0a0d14] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Reading / Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-[#5658df] origin-left transition-all duration-75 shadow-sm shadow-indigo-500/50" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Clean Ambient Background (matching shahjalalshohag.com) */}
      <CodingBackground />

      {/* Navigation Bar with Direct Resume Download */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections (matching shahjalalshohag.com) */}
      <main id="main-content" className="relative z-10 focus:outline-none">
        <HeroSection onOpenPhotoLightbox={() => setIsPhotoLightboxOpen(true)} />
        <WorkExperienceSection />
        <SkillsSection />
        <EducationSection />
        <JourneySection />
        <ResearchSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <NoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      {/* Full Photo Lightbox */}
      <ImageLightboxModal
        isOpen={isPhotoLightboxOpen}
        onClose={() => setIsPhotoLightboxOpen(false)}
      />

      {/* Admin Panel Modal to edit all information, photo, and CV upload */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}
