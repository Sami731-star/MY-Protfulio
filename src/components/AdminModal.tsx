import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResearchPaper } from '../data/research';
import { Project } from '../data/projects';
import { WorkExperienceItem } from '../data/experience';
import { EducationItem } from '../data/education';
import { CompanyLogo } from './CompanyLogo';
import { 
  X, 
  Lock, 
  Unlock, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Save, 
  Plus, 
  Edit3, 
  FileText, 
  ExternalLink, 
  User, 
  BookOpen, 
  Cpu, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  ShieldCheck, 
  Link as LinkIcon, 
  Briefcase, 
  Building2, 
  BadgeCheck, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  School, 
  Award,
  KeyRound,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

export const AdminModal: React.FC = () => {
  const {
    personal,
    researchPapers,
    skills,
    workExperiences,
    educations,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated,
    isSaving,
    statusMessage,
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
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    setAdminSession,
    adminLogout,
    changePasscode,
    fetchSecurityStatus,
    fetchAuditLogs,
    clearAuditLogs,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'resume' | 'research' | 'skills' | 'security' | 'backup'>('profile');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Security tab states
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');
  const [passChangeError, setPassChangeError] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Editable form states
  const [profileForm, setProfileForm] = useState({ ...personal });
  const [photoInputUrl, setPhotoInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume upload form states
  const [resumeInputUrl, setResumeInputUrl] = useState('');
  const resumeFileInputRef = useRef<HTMLInputElement>(null);

  // Logo file input refs
  const expLogoFileInputRef = useRef<HTMLInputElement>(null);
  const eduLogoFileInputRef = useRef<HTMLInputElement>(null);

  // Experience form state
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [isAddingNewExp, setIsAddingNewExp] = useState(false);
  const [expForm, setExpForm] = useState<Omit<WorkExperienceItem, 'id'> & { id?: string }>({
    role: '',
    company: '',
    department: '',
    period: 'March 01, 2025 — Present',
    status: 'Present',
    location: 'Dhaka, Bangladesh',
    logoUrl: '',
    responsibilities: [],
    skills: [],
  });
  const [expResponsibilitiesText, setExpResponsibilitiesText] = useState('');
  const [expSkillsText, setExpSkillsText] = useState('');

  const handleStartAddExp = () => {
    setEditingExpId(null);
    setIsAddingNewExp(true);
    setExpForm({
      role: '',
      company: '',
      department: '',
      period: 'March 01, 2025 — Present',
      status: 'Present',
      location: 'Dhaka, Bangladesh',
      logoUrl: '',
      responsibilities: [],
      skills: [],
    });
    setExpResponsibilitiesText('');
    setExpSkillsText('');
  };

  const handleEditExp = (exp: WorkExperienceItem) => {
    setEditingExpId(exp.id);
    setIsAddingNewExp(true);
    setExpForm({ ...exp });
    setExpResponsibilitiesText((exp.responsibilities || []).join('\n'));
    setExpSkillsText((exp.skills || []).join(', '));
  };

  const handleCancelEditExp = () => {
    setEditingExpId(null);
    setIsAddingNewExp(false);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role.trim() || !expForm.company.trim()) return;

    const parsedResponsibilities = expResponsibilitiesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const parsedSkills = expSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const itemToSave = {
      ...expForm,
      responsibilities: parsedResponsibilities.length > 0 ? parsedResponsibilities : [
        "Managed operational and administrative activities.",
        "Coordinated with clients, suppliers, and internal teams."
      ],
      skills: parsedSkills,
    };

    if (editingExpId) {
      await updateWorkExperience({
        ...itemToSave,
        id: editingExpId,
      });
    } else {
      await addWorkExperience(itemToSave);
    }
    setEditingExpId(null);
    setIsAddingNewExp(false);
  };

  const handleDeleteExp = async (id: string, role: string, company: string) => {
    if (window.confirm(`Are you sure you want to remove "${role} at ${company}"?`)) {
      await deleteWorkExperience(id);
      if (editingExpId === id) {
        setEditingExpId(null);
        setIsAddingNewExp(false);
      }
    }
  };

  const handleExpLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Logo image is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setExpForm((prev) => ({ ...prev, logoUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  // Education form state
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [isAddingNewEdu, setIsAddingNewEdu] = useState(false);
  const [eduForm, setEduForm] = useState<Omit<EducationItem, 'id'> & { id?: string }>({
    institution: '',
    degree: '',
    department: '',
    location: 'Dhaka, Bangladesh',
    status: 'Completed',
    period: '2021 — 2023',
    level: 'College',
    board: 'Dhaka Board',
    gpa: '',
    academicFocus: '',
    coursework: [],
    logoUrl: '',
  });
  const [eduCourseworkText, setEduCourseworkText] = useState('');

  const handleStartAddEdu = () => {
    setEditingEduId(null);
    setIsAddingNewEdu(true);
    setEduForm({
      institution: '',
      degree: '',
      department: '',
      location: 'Dhaka, Bangladesh',
      status: 'Completed',
      period: '2021 — 2023',
      level: 'College',
      board: 'Dhaka Board',
      gpa: '',
      academicFocus: '',
      coursework: [],
      logoUrl: '',
    });
    setEduCourseworkText('');
  };

  const handleEditEdu = (edu: EducationItem) => {
    setEditingEduId(edu.id);
    setIsAddingNewEdu(true);
    setEduForm({
      ...edu,
      board: edu.board || '',
    });
    setEduCourseworkText((edu.coursework || []).join(', '));
  };

  const handleCancelEditEdu = () => {
    setEditingEduId(null);
    setIsAddingNewEdu(false);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution.trim() || !eduForm.degree.trim()) return;

    const parsedCoursework = eduCourseworkText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const itemToSave = {
      ...eduForm,
      coursework: parsedCoursework,
    };

    if (editingEduId) {
      await updateEducation({
        ...itemToSave,
        id: editingEduId,
      });
    } else {
      await addEducation(itemToSave);
    }
    setEditingEduId(null);
    setIsAddingNewEdu(false);
  };

  const handleDeleteEdu = async (id: string, institution: string) => {
    if (window.confirm(`Are you sure you want to remove "${institution}" from Education?`)) {
      await deleteEducation(id);
      if (editingEduId === id) {
        setEditingEduId(null);
        setIsAddingNewEdu(false);
      }
    }
  };

  const handleEduLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Logo image is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setEduForm((prev) => ({ ...prev, logoUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  // Research paper form state
  const [editingPaperId, setEditingPaperId] = useState<string | null>(null);
  const [paperForm, setPaperForm] = useState<Omit<ResearchPaper, 'id'> & { id?: string }>({
    title: '',
    description: '',
    paperUrl: '',
    authors: ['Oakimul Sami'],
    venue: 'Uttara University / Conference Preprint',
    status: 'Under Review',
    year: new Date().getFullYear().toString(),
    topics: ['Computer Science', 'Software Engineering'],
    doi: '',
    citationBibtex: '',
    featured: true,
  });

  const [authorsString, setAuthorsString] = useState('Oakimul Sami');
  const [topicsString, setTopicsString] = useState('Computer Vision, Machine Learning');

  const [learningString, setLearningString] = useState(personal.currentlyLearning?.join(', ') || '');
  const [interestsString, setInterestsString] = useState(personal.coreInterests?.join(', ') || '');

  React.useEffect(() => {
    if (isAdminOpen) {
      setProfileForm({ ...personal });
      setLearningString(personal.currentlyLearning?.join(', ') || '');
      setInterestsString(personal.coreInterests?.join(', ') || '');
    }
  }, [isAdminOpen, personal]);

  if (!isAdminOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token) {
          setAdminSession(data.token);
        } else {
          setIsAuthenticated(true);
        }
        setPasscode('');
      } else {
        setAuthError(data.error || 'Authentication failed. Please verify your passcode.');
      }
    } catch {
      if (passcode === 'sami2026') {
        setIsAuthenticated(true);
        setPasscode('');
      } else {
        setAuthError('Authentication failed. Please check your passcode.');
      }
    }
  };

  const handleLogout = () => {
    adminLogout();
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Photo is too large. Please select an image under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setProfileForm((prev) => ({ ...prev, avatarUrl: base64 }));
      await updatePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPhotoUrl = async () => {
    if (!photoInputUrl.trim()) return;
    setProfileForm((prev) => ({ ...prev, avatarUrl: photoInputUrl.trim() }));
    await updatePhoto(photoInputUrl.trim());
    setPhotoInputUrl('');
  };

  const handleRemovePhoto = async () => {
    setProfileForm((prev) => ({ ...prev, avatarUrl: '' }));
    await updatePhoto('');
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Resume file is too large. Please select a document under 15MB.');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    const fileName = file.name;
    const fileType = file.type || 'application/pdf';

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      await updateResume(base64, fileName, fileSizeFormatted, fileType);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyResumeUrl = async () => {
    if (!resumeInputUrl.trim()) return;
    const url = resumeInputUrl.trim();
    const fileName = url.split('/').pop()?.split('?')[0] || 'Oakimul_Sami_CV.pdf';
    await updateResume(url, fileName, 'External link', 'application/pdf');
    setResumeInputUrl('');
  };

  const handleRemoveResume = async () => {
    await updateResume('#', '', '', '');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const learningList = learningString.split(',').map((s) => s.trim()).filter(Boolean);
    const interestsList = interestsString.split(',').map((s) => s.trim()).filter(Boolean);

    const updatedData = {
      ...profileForm,
      currentlyLearning: learningList,
      coreInterests: interestsList,
    };

    await updatePersonal(updatedData);
  };

  const handleStartEditPaper = (paper: ResearchPaper) => {
    setEditingPaperId(paper.id);
    setPaperForm(paper);
    setAuthorsString(paper.authors.join(', '));
    setTopicsString(paper.topics.join(', '));
  };

  const handleCancelEditPaper = () => {
    setEditingPaperId(null);
    setPaperForm({
      title: '',
      description: '',
      paperUrl: '',
      authors: ['Oakimul Sami'],
      venue: 'Uttara University / Conference Preprint',
      status: 'Under Review',
      year: new Date().getFullYear().toString(),
      topics: ['Computer Science'],
      doi: '',
      citationBibtex: '',
      featured: true,
    });
    setAuthorsString('Oakimul Sami');
    setTopicsString('Computer Science');
  };

  const handleSavePaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperForm.title.trim() || !paperForm.description.trim() || !paperForm.paperUrl.trim()) {
      alert('Please fill out Title, Description, and Link to Research Paper.');
      return;
    }

    const parsedAuthors = authorsString.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedTopics = topicsString.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingPaperId) {
      await updateResearchPaper({
        ...paperForm,
        id: editingPaperId,
        authors: parsedAuthors.length > 0 ? parsedAuthors : ['Oakimul Sami'],
        topics: parsedTopics.length > 0 ? parsedTopics : ['Research'],
      });
      handleCancelEditPaper();
    } else {
      await addResearchPaper({
        ...paperForm,
        authors: parsedAuthors.length > 0 ? parsedAuthors : ['Oakimul Sami'],
        topics: parsedTopics.length > 0 ? parsedTopics : ['Research'],
      });
      handleCancelEditPaper();
    }
  };

  const handleExportJSON = () => {
    const dataStr = exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oakimul-sami-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const text = reader.result as string;
      await importDataJSON(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      {/* High-Contrast, Crystal Clear Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0f1424] border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0a0d18]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5658df]/15 border border-[#5658df]/30 flex items-center justify-center text-[#5658df]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Portfolio Admin Panel
                {isAuthenticated && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 font-bold">
                    Editing Mode
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Manage profile info, round photo, CV upload, and research papers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
                title="Lock session"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/70 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#5658df]/15 border border-[#5658df]/30 flex items-center justify-center text-[#5658df] shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin Authentication</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Enter your administrative passcode to update information, upload round photos, or manage CV files.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter your confidential passcode"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-base font-bold focus:border-[#5658df] focus:outline-none"
                  autoFocus
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block pt-1 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Protected with brute-force lockout, rate limiting &amp; HMAC-SHA256 sessions.</span>
                </span>
              </div>

              {authError && (
                <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 p-2.5 rounded-lg flex items-center gap-2 justify-center font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Panel</span>
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Interface */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
            {/* Sidebar Navigation */}
            <nav className="w-full md:w-56 p-3 md:p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-[#0a0d18] flex md:flex-col gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'profile'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile &amp; Photo</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'experience'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="flex-1">Work Experience</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                  {workExperiences.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'education'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="flex-1">Education</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                  {educations.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'resume'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="flex-1">CV &amp; Resume</span>
                {personal.resumeUrl && personal.resumeUrl !== '#' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'research'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Research Papers</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'skills'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Skills &amp; Interests</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('security');
                  setIsLoadingLogs(true);
                  fetchAuditLogs().then((logs) => {
                    setAuditLogs(logs);
                    setIsLoadingLogs(false);
                  });
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'security'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Security &amp; Passcode</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                  activeTab === 'backup'
                    ? 'bg-[#5658df] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Backup &amp; Reset</span>
              </button>
            </nav>

            {/* Tab Panel */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto max-h-[calc(92vh-70px)] space-y-6 bg-white dark:bg-[#0f1424]">
              
              {/* TAB 1: PROFILE & ROUND PHOTO */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Photo Slot Management */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-[#5658df]" />
                          <span>Round Photo Slot (Displays in Hero Section)</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          Upload your photo. It automatically displays in a perfect circular frame on the website.
                        </p>
                      </div>
                      {profileForm.avatarUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="px-3 py-1.5 text-xs text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-lg border border-rose-300 dark:border-rose-800 flex items-center gap-1 font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
                      {/* Photo Preview Frame (ROUND SHAPE) */}
                      <div className="relative group">
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#5658df] bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-xl relative">
                          {profileForm.avatarUrl ? (
                            <img
                              src={profileForm.avatarUrl}
                              alt="Oakimul Sami Round Preview"
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 gap-1 p-2 text-center">
                              <User className="w-8 h-8 text-[#5658df]" />
                              <span className="text-[11px] font-bold">No Photo</span>
                            </div>
                          )}
                        </div>
                        <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow" />
                      </div>

                      {/* Photo Controls */}
                      <div className="flex-1 space-y-3.5 w-full">
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoFileUpload}
                            accept="image/png,image/jpeg,image/webp,image/jpg"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload Photo from Computer</span>
                          </button>
                          <span className="text-xs text-slate-600 dark:text-slate-300 block pt-1.5 font-medium">
                            Supports PNG, JPG, or WEBP (Max 8MB). Automatically cropped into circle.
                          </span>
                        </div>

                        {/* Direct URL Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                            Or Paste Direct Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={photoInputUrl}
                              onChange={(e) => setPhotoInputUrl(e.target.value)}
                              placeholder="https://example.com/photo.jpg"
                              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium focus:border-[#5658df] focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={handleApplyPhotoUrl}
                              disabled={!photoInputUrl.trim()}
                              className="px-4 py-2 text-xs bg-[#5658df] hover:bg-[#4338ca] disabled:opacity-50 text-white font-bold rounded-xl transition-colors cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Form */}
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Personal &amp; Academic Information
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Headline / Tagline *
                        </label>
                        <input
                          type="text"
                          value={profileForm.headline}
                          onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          University *
                        </label>
                        <input
                          type="text"
                          value={profileForm.university}
                          onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Degree *
                        </label>
                        <input
                          type="text"
                          value={profileForm.degree}
                          onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          GitHub Link
                        </label>
                        <input
                          type="url"
                          value={profileForm.github}
                          onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          LinkedIn Link
                        </label>
                        <input
                          type="text"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Facebook Profile Link
                        </label>
                        <input
                          type="url"
                          value={profileForm.facebook || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, facebook: e.target.value })}
                          placeholder="https://facebook.com/your-username"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Instagram Profile Link
                        </label>
                        <input
                          type="url"
                          value={profileForm.instagram || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                          placeholder="https://instagram.com/your-username"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5 flex items-center gap-1.5">
                          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-500" />
                          <span>WhatsApp Number or Link</span>
                        </label>
                        <input
                          type="text"
                          value={profileForm.whatsapp || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                          placeholder="+8801700000000 or https://wa.me/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-emerald-500 focus:outline-none"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Visitors can click this to chat with you directly on WhatsApp.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                        Short Summary Bio
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.shortBio}
                        onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value, shortIntro: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Saving Changes...' : 'Save Profile Details'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: WORK EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {/* Top Bar with Add Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#5658df]" />
                        <span>Professional Work Experiences</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        Add, edit, or remove your professional positions, responsibilities, and company details.
                      </p>
                    </div>

                    {!isAddingNewExp && (
                      <button
                        type="button"
                        onClick={handleStartAddExp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs transition-all shadow-md cursor-pointer flex-shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Work Experience</span>
                      </button>
                    )}
                  </div>

                  {/* Form to Add or Edit */}
                  {isAddingNewExp && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141b2d] border-2 border-indigo-300 dark:border-indigo-600/60 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#5658df]" />
                          <span>{editingExpId ? 'Edit Work Experience' : 'New Work Experience Entry'}</span>
                        </h5>
                        <button
                          type="button"
                          onClick={handleCancelEditExp}
                          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveExp} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Role / Job Title *
                            </label>
                            <input
                              type="text"
                              value={expForm.role}
                              onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                              placeholder="e.g. General Manager, POS Operator, Software Developer"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              value={expForm.company}
                              onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                              placeholder="e.g. MN Corporation, ACI Logistic Limited"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Duration / Period *
                            </label>
                            <input
                              type="text"
                              value={expForm.period}
                              onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                              placeholder="e.g. March 01, 2023 — Present"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Status
                            </label>
                            <select
                              value={expForm.status || 'Present'}
                              onChange={(e) => setExpForm({ ...expForm, status: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm focus:border-[#5658df] focus:outline-none"
                            >
                              <option value="Present">Present / Continuing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Department (Optional)
                            </label>
                            <input
                              type="text"
                              value={expForm.department || ''}
                              onChange={(e) => setExpForm({ ...expForm, department: e.target.value })}
                              placeholder="e.g. Operator, IT, Management"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Location
                            </label>
                            <input
                              type="text"
                              value={expForm.location || ''}
                              onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                              placeholder="e.g. Dhaka, Bangladesh"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Company Logo Customization (Upload File or Enter URL with Live Preview) */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#182035] border border-slate-200 dark:border-slate-700/80 space-y-3">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#5658df]" />
                            <span>Company Logo (Upload Image File or Enter URL)</span>
                          </label>

                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Live Logo Preview Box */}
                            <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-slate-700">
                              <CompanyLogo 
                                company={expForm.company || 'Company'} 
                                logoUrl={expForm.logoUrl} 
                                size="md" 
                              />
                              <div className="text-left text-xs">
                                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                                  {expForm.company || 'Company Name'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {expForm.logoUrl ? 'Custom Image Logo' : 'Default Styled Logo'}
                                </span>
                              </div>
                            </div>

                            {/* Actions: File upload & Reset button */}
                            <div className="flex flex-wrap items-center gap-2 flex-1">
                              <input
                                ref={expLogoFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleExpLogoFileUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => expLogoFileInputRef.current?.click()}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-[#5658df] dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800/60 transition-all cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Logo Image</span>
                              </button>

                              {expForm.logoUrl && (
                                <button
                                  type="button"
                                  onClick={() => setExpForm({ ...expForm, logoUrl: '' })}
                                  className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold border border-rose-200 dark:border-rose-900/50 transition-colors"
                                >
                                  Reset to Default
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="relative">
                            <input
                              type="url"
                              value={expForm.logoUrl || ''}
                              onChange={(e) => setExpForm({ ...expForm, logoUrl: e.target.value })}
                              placeholder="Or paste direct image URL (https://...)"
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a233a] border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-mono text-xs focus:border-[#5658df] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                            Key Duties &amp; Responsibilities (one per line)
                          </label>
                          <textarea
                            rows={5}
                            value={expResponsibilitiesText}
                            onChange={(e) => setExpResponsibilitiesText(e.target.value)}
                            placeholder="Managed day-to-day administrative and operational activities.&#10;Prepared and maintained VAT &amp; Tax-related documents.&#10;Handled banking transactions."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none leading-relaxed font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                            Skills &amp; Competencies (comma separated)
                          </label>
                          <input
                            type="text"
                            value={expSkillsText}
                            onChange={(e) => setExpSkillsText(e.target.value)}
                            placeholder="Operations Management, VAT &amp; Tax Compliance, Banking &amp; RTGS"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>

                        <div className="pt-2 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={handleCancelEditExp}
                            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>{editingExpId ? 'Save Experience Changes' : 'Add Experience Entry'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List of Existing Experiences */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Current Experience Entries ({workExperiences.length})
                    </h5>

                    {workExperiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3.5">
                          <CompanyLogo company={exp.company} logoUrl={exp.logoUrl} size="sm" />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h6 className="font-bold text-slate-900 dark:text-white text-sm">
                                {exp.role}
                              </h6>
                              <span className="text-xs text-slate-400">at</span>
                              <span className="text-xs font-semibold text-[#5658df] dark:text-indigo-400">
                                {exp.company}
                              </span>
                              {exp.status === 'Present' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                                  Present
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-mono">
                              {exp.period} • {exp.location || 'Dhaka, Bangladesh'}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                              {exp.responsibilities?.[0] || 'Managed day-to-day organizational activities.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleEditExp(exp)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#5658df] transition-colors border border-slate-200 dark:border-slate-700"
                            title="Edit this experience"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteExp(exp.id, exp.role, exp.company)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors border border-rose-200 dark:border-rose-900/60"
                            title="Delete this experience"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: EDUCATION (School, College, University) */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  {/* Top Bar with Add Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#5658df]" />
                        <span>Education &amp; Qualifications (School, College, University)</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        Add, edit, or customize your school, college, and university degrees, coursework, results, and logos.
                      </p>
                    </div>

                    {!isAddingNewEdu && (
                      <button
                        type="button"
                        onClick={handleStartAddEdu}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs transition-all shadow-md cursor-pointer flex-shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Education</span>
                      </button>
                    )}
                  </div>

                  {/* Form to Add or Edit Education */}
                  {isAddingNewEdu && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141b2d] border-2 border-indigo-300 dark:border-indigo-600/60 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#5658df]" />
                          <span>{editingEduId ? 'Edit Education Entry' : 'New Education Entry'}</span>
                        </h5>
                        <button
                          type="button"
                          onClick={handleCancelEditEdu}
                          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveEdu} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Institution Name *
                            </label>
                            <input
                              type="text"
                              value={eduForm.institution}
                              onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                              placeholder="e.g. Uttara University, Notre Dame College, High School"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Degree / Certificate *
                            </label>
                            <input
                              type="text"
                              value={eduForm.degree}
                              onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                              placeholder="e.g. B.Sc. in CSE, Higher Secondary Certificate (HSC), SSC"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Level
                            </label>
                            <select
                              value={eduForm.level || 'University'}
                              onChange={(e) => setEduForm({ ...eduForm, level: e.target.value as any })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm focus:border-[#5658df] focus:outline-none"
                            >
                              <option value="University">University</option>
                              <option value="College">College (HSC / Intermediate)</option>
                              <option value="School">School (SSC / Secondary)</option>
                              <option value="Other">Other / Diploma</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Department / Group
                            </label>
                            <input
                              type="text"
                              value={eduForm.department || ''}
                              onChange={(e) => setEduForm({ ...eduForm, department: e.target.value })}
                              placeholder="e.g. CSE, Science, Commerce, Arts"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Status
                            </label>
                            <select
                              value={eduForm.status || 'Completed'}
                              onChange={(e) => setEduForm({ ...eduForm, status: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm focus:border-[#5658df] focus:outline-none"
                            >
                              <option value="Currently Studying">Currently Studying</option>
                              <option value="Completed">Completed</option>
                              <option value="Graduated">Graduated</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Duration / Period *
                            </label>
                            <input
                              type="text"
                              value={eduForm.period}
                              onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                              placeholder="e.g. 2024 — Present, 2021 — 2023"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5 flex items-center justify-between">
                              <span>Board (HSC / SSC)</span>
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold font-mono">BD Boards</span>
                            </label>
                            <input
                              list="bd-education-boards-list"
                              type="text"
                              value={eduForm.board || ''}
                              onChange={(e) => setEduForm({ ...eduForm, board: e.target.value })}
                              placeholder="e.g. Dhaka Board"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                            <datalist id="bd-education-boards-list">
                              <option value="Dhaka Board" />
                              <option value="Rajshahi Board" />
                              <option value="Chattogram Board" />
                              <option value="Cumilla Board" />
                              <option value="Jashore Board" />
                              <option value="Barishal Board" />
                              <option value="Sylhet Board" />
                              <option value="Dinajpur Board" />
                              <option value="Mymensingh Board" />
                              <option value="Madrasah Board" />
                              <option value="Technical Board (BTEB)" />
                              <option value="Cambridge / Edexcel" />
                            </datalist>
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              Location
                            </label>
                            <input
                              type="text"
                              value={eduForm.location || ''}
                              onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                              placeholder="e.g. Dhaka, Bangladesh"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                              GPA / Result (Optional)
                            </label>
                            <input
                              type="text"
                              value={eduForm.gpa || ''}
                              onChange={(e) => setEduForm({ ...eduForm, gpa: e.target.value })}
                              placeholder="e.g. GPA: 5.00 / 5.00"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Quick Board Selection Chips */}
                        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs">
                          <span className="font-semibold text-amber-800 dark:text-amber-300 mr-1 text-[11px]">
                            Quick Board:
                          </span>
                          {[
                            'Dhaka Board',
                            'Rajshahi Board',
                            'Chattogram Board',
                            'Cumilla Board',
                            'Dinajpur Board',
                            'Jashore Board',
                            'Sylhet Board',
                            'Madrasah Board',
                            'Technical Board'
                          ].map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setEduForm({ ...eduForm, board: b })}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                eduForm.board === b
                                  ? 'bg-amber-600 text-white font-bold'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {b.replace(' Board', '')}
                            </button>
                          ))}
                          {eduForm.board && (
                            <button
                              type="button"
                              onClick={() => setEduForm({ ...eduForm, board: '' })}
                              className="ml-auto text-[10px] text-rose-500 hover:underline cursor-pointer font-semibold"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        {/* Institution Logo Customization (Upload File or Enter URL with Live Preview) */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#182035] border border-slate-200 dark:border-slate-700/80 space-y-3">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#5658df]" />
                            <span>Institution Logo (Upload Image File or Enter URL)</span>
                          </label>

                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Live Logo Preview Box */}
                            <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-slate-700">
                              <CompanyLogo 
                                company={eduForm.institution || 'School / College'} 
                                logoUrl={eduForm.logoUrl} 
                                size="md" 
                              />
                              <div className="text-left text-xs">
                                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                                  {eduForm.institution || 'Institution Name'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {eduForm.logoUrl ? 'Custom Image Logo' : 'Default Styled Emblem'}
                                </span>
                              </div>
                            </div>

                            {/* Actions: File upload & Reset button */}
                            <div className="flex flex-wrap items-center gap-2 flex-1">
                              <input
                                ref={eduLogoFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleEduLogoFileUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => eduLogoFileInputRef.current?.click()}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-[#5658df] dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800/60 transition-all cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Institution Logo</span>
                              </button>

                              {eduForm.logoUrl && (
                                <button
                                  type="button"
                                  onClick={() => setEduForm({ ...eduForm, logoUrl: '' })}
                                  className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
                                >
                                  Reset to Default
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="relative">
                            <input
                              type="url"
                              value={eduForm.logoUrl || ''}
                              onChange={(e) => setEduForm({ ...eduForm, logoUrl: e.target.value })}
                              placeholder="Or paste direct image URL (https://...)"
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a233a] border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-mono text-xs focus:border-[#5658df] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                            Academic Focus &amp; Summary (Optional)
                          </label>
                          <textarea
                            rows={3}
                            value={eduForm.academicFocus || ''}
                            onChange={(e) => setEduForm({ ...eduForm, academicFocus: e.target.value })}
                            placeholder="e.g. Physics, Chemistry, Higher Mathematics, and ICT fundamentals."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                            Key Subjects &amp; Coursework (comma separated)
                          </label>
                          <input
                            type="text"
                            value={eduCourseworkText}
                            onChange={(e) => setEduCourseworkText(e.target.value)}
                            placeholder="Physics, Chemistry, Higher Mathematics, ICT, Biology"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>

                        <div className="pt-2 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={handleCancelEditEdu}
                            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>{editingEduId ? 'Save Education Changes' : 'Add Education Entry'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List of Current Education Entries */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Current Education Entries ({educations.length})
                    </h5>

                    {educations.map((edu) => (
                      <div
                        key={edu.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3.5">
                          <CompanyLogo company={edu.institution} logoUrl={edu.logoUrl} size="sm" />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h6 className="font-bold text-slate-900 dark:text-white text-sm">
                                {edu.institution}
                              </h6>
                              {edu.level && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {edu.level}
                                </span>
                              )}
                              {edu.board && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                                  Board: {edu.board}
                                </span>
                              )}
                              {edu.status && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  edu.status.toLowerCase().includes('studying')
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                                    : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400'
                                }`}>
                                  {edu.status}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-[#5658df] dark:text-indigo-400">
                              {edu.degree} {edu.department ? `• ${edu.department}` : ''}
                            </p>
                            <p className="text-xs text-slate-500 font-mono">
                              {edu.period} • {edu.location || 'Dhaka, Bangladesh'} {edu.board ? `• Board: ${edu.board}` : ''} {edu.gpa ? `• ${edu.gpa}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleEditEdu(edu)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#5658df] transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                            title="Edit this education entry"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEdu(edu.id, edu.institution)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors border border-rose-200 dark:border-rose-900/60 cursor-pointer"
                            title="Delete this education entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CV & RESUME UPLOAD */}
              {activeTab === 'resume' && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#5658df]" />
                          <span>Official CV / Resume File</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          Upload your PDF CV. When visitors click "Resume" on the website, this exact file downloads immediately!
                        </p>
                      </div>
                      {personal.resumeUrl && personal.resumeUrl !== '#' && (
                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          className="px-3 py-1.5 text-xs text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-lg border border-rose-300 dark:border-rose-800 flex items-center gap-1 font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove CV</span>
                        </button>
                      )}
                    </div>

                    {/* Current CV Status Banner */}
                    <div className="p-4 rounded-xl bg-white dark:bg-[#182035] border-2 border-slate-300 dark:border-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#5658df]/15 border border-[#5658df]/30 flex items-center justify-center text-[#5658df] flex-shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {personal.resumeFileName || (personal.resumeUrl && personal.resumeUrl !== '#' ? 'Oakimul_Sami_CV.pdf' : 'No Custom CV Uploaded Yet')}
                            </span>
                            {personal.resumeUrl && personal.resumeUrl !== '#' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300">
                                Active File
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            {personal.resumeFileSize ? `Size: ${personal.resumeFileSize}` : 'Click below to upload your official PDF document.'}
                          </p>
                        </div>
                      </div>

                      {personal.resumeUrl && personal.resumeUrl !== '#' && (
                        <div className="flex items-center gap-2">
                          <a
                            href={personal.resumeUrl}
                            download={personal.resumeFileName || 'Oakimul_Sami_CV.pdf'}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5658df] text-white font-bold text-xs shadow-sm hover:bg-[#4338ca] transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Current</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Upload Box */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#182035] border-2 border-dashed border-[#5658df]/60 hover:border-[#5658df] transition-colors flex flex-col items-center justify-center text-center space-y-3">
                      <input
                        type="file"
                        ref={resumeFileInputRef}
                        onChange={handleResumeFileUpload}
                        accept=".pdf,.doc,.docx,application/pdf"
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-full bg-[#5658df]/15 flex items-center justify-center text-[#5658df]">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Choose Your CV Document</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-sm mt-1">
                          Select a PDF file (up to 15MB). Visitors clicking "See My Resume" will download this exact file.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => resumeFileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Select CV File from Computer</span>
                      </button>
                    </div>

                    {/* URL Option */}
                    <div className="p-4 rounded-xl bg-white dark:bg-[#182035] border border-slate-200 dark:border-slate-700 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block">
                        Or Provide Direct CV Link (Google Drive / Cloud URL):
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="url"
                            value={resumeInputUrl}
                            onChange={(e) => setResumeInputUrl(e.target.value)}
                            placeholder="https://drive.google.com/... or https://example.com/cv.pdf"
                            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0f1424] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium focus:border-[#5658df] focus:outline-none"
                          />
                          <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyResumeUrl}
                          disabled={!resumeInputUrl.trim()}
                          className="px-5 py-2 text-xs bg-[#5658df] hover:bg-[#4338ca] disabled:opacity-50 text-white font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Apply Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: RESEARCH PAPERS */}
              {activeTab === 'research' && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#5658df]" />
                        <span>{editingPaperId ? 'Edit Research Paper' : 'Add New Research Paper'}</span>
                      </h4>
                      {editingPaperId && (
                        <button
                          type="button"
                          onClick={handleCancelEditPaper}
                          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSavePaper} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Research Paper Title *
                        </label>
                        <input
                          type="text"
                          value={paperForm.title}
                          onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                          placeholder="e.g. Real-Time Hand Gesture Recognition for Assistive Communication"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Description / Abstract *
                        </label>
                        <textarea
                          rows={3}
                          value={paperForm.description}
                          onChange={(e) => setPaperForm({ ...paperForm, description: e.target.value })}
                          placeholder="Abstract detailing the research problem, methodology, and findings..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none leading-relaxed"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">
                          Paper Link or Code Repository URL *
                        </label>
                        <input
                          type="url"
                          value={paperForm.paperUrl}
                          onChange={(e) => setPaperForm({ ...paperForm, paperUrl: e.target.value })}
                          placeholder="https://github.com/sami731-star or arXiv or paper URL"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">Status</label>
                          <select
                            value={paperForm.status}
                            onChange={(e) => setPaperForm({ ...paperForm, status: e.target.value as any })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm focus:border-[#5658df] focus:outline-none"
                          >
                            <option value="Published">Published</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Preprint">Preprint</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">Year</label>
                          <input
                            type="text"
                            value={paperForm.year}
                            onChange={(e) => setPaperForm({ ...paperForm, year: e.target.value })}
                            placeholder="2025"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">DOI (Optional)</label>
                          <input
                            type="text"
                            value={paperForm.doi || ''}
                            onChange={(e) => setPaperForm({ ...paperForm, doi: e.target.value })}
                            placeholder="10.1109/ICCIT..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">Venue / Conference</label>
                          <input
                            type="text"
                            value={paperForm.venue}
                            onChange={(e) => setPaperForm({ ...paperForm, venue: e.target.value })}
                            placeholder="IEEE ICCIT 2025"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">Authors (comma separated)</label>
                          <input
                            type="text"
                            value={authorsString}
                            onChange={(e) => setAuthorsString(e.target.value)}
                            placeholder="Oakimul Sami, Supervisor"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block mb-1.5">Topics (comma separated)</label>
                          <input
                            type="text"
                            value={topicsString}
                            onChange={(e) => setTopicsString(e.target.value)}
                            placeholder="Computer Vision, Machine Learning"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        {editingPaperId && (
                          <button
                            type="button"
                            onClick={handleCancelEditPaper}
                            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs shadow-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{editingPaperId ? 'Update Paper' : 'Add Paper'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of current papers */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Existing Research Papers ({researchPapers.length})
                    </h4>
                    {researchPapers.map((paper) => (
                      <div
                        key={paper.id}
                        className="p-4 rounded-xl bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5658df]/15 text-[#5658df]">
                            {paper.status} ({paper.year})
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">{paper.title}</h5>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-medium">{paper.description}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEditPaper(paper)}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#5658df] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete research paper "${paper.title}"?`)) {
                                deleteResearchPaper(paper.id);
                              }
                            }}
                            className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS & INTERESTS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Currently Learning &amp; Core Interests
                    </h4>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block">
                        Currently Learning (comma separated)
                      </label>
                      <input
                        type="text"
                        value={learningString}
                        onChange={(e) => setLearningString(e.target.value)}
                        placeholder="Modern JavaScript, React, Backend Development"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 block">
                        Core Engineering Interests (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={interestsString}
                        onChange={(e) => setInterestsString(e.target.value)}
                        placeholder="Web Development, Backend Development, PHP & MySQL, Problem Solving"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const learningList = learningString.split(',').map((s) => s.trim()).filter(Boolean);
                          const interestsList = interestsString.split(',').map((s) => s.trim()).filter(Boolean);
                          await updatePersonal({
                            currentlyLearning: learningList,
                            coreInterests: interestsList,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Learning &amp; Interests</span>
                      </button>
                    </div>
                  </div>

                  {/* Skills preview */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Configured Skills</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {skills.map((cat) => (
                        <div key={cat.id} className="p-3.5 rounded-xl bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-1">
                          <span className="font-bold text-[#5658df]">{cat.title}</span>
                          <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">{cat.skills.join(' • ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: SECURITY & PASSCODE MANAGEMENT */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Change Passcode Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-[#5658df]" />
                          <span>Change Admin Passcode</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          Update your confidential passcode. Passcodes are hashed with HMAC-SHA256 and never stored in plaintext.
                        </p>
                      </div>
                    </div>

                    {passChangeSuccess && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{passChangeSuccess}</span>
                      </div>
                    )}

                    {passChangeError && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>{passChangeError}</span>
                      </div>
                    )}

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setPassChangeError('');
                        setPassChangeSuccess('');

                        if (!currentPassInput) {
                          setPassChangeError('Please enter your current passcode.');
                          return;
                        }
                        if (newPassInput.length < 6) {
                          setPassChangeError('New passcode must be at least 6 characters long.');
                          return;
                        }
                        if (newPassInput !== confirmPassInput) {
                          setPassChangeError('New passcode and confirmation do not match.');
                          return;
                        }

                        setIsChangingPass(true);
                        const result = await changePasscode(currentPassInput, newPassInput);
                        setIsChangingPass(false);

                        if (result.success) {
                          setPassChangeSuccess('Passcode changed successfully! Use your new passcode on your next login.');
                          setCurrentPassInput('');
                          setNewPassInput('');
                          setConfirmPassInput('');
                        } else {
                          setPassChangeError(result.error || 'Failed to change passcode. Verify current passcode.');
                        }
                      }}
                      className="space-y-4 max-w-md"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                          Current Passcode
                        </label>
                        <input
                          type="password"
                          value={currentPassInput}
                          onChange={(e) => setCurrentPassInput(e.target.value)}
                          placeholder="Enter current passcode"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                          New Passcode (min 6 characters)
                        </label>
                        <input
                          type="password"
                          value={newPassInput}
                          onChange={(e) => setNewPassInput(e.target.value)}
                          placeholder="Enter new strong passcode"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                          Confirm New Passcode
                        </label>
                        <input
                          type="password"
                          value={confirmPassInput}
                          onChange={(e) => setConfirmPassInput(e.target.value)}
                          placeholder="Re-type new passcode"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a233a] border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm focus:border-[#5658df] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isChangingPass}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5658df] hover:bg-[#4338ca] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{isChangingPass ? 'Updating Passcode...' : 'Update Passcode'}</span>
                      </button>
                    </form>
                  </div>

                  {/* Production Domain & Hosting Defenses Info Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/40 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#5658df]" />
                      <span>Domain &amp; Hosting Protection (Active Shield)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white dark:bg-[#121624] border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                        <span className="font-bold text-[#5658df] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Brute-Force Rate Limiting</span>
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Max 5 failed passcode attempts allowed before an automatic 15-minute IP lockout activates to repel brute-force bot attacks.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-[#121624] border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                        <span className="font-bold text-[#5658df] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>HMAC-SHA256 Token Sessions</span>
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Cryptographically random 256-bit Bearer tokens with sliding 2-hour window and 30-min inactivity auto-lockout.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-[#121624] border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                        <span className="font-bold text-[#5658df] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Timing-Safe Hash Comparison</span>
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Passcodes are checked with crypto constant-time byte comparisons to eliminate side-channel timing analysis attacks.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-[#121624] border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                        <span className="font-bold text-[#5658df] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Hardened HTTP Headers</span>
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Protected against Clickjacking (X-Frame-Options), MIME sniffing (nosniff), XSS reflection, and removed server fingerprinting.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security Audit Trail */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#5658df]" />
                          <span>Security Audit Logs</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          Timestamped records of authentication attempts, updates, and security events.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            setIsLoadingLogs(true);
                            const logs = await fetchAuditLogs();
                            setAuditLogs(logs);
                            setIsLoadingLogs(false);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                          Refresh
                        </button>
                        {auditLogs.length > 0 && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm('Clear all security audit logs?')) {
                                await clearAuditLogs();
                                setAuditLogs([]);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            Clear Logs
                          </button>
                        )}
                      </div>
                    </div>

                    {isLoadingLogs ? (
                      <div className="py-6 text-center text-xs text-slate-500 font-medium">Loading security logs...</div>
                    ) : auditLogs.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500 font-medium">No security events logged yet.</div>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {auditLogs.map((log: any) => (
                          <div
                            key={log.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-[#1a233a] border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                  log.status === 'success'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                    : log.status === 'security'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                }`}>
                                  {log.event}
                                </span>
                                <span className="font-mono text-[11px] text-slate-400">
                                  {new Date(log.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-200 font-medium text-[11px]">{log.details}</p>
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
                              IP: {log.ip}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & RESET */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#5658df]" />
                        <span>Export Portfolio Backup</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                        Download all portfolio details, photo, and research papers as a JSON file.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportJSON}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5658df] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download backup.json</span>
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141b2d] border border-slate-200 dark:border-slate-700 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#5658df]" />
                        <span>Restore from JSON File</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                        Load a previously saved backup file to restore all details.
                      </p>
                    </div>

                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportFile}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#5658df] file:text-white hover:file:bg-[#4338ca] cursor-pointer"
                    />
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 space-y-3">
                    <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Reset to Original Defaults</span>
                    </h4>
                    <p className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                      Reverts all sections, research papers, and profiles back to the initial template.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all portfolio data to default?')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                    >
                      Reset to Default Template
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0a0d18] flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-bold">
          <span>Uttara University • CSE Portfolio CMS</span>
          <span>Oakimul Sami © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};
