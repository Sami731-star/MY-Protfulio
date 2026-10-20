import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personalData, PersonalInfo } from '../data/personal';
import { initialResearchPapers, ResearchPaper } from '../data/research';
import { projectsData, Project } from '../data/projects';
import { skillCategories, SkillCategory } from '../data/skills';
import { educationList, EducationItem, educationData, EducationInfo } from '../data/education';
import { currentlyBuildingList, CurrentlyBuildingItem } from '../data/building';
import { journeyTimeline, JourneyItem } from '../data/journey';
import { achievementsData, AchievementItem } from '../data/achievements';
import { workExperiencesData, WorkExperienceItem } from '../data/experience';

const STORAGE_KEY = 'oakimul_sami_portfolio_state_v2';
const AUTH_KEY = 'oakimul_sami_admin_auth';
const TOKEN_KEY = 'oakimul_sami_admin_token';

interface PortfolioState {
  personal: PersonalInfo;
  researchPapers: ResearchPaper[];
  projects: Project[];
  skills: SkillCategory[];
  education: EducationInfo;
  educations: EducationItem[];
  workExperiences: WorkExperienceItem[];
  building: CurrentlyBuildingItem[];
  journey: JourneyItem[];
  achievements: AchievementItem[];
}

export interface SecurityStatusInfo {
  isDefaultPasscode: boolean;
  activeSessionsCount: number;
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
  sessionDurationMinutes: number;
  currentSessionCreatedAt: string;
  currentSessionExpiresAt: string;
  currentSessionIp: string;
  auditLogsCount: number;
  serverUptimeSeconds: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  event: string;
  status: 'success' | 'failure' | 'warning' | 'security';
  ip: string;
  userAgent: string;
  details: string;
}

interface PortfolioContextType {
  personal: PersonalInfo;
  researchPapers: ResearchPaper[];
  projects: Project[];
  skills: SkillCategory[];
  education: EducationInfo;
  educations: EducationItem[];
  workExperiences: WorkExperienceItem[];
  building: CurrentlyBuildingItem[];
  journey: JourneyItem[];
  achievements: AchievementItem[];
  
  // Admin UI & Security State
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  adminToken: string | null;
  setAdminSession: (token: string | null) => void;
  adminLogout: () => Promise<void>;
  changePasscode: (currentPasscode: string, newPasscode: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  fetchSecurityStatus: () => Promise<SecurityStatusInfo | null>;
  fetchAuditLogs: () => Promise<AuditLogItem[]>;
  clearAuditLogs: () => Promise<boolean>;
  isSaving: boolean;
  statusMessage: string | null;

  // Actions
  downloadResume: () => void;
  updatePersonal: (updates: Partial<PersonalInfo>) => Promise<boolean>;
  updatePhoto: (photoUrl: string) => Promise<boolean>;
  updateResume: (resumeUrl: string, fileName?: string, fileSize?: string, fileType?: string) => Promise<boolean>;
  addResearchPaper: (paper: Omit<ResearchPaper, 'id'> & { id?: string }) => Promise<boolean>;
  updateResearchPaper: (paper: ResearchPaper) => Promise<boolean>;
  deleteResearchPaper: (id: string) => Promise<boolean>;
  addWorkExperience: (item: Omit<WorkExperienceItem, 'id'> & { id?: string }) => Promise<boolean>;
  updateWorkExperience: (item: WorkExperienceItem) => Promise<boolean>;
  deleteWorkExperience: (id: string) => Promise<boolean>;
  addEducation: (item: Omit<EducationItem, 'id'> & { id?: string }) => Promise<boolean>;
  updateEducation: (item: EducationItem) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;
  updateProject: (updatedProject: Project) => Promise<boolean>;
  addProject: (newProject: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateSkills: (categories: SkillCategory[]) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial states with fallback to localStorage if available
  const [personal, setPersonal] = useState<PersonalInfo>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.personal) return { ...personalData, ...parsed.personal };
      }
    } catch (e) {
      console.warn('Could not read cached portfolio personal data:', e);
    }
    return personalData;
  });

  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.researchPapers) && parsed.researchPapers.length > 0) {
          return parsed.researchPapers;
        }
      }
    } catch (e) {
      console.warn('Could not read cached research papers:', e);
    }
    return initialResearchPapers;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.projects)) return parsed.projects;
      }
    } catch (e) {}
    return projectsData;
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.skills) && parsed.skills.length >= skillCategories.length) {
          return parsed.skills;
        }
      }
    } catch (e) {}
    return skillCategories;
  });

  const [education, setEducation] = useState<EducationInfo>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.education) return parsed.education;
      }
    } catch (e) {}
    return educationData;
  });

  const [educations, setEducations] = useState<EducationItem[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.educations) && parsed.educations.length > 0) return parsed.educations;
      }
    } catch (e) {}
    return educationList;
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperienceItem[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.workExperiences)) return parsed.workExperiences;
      }
    } catch (e) {}
    return workExperiencesData;
  });

  const [building, setBuilding] = useState<CurrentlyBuildingItem[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.building)) return parsed.building;
      }
    } catch (e) {}
    return currentlyBuildingList;
  });

  const [journey, setJourney] = useState<JourneyItem[]>(journeyTimeline);
  const [achievements, setAchievements] = useState<AchievementItem[]>(achievementsData);

  // Admin Modal & Security state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminTokenState] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true' && Boolean(sessionStorage.getItem(TOKEN_KEY));
    } catch {
      return false;
    }
  });

  const setAdminSession = useCallback((token: string | null) => {
    setAdminTokenState(token);
    try {
      if (token) {
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(AUTH_KEY, 'true');
        setIsAuthenticatedState(true);
      } else {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticatedState(false);
      }
    } catch {}
  }, []);

  const setIsAuthenticated = (auth: boolean) => {
    if (!auth) {
      setAdminSession(null);
    } else {
      setIsAuthenticatedState(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
    }
  };

  // Helper to obtain authorized Bearer headers
  const getAuthHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = adminToken || sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }, [adminToken]);

  // Admin Logout: notifies backend and wipes local session
  const adminLogout = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      await fetch('/api/admin/logout', { method: 'POST', headers });
    } catch {}
    setAdminSession(null);
    showStatus('Admin logged out securely.');
  }, [getAuthHeaders, setAdminSession]);

  // Inactivity Auto-Lockout (30 minutes of no user interaction)
  useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimer: any;
    const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        adminLogout();
      }, INACTIVITY_TIMEOUT_MS);
    };

    resetTimer();

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [isAuthenticated, adminLogout]);

  // Change Admin Passcode API
  const changePasscode = async (currentPasscode: string, newPasscode: string) => {
    try {
      const res = await fetch('/api/admin/change-passcode', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPasscode, newPasscode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('Passcode updated successfully!');
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Failed to update passcode' };
      }
    } catch (err) {
      return { success: false, error: 'Network error while updating passcode' };
    }
  };

  // Fetch Security Status
  const fetchSecurityStatus = async (): Promise<SecurityStatusInfo | null> => {
    try {
      const res = await fetch('/api/admin/security-status', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return data.security;
      }
    } catch (err) {
      console.warn('Could not fetch security status:', err);
    }
    return null;
  };

  // Fetch Security Audit Logs
  const fetchAuditLogs = async (): Promise<AuditLogItem[]> => {
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return data.logs || [];
      }
    } catch (err) {
      console.warn('Could not fetch audit logs:', err);
    }
    return [];
  };

  // Clear Audit Logs
  const clearAuditLogs = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/clear-logs', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showStatus('Audit logs cleared');
        return true;
      }
    } catch (err) {
      console.warn('Could not clear logs:', err);
    }
    return false;
  };

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 3500);
  };

  // Helper to persist current state to localStorage and backend
  const persistState = useCallback(
    async (updatedPartial: Partial<PortfolioState>) => {
      const nextPersonal = updatedPartial.personal || personal;
      const nextResearch = updatedPartial.researchPapers || researchPapers;
      const nextProjects = updatedPartial.projects || projects;
      const nextSkills = updatedPartial.skills || skills;
      const nextEducation = updatedPartial.education || education;
      const nextEducations = updatedPartial.educations || educations;
      const nextWorkExperiences = updatedPartial.workExperiences || workExperiences;
      const nextBuilding = updatedPartial.building || building;

      const fullState: PortfolioState = {
        personal: nextPersonal,
        researchPapers: nextResearch,
        projects: nextProjects,
        skills: nextSkills,
        education: nextEducation,
        educations: nextEducations,
        workExperiences: nextWorkExperiences,
        building: nextBuilding,
        journey,
        achievements,
      };

      // 1. Save to local storage for instant offline recovery
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullState));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      // 2. Sync to Node.js backend API with Bearer token
      try {
        setIsSaving(true);
        const res = await fetch('/api/portfolio', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            personal: nextPersonal,
            researchPapers: nextResearch,
            projects: nextProjects,
            skills: nextSkills,
            education: nextEducation,
            educations: nextEducations,
            workExperiences: nextWorkExperiences,
            building: nextBuilding,
          }),
        });

        if (res.ok) {
          showStatus('Changes saved to backend database!');
          return true;
        } else if (res.status === 401) {
          showStatus('Session expired. Please log in again.');
          setAdminSession(null);
          return false;
        } else {
          showStatus('Saved locally (server response was not 200)');
          return true;
        }
      } catch (err) {
        console.warn('Server sync error (working in local persistence mode):', err);
        showStatus('Saved locally to browser storage');
        return true;
      } finally {
        setIsSaving(false);
      }
    },
    [personal, researchPapers, projects, skills, education, educations, workExperiences, building, journey, achievements, getAuthHeaders, setAdminSession]
  );

  // Fetch initial data from server on load
  useEffect(() => {
    let isMounted = true;
    async function fetchServerData() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            const serverData = json.data;
            if (serverData.personal) {
              setPersonal((prev) => ({ ...prev, ...serverData.personal }));
            }
            if (Array.isArray(serverData.researchPapers) && serverData.researchPapers.length > 0) {
              setResearchPapers(serverData.researchPapers);
            }
            if (Array.isArray(serverData.workExperiences) && serverData.workExperiences.length > 0) {
              setWorkExperiences(serverData.workExperiences);
            }
            if (Array.isArray(serverData.educations) && serverData.educations.length > 0) {
              setEducations(serverData.educations);
            }
            if (Array.isArray(serverData.projects)) {
              setProjects(serverData.projects);
            }
            if (Array.isArray(serverData.skills)) {
              setSkills(serverData.skills);
            }
            if (serverData.education) {
              setEducation(serverData.education);
            }
          }
        }
      } catch (err) {
        // Backend might be warming up or offline, local data continues to work flawlessly
        console.log('Using local portfolio data.');
      }
    }
    fetchServerData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update Personal Info
  const updatePersonal = async (updates: Partial<PersonalInfo>) => {
    const updated = { ...personal, ...updates };
    setPersonal(updated);
    return await persistState({ personal: updated });
  };

  // Update Photo Slot
  const updatePhoto = async (photoUrl: string) => {
    const updated = { ...personal, avatarUrl: photoUrl };
    setPersonal(updated);
    try {
      await fetch('/api/portfolio/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl }),
      });
    } catch (err) {
      console.warn('Photo API error:', err);
    }
    return await persistState({ personal: updated });
  };

  // Update CV / Resume
  const updateResume = async (resumeUrl: string, fileName?: string, fileSize?: string, fileType?: string) => {
    const updated = {
      ...personal,
      resumeUrl,
      resumeFileName: fileName || (resumeUrl && resumeUrl !== '#' ? 'Oakimul_Sami_CV.pdf' : ''),
      resumeFileSize: fileSize || '',
      resumeFileType: fileType || 'application/pdf',
      resumeUpdatedAt: new Date().toISOString()
    };
    setPersonal(updated);
    try {
      await fetch('/api/portfolio/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeUrl,
          resumeFileName: updated.resumeFileName,
          resumeFileSize: updated.resumeFileSize,
          resumeFileType: updated.resumeFileType
        }),
      });
      showStatus(resumeUrl && resumeUrl !== '#' ? 'CV / Resume updated successfully!' : 'CV cleared');
    } catch (err) {
      console.warn('Resume API error:', err);
    }
    return await persistState({ personal: updated });
  };

  // Direct Download Resume Action (as requested: prompts/triggers download directly without visual CV modal)
  const downloadResume = () => {
    if (personal.resumeUrl && personal.resumeUrl !== '#') {
      const link = document.createElement('a');
      link.href = personal.resumeUrl;
      link.download = personal.resumeFileName || `${personal.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showStatus(`Downloading ${personal.resumeFileName || 'CV file'}...`);
    } else {
      const resumeContent = `${personal.name} - Curriculum Vitae
=====================================================
${personal.headline}
University: ${personal.university}
Department: ${personal.department}
Location: ${personal.location}
Email: ${personal.email}
GitHub: ${personal.github}
LinkedIn: ${personal.linkedin}

Summary:
${personal.shortBio}

Education:
- ${education.institution}
  Degree: ${education.degree} (${education.department})
  Period: ${education.period} (${education.status})
  Relevant Courses: ${(education.coursework || []).join(', ')}

Technical Skills:
${skills.map((s) => `- ${s.title}: ${s.skills.join(', ')}`).join('\n')}

Selected Projects:
${projects
  .map(
    (p) =>
      `- ${p.title} (${p.year || '2025'}): ${p.tagline || p.description}\n  Tech: ${(p.technologies || []).join(', ')}`
  )
  .join('\n\n')}
`;
      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showStatus('Downloading Resume document...');
    }
  };

  // Add Research Paper
  const addResearchPaper = async (paper: Omit<ResearchPaper, 'id'> & { id?: string }) => {
    const newPaper: ResearchPaper = {
      ...paper,
      id: paper.id || `paper-${Date.now()}`,
    };
    const updatedPapers = [newPaper, ...researchPapers];
    setResearchPapers(updatedPapers);
    return await persistState({ researchPapers: updatedPapers });
  };

  // Update Research Paper
  const updateResearchPaper = async (paper: ResearchPaper) => {
    const updatedPapers = researchPapers.map((p) => (p.id === paper.id ? paper : p));
    setResearchPapers(updatedPapers);
    return await persistState({ researchPapers: updatedPapers });
  };

  // Delete Research Paper
  const deleteResearchPaper = async (id: string) => {
    const updatedPapers = researchPapers.filter((p) => p.id !== id);
    setResearchPapers(updatedPapers);
    return await persistState({ researchPapers: updatedPapers });
  };

  // Add Work Experience
  const addWorkExperience = async (item: Omit<WorkExperienceItem, 'id'> & { id?: string }) => {
    const newItem: WorkExperienceItem = {
      ...item,
      id: item.id || `exp-${Date.now()}`,
    };
    const updated = [newItem, ...workExperiences];
    setWorkExperiences(updated);
    return await persistState({ workExperiences: updated });
  };

  // Update Work Experience
  const updateWorkExperience = async (item: WorkExperienceItem) => {
    const updated = workExperiences.map((e) => (e.id === item.id ? item : e));
    setWorkExperiences(updated);
    return await persistState({ workExperiences: updated });
  };

  // Delete Work Experience
  const deleteWorkExperience = async (id: string) => {
    const updated = workExperiences.filter((e) => e.id !== id);
    setWorkExperiences(updated);
    return await persistState({ workExperiences: updated });
  };

  // Update Project
  const updateProject = async (updatedProject: Project) => {
    const updatedProjects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(updatedProjects);
    return await persistState({ projects: updatedProjects });
  };

  // Add Project
  const addProject = async (newProject: Project) => {
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    return await persistState({ projects: updatedProjects });
  };

  // Delete Project
  const deleteProject = async (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    return await persistState({ projects: updatedProjects });
  };

  // Update Skills
  const updateSkills = async (categories: SkillCategory[]) => {
    setSkills(categories);
    return await persistState({ skills: categories });
  };

  // Add Education Entry
  const addEducation = async (item: Omit<EducationItem, 'id'> & { id?: string }) => {
    const newItem: EducationItem = {
      ...item,
      id: item.id || `edu-${Date.now()}`,
    };
    const updated = [...educations, newItem];
    setEducations(updated);
    if (updated.length > 0) {
      setEducation((prev) => ({
        ...prev,
        institution: updated[0].institution,
        degree: updated[0].degree,
        department: updated[0].department || prev.department,
        location: updated[0].location || prev.location,
        status: updated[0].status,
        period: updated[0].period,
        academicFocus: updated[0].academicFocus || prev.academicFocus,
        coursework: updated[0].coursework || prev.coursework,
        logoUrl: updated[0].logoUrl,
      }));
    }
    return await persistState({ educations: updated });
  };

  // Update Education Entry
  const updateEducation = async (item: EducationItem) => {
    const updated = educations.map((e) => (e.id === item.id ? item : e));
    setEducations(updated);
    if (updated.length > 0) {
      setEducation((prev) => ({
        ...prev,
        institution: updated[0].institution,
        degree: updated[0].degree,
        department: updated[0].department || prev.department,
        location: updated[0].location || prev.location,
        status: updated[0].status,
        period: updated[0].period,
        academicFocus: updated[0].academicFocus || prev.academicFocus,
        coursework: updated[0].coursework || prev.coursework,
        logoUrl: updated[0].logoUrl,
      }));
    }
    return await persistState({ educations: updated });
  };

  // Delete Education Entry
  const deleteEducation = async (id: string) => {
    const updated = educations.filter((e) => e.id !== id);
    setEducations(updated);
    return await persistState({ educations: updated });
  };

  // Reset to Defaults
  const resetToDefaults = async () => {
    setPersonal(personalData);
    setResearchPapers(initialResearchPapers);
    setProjects(projectsData);
    setSkills(skillCategories);
    setEducation(educationData);
    setEducations(educationList);
    setWorkExperiences(workExperiencesData);
    setBuilding(currentlyBuildingList);
    setJourney(journeyTimeline);
    setAchievements(achievementsData);

    try {
      localStorage.removeItem(STORAGE_KEY);
      await fetch('/api/portfolio/reset', { method: 'POST' });
    } catch {}

    showStatus('Portfolio reset to default template.');
    return true;
  };

  // Export JSON
  const exportDataJSON = () => {
    const exportObj = {
      personal,
      researchPapers,
      projects,
      skills,
      education,
      educations,
      workExperiences,
      building,
      journey,
      achievements,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(exportObj, null, 2);
  };

  // Import JSON
  const importDataJSON = async (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personal) setPersonal(parsed.personal);
      if (Array.isArray(parsed.researchPapers)) setResearchPapers(parsed.researchPapers);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
      if (parsed.education) setEducation(parsed.education);
      if (Array.isArray(parsed.educations)) setEducations(parsed.educations);
      if (Array.isArray(parsed.workExperiences)) setWorkExperiences(parsed.workExperiences);
      if (Array.isArray(parsed.building)) setBuilding(parsed.building);
      await persistState(parsed);
      showStatus('Portfolio data imported successfully!');
      return true;
    } catch (err) {
      showStatus('Invalid JSON file format.');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personal,
        researchPapers,
        projects,
        skills,
        education,
        educations,
        workExperiences,
        building,
        journey,
        achievements,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        setIsAuthenticated,
        adminToken,
        setAdminSession,
        adminLogout,
        changePasscode,
        fetchSecurityStatus,
        fetchAuditLogs,
        clearAuditLogs,
        isSaving,
        statusMessage,
        downloadResume,
        updatePersonal,
        updatePhoto,
        updateResume,
        addResearchPaper,
        updateResearchPaper,
        deleteResearchPaper,
        addWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        updateProject,
        addProject,
        deleteProject,
        updateSkills,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
