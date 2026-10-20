import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Support large payloads for photo uploads (base64 image data)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// ==================== PRODUCTION SECURITY HEADERS (DOMAIN & HOSTING DEFENSE) ====================
app.use((req, res, next) => {
  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Clickjacking defense (permit only same origin iframe / ais preview)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // XSS protection legacy filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Disallow DNS prefetch scanning
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  // Prevent disclosure of server software
  res.removeHeader('X-Powered-By');
  next();
});

// Persistent data file path
const DATA_DIR = path.resolve(__dirname, 'data-storage');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ==================== SECURITY & AUTHENTICATION INFRASTRUCTURE ====================

const AUTH_SECRET = process.env.AUTH_SECRET || 'oakimul_sami_portfolio_super_secure_auth_salt_2025_!';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours session expiry

interface SessionInfo {
  token: string;
  createdAt: number;
  expiresAt: number;
  ip: string;
  userAgent: string;
}

interface RateLimitInfo {
  count: number;
  lockedUntil: number;
  lastAttempt: number;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: string;
  status: 'success' | 'failure' | 'warning' | 'security';
  ip: string;
  userAgent: string;
  details: string;
}

// In-memory active bearer sessions & rate limiter
const activeSessions = new Map<string, SessionInfo>();
const loginAttempts = new Map<string, RateLimitInfo>();

// Passcode HMAC-SHA256 hasher
const hashPasscode = (pass: string): string => {
  return crypto.createHmac('sha256', AUTH_SECRET).update(pass.trim()).digest('hex');
};

// Timing-safe comparison to prevent timing attacks
const timingSafePasscodeCheck = (inputPass: string, storedPass: string, storedHash?: string): boolean => {
  if (!inputPass || typeof inputPass !== 'string') return false;

  if (storedHash) {
    const inputHash = hashPasscode(inputPass);
    if (inputHash.length !== storedHash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(storedHash));
  }

  if (storedPass) {
    const paddedInput = inputPass.padEnd(64, ' ').substring(0, 64);
    const paddedStored = storedPass.padEnd(64, ' ').substring(0, 64);
    const isBuffersEqual = crypto.timingSafeEqual(Buffer.from(paddedInput), Buffer.from(paddedStored));
    return isBuffersEqual && inputPass === storedPass;
  }

  return false;
};

// Security Audit Logger
const addAuditLog = (
  event: string,
  status: 'success' | 'failure' | 'warning' | 'security',
  req: express.Request,
  details: string
) => {
  try {
    const current = loadData();
    if (!Array.isArray(current.securityAuditLogs)) {
      current.securityAuditLogs = [];
    }
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown client';

    const entry: AuditLogEntry = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      event,
      status,
      ip: String(ip),
      userAgent: String(userAgent).substring(0, 100),
      details,
    };

    // Prepend and cap at latest 100 entries
    current.securityAuditLogs = [entry, ...current.securityAuditLogs.slice(0, 99)];
    saveData(current);
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
};

// Middleware: Require Admin Authentication via Bearer token
const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Access denied: Admin authentication session required.',
      code: 'AUTH_REQUIRED',
    });
  }

  const token = authHeader.substring(7).trim();
  const session = activeSessions.get(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired admin session. Please log in again.',
      code: 'SESSION_EXPIRED',
    });
  }

  const now = Date.now();
  if (now > session.expiresAt) {
    activeSessions.delete(token);
    return res.status(401).json({
      success: false,
      error: 'Admin session timed out due to inactivity. Please log in again.',
      code: 'SESSION_TIMED_OUT',
    });
  }

  // Extend sliding session expiration
  session.expiresAt = now + SESSION_DURATION_MS;
  (req as any).adminSession = session;
  next();
};

// Default initial data template
const getDefaultPortfolioData = () => {
  return {
    adminPasscode: "sami2026",
    personal: {
      name: "Oakimul Sami",
      initials: "OS",
      headline: "CSE Student • Aspiring Software Developer • Problem Solver",
      shortIntro:
        "I'm a Computer Science & Engineering student passionate about building useful digital products, learning modern technologies, and turning ideas into real-world applications.",
      shortBio:
        "I'm a Computer Science & Engineering student passionate about building useful digital products, learning modern technologies, and turning ideas into real-world applications.",
      extendedBio: [
        "I am currently pursuing my Bachelor of Science in Computer Science & Engineering at Uttara University in Dhaka, Bangladesh.",
        "My focus centers on practical software engineering: building responsive web applications, designing reliable database-backed backend services with PHP and MySQL, and mastering modern JavaScript and React.",
        "I believe in active learning through project building—breaking down complex requirements into clean modular architecture, tackling algorithmic challenges, and exploring practical AI integrations to solve daily problems."
      ],
      location: "Dhaka, Bangladesh",
      university: "Uttara University",
      department: "Computer Science & Engineering",
      degree: "B.Sc. in Computer Science & Engineering",
      email: "oakimulsami1234@gmail.com",
      github: "https://github.com/sami731-star",
      linkedin: "https://linkedin.com/in/oakimul-sami",
      facebook: "https://facebook.com/oakimul.sami",
      instagram: "https://instagram.com/oakimul.sami",
      whatsapp: "+8801700000000",
      resumeUrl: "#",
      avatarUrl: "",
      avatarCaption: "Oakimul Sami — Uttara University CSE",
      currentlyLearning: [
        "Modern JavaScript",
        "React",
        "Backend Development",
        "AI Integration",
        "Software Engineering"
      ],
      coreInterests: [
        "Web Development",
        "Backend Development",
        "PHP & MySQL",
        "JavaScript",
        "React",
        "Problem Solving",
        "Database Systems",
        "AI-powered applications",
        "Building practical software"
      ]
    },
    researchPapers: [
      {
        id: "rl-bowling-iccit-2025",
        title: "Reinforcement Learning for Optimizing Bowling Strategies in One Day Internationals",
        description: "Published research paper in IEEE Xplore as part of the 28th International Conference on Computer and Information Technology (ICCIT 2025). Focused on Reinforcement Learning, Deep Q-Network (DQN), and Cricket Analytics for optimizing bowling strategies in One Day Internationals. Contributed to research methodology, literature review, data analysis, and research documentation.",
        paperUrl: "https://doi.org/10.1109/ICCIT68739.2025.11490554",
        authors: ["Oakimul Sami"],
        venue: "IEEE Conference Publication | 28th International Conference on Computer and Information Technology (ICCIT 2025)",
        status: "Published",
        year: "2025",
        topics: ["Reinforcement Learning", "Deep Q-Network (DQN)", "Cricket Analytics", "Sports Analytics", "Artificial Intelligence"],
        doi: "10.1109/ICCIT68739.2025.11490554",
        citationBibtex: `@inproceedings{sami2025bowling,\n  title={Reinforcement Learning for Optimizing Bowling Strategies in One Day Internationals},\n  author={Sami, Oakimul and others},\n  booktitle={2025 28th International Conference on Computer and Information Technology (ICCIT)},\n  year={2025},\n  publisher={IEEE},\n  doi={10.1109/ICCIT68739.2025.11490554}\n}`,
        featured: true
      }
    ],
    workExperiences: [
      {
        id: "general-manager-mn-corp",
        role: "General Manager",
        company: "MN Corporation",
        period: "March 01, 2023 — Present (Continuing)",
        status: "Present",
        location: "Dhaka, Bangladesh",
        logoUrl: "",
        responsibilities: [
          "Managed day-to-day administrative and operational activities of the organization.",
          "Prepared and maintained VAT & Tax-related documents and records.",
          "Handled banking transactions and banking documentation.",
          "Processed RTGS transactions and coordinated with banks when required.",
          "Prepared and managed sales contracts, invoices, bills, and related documents.",
          "Maintained proper records of sales, purchases, payments, and financial documents.",
          "Coordinated with clients, suppliers, banks, and internal departments.",
          "Assisted in financial and administrative reporting and documentation.",
          "Ensured accuracy and timely completion of official documents and transactions.",
          "Supported overall office management and operational activities."
        ],
        skills: ["Operations Management", "VAT & Tax Compliance", "Banking & RTGS", "Contract Management", "Financial Documentation", "Team Coordination"]
      },
      {
        id: "pos-operator-aci",
        role: "POS Operator",
        company: "ACI Logistic Limited",
        department: "Operator",
        period: "October 01, 2024 — December 20, 2024",
        status: "Completed",
        location: "Dhaka, Bangladesh",
        logoUrl: "",
        responsibilities: [
          "Operated POS (Point of Sale) systems for daily sales transactions.",
          "Processed cash, card, mobile banking, and other customer payments.",
          "Generated and issued customer invoices, receipts, and bills.",
          "Handled product scanning, pricing, discounts, and promotional offers.",
          "Coordinated with inventory and store staff regarding product availability and stock updates."
        ],
        skills: ["POS Systems", "Sales Operations", "Payment Processing", "Inventory Coordination", "Customer Service"]
      }
    ],
    educations: [
      {
        id: "uttara-university-cse",
        institution: "Uttara University",
        degree: "B.Sc. in Computer Science & Engineering",
        department: "Department of Computer Science & Engineering",
        location: "Dhaka, Bangladesh",
        status: "Currently Studying",
        period: "2024 — Present",
        expectedGraduation: "Expected: 2028",
        academicFocus: "Software engineering, database architecture, algorithms, and computing fundamentals.",
        level: "University",
        logoUrl: "",
        coursework: [
          "Structured Programming Language (C)",
          "Object-Oriented Programming (C++)",
          "Data Structures & Algorithms",
          "Discrete Mathematics",
          "Database Management Systems",
          "Software Engineering Concepts",
          "Digital Logic Design"
        ]
      },
      {
        id: "college-hsc",
        institution: "Higher Secondary College",
        degree: "Higher Secondary Certificate (HSC)",
        department: "Science Group",
        location: "Dhaka, Bangladesh",
        status: "Completed",
        period: "2021 — 2023",
        academicFocus: "Physics, Chemistry, Higher Mathematics, and Information & Communication Technology (ICT).",
        level: "College",
        board: "Dhaka Board",
        logoUrl: "",
        gpa: "GPA: 5.00 / 5.00",
        coursework: [
          "Physics",
          "Chemistry",
          "Higher Mathematics",
          "ICT (Information & Communication Technology)",
          "Biology"
        ]
      },
      {
        id: "school-ssc",
        institution: "High School",
        degree: "Secondary School Certificate (SSC)",
        department: "Science Group",
        location: "Dhaka, Bangladesh",
        status: "Completed",
        period: "2019 — 2021",
        academicFocus: "General Science, Mathematics, English, and Foundations of Physical Sciences.",
        level: "School",
        board: "Dhaka Board",
        logoUrl: "",
        gpa: "GPA: 5.00 / 5.00",
        coursework: [
          "General Science",
          "Higher Mathematics",
          "Physics & Chemistry",
          "Information Technology"
        ]
      }
    ],
    updatedAt: new Date().toISOString()
  };
};

// Helper: load data from file with fallback
const loadData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      let needsSave = false;
      if (!Array.isArray(parsed.researchPapers) || parsed.researchPapers.length === 0 || parsed.researchPapers.some((p: any) => p.id === 'sign-language-cv-2025' || p.id === 'olfactory-recommender-2025')) {
        parsed.researchPapers = getDefaultPortfolioData().researchPapers;
        needsSave = true;
      }
      if (!Array.isArray(parsed.educations)) {
        parsed.educations = getDefaultPortfolioData().educations;
        needsSave = true;
      } else {
        parsed.educations.forEach((edu: any) => {
          if (!edu.board && (edu.id === 'college-hsc' || edu.id === 'school-ssc' || edu.level === 'College' || edu.level === 'School')) {
            edu.board = 'Dhaka Board';
            needsSave = true;
          }
        });
      }
      if (needsSave) {
        saveData(parsed);
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading data file, using default template:', err);
  }
  const defaultData = getDefaultPortfolioData();
  saveData(defaultData);
  return defaultData;
};

// Helper: save data to file
const saveData = (data: any) => {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving data to file:', err);
    return false;
  }
};

// ==================== REST API ENDPOINTS ====================

// GET /api/portfolio - Retrieve public portfolio content (strips sensitive security fields)
app.get('/api/portfolio', (_req, res) => {
  const data = loadData();
  // Strip all sensitive credentials and audit records from public response
  const { adminPasscode, adminPasscodeHash, securityAuditLogs, ...publicData } = data;
  res.json({
    success: true,
    data: publicData,
    hasCustomAvatar: Boolean(publicData.personal?.avatarUrl),
  });
});

// PUT /api/portfolio - Update full portfolio or sections (Protected by requireAdminAuth)
app.put('/api/portfolio', requireAdminAuth, (req, res) => {
  try {
    const updates = req.body;
    const current = loadData();
    const updated = {
      ...current,
      ...updates,
      personal: {
        ...current.personal,
        ...(updates.personal || {}),
      },
      researchPapers: Array.isArray(updates.researchPapers) ? updates.researchPapers : current.researchPapers,
      workExperiences: Array.isArray(updates.workExperiences) ? updates.workExperiences : current.workExperiences,
      educations: Array.isArray(updates.educations) ? updates.educations : current.educations,
      projects: Array.isArray(updates.projects) ? updates.projects : current.projects,
      skills: Array.isArray(updates.skills) ? updates.skills : current.skills,
    };

    const saved = saveData(updated);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Failed to write data to disk' });
    }

    addAuditLog('PORTFOLIO_UPDATED', 'success', req, 'Portfolio content saved successfully.');

    const { adminPasscode, adminPasscodeHash, securityAuditLogs, ...publicData } = updated;
    res.json({ success: true, data: publicData });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// POST /api/portfolio/photo - Update personal photo slot (Protected)
app.post('/api/portfolio/photo', requireAdminAuth, (req, res) => {
  try {
    const { photoUrl } = req.body;
    if (typeof photoUrl !== 'string') {
      return res.status(400).json({ success: false, error: 'photoUrl must be a string' });
    }

    const current = loadData();
    current.personal.avatarUrl = photoUrl;
    saveData(current);

    addAuditLog('PHOTO_UPDATED', 'success', req, photoUrl ? 'Custom photo uploaded' : 'Photo removed');

    res.json({ 
      success: true, 
      avatarUrl: current.personal.avatarUrl,
      message: photoUrl ? 'Profile photo updated successfully' : 'Profile photo cleared',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// POST /api/portfolio/resume - Upload/Update personal CV or resume file (Protected)
app.post('/api/portfolio/resume', requireAdminAuth, (req, res) => {
  try {
    const { resumeUrl, resumeFileName, resumeFileSize, resumeFileType } = req.body;
    if (typeof resumeUrl !== 'string') {
      return res.status(400).json({ success: false, error: 'resumeUrl must be a string' });
    }

    const current = loadData();
    current.personal.resumeUrl = resumeUrl;
    current.personal.resumeFileName = resumeFileName || (resumeUrl && resumeUrl !== '#' ? 'Oakimul_Sami_CV.pdf' : '');
    current.personal.resumeFileSize = resumeFileSize || '';
    current.personal.resumeFileType = resumeFileType || 'application/pdf';
    current.personal.resumeUpdatedAt = new Date().toISOString();
    saveData(current);

    addAuditLog('RESUME_UPDATED', 'success', req, resumeUrl && resumeUrl !== '#' ? `CV uploaded (${current.personal.resumeFileName})` : 'CV reset');

    res.json({
      success: true,
      resumeUrl: current.personal.resumeUrl,
      resumeFileName: current.personal.resumeFileName,
      resumeFileSize: current.personal.resumeFileSize,
      message: resumeUrl && resumeUrl !== '#' ? 'CV / Resume file saved successfully' : 'CV / Resume reset to default',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/portfolio/resume-file - Serve uploaded CV file directly with inline headers so browsers display it
app.get('/api/portfolio/resume-file', (_req, res) => {
  try {
    const current = loadData();
    const resumeUrl = current.personal?.resumeUrl;
    if (!resumeUrl || resumeUrl === '#') {
      return res.status(404).send('No custom CV uploaded yet.');
    }

    if (resumeUrl.startsWith('data:')) {
      const matches = resumeUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        const contentType = matches[1] || 'application/pdf';
        const buffer = Buffer.from(matches[2], 'base64');
        const fileName = current.personal?.resumeFileName || 'Oakimul_Sami_CV.pdf';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.setHeader('Content-Length', buffer.length);
        return res.send(buffer);
      }
    }

    // If it's a Google Drive link, convert to preview mode for embedding
    if (resumeUrl.includes('drive.google.com')) {
      const previewUrl = resumeUrl.replace(/\/view(\?.*)?$/, '/preview').replace(/\/edit(\?.*)?$/, '/preview');
      return res.redirect(previewUrl);
    }

    return res.redirect(resumeUrl);
  } catch (err) {
    res.status(500).send('Error serving resume: ' + String(err));
  }
});

// Research Papers CRUD (Protected write operations)
app.get('/api/publications', (_req, res) => {
  const current = loadData();
  res.json({ success: true, publications: current.researchPapers || [] });
});

app.post('/api/publications', requireAdminAuth, (req, res) => {
  try {
    const newPaper = req.body;
    if (!newPaper.title || !newPaper.description || !newPaper.paperUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title, description, and link to paper are required fields.',
      });
    }

    const current = loadData();
    if (!newPaper.id) {
      newPaper.id = 'paper-' + Date.now();
    }
    current.researchPapers = [newPaper, ...(current.researchPapers || [])];
    saveData(current);

    addAuditLog('PUBLICATION_ADDED', 'success', req, `Added paper: ${newPaper.title.substring(0, 40)}...`);

    res.json({ success: true, paper: newPaper, publications: current.researchPapers });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

app.put('/api/publications/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const paperUpdates = req.body;
    const current = loadData();

    let found = false;
    current.researchPapers = (current.researchPapers || []).map((paper: any) => {
      if (paper.id === id) {
        found = true;
        return { ...paper, ...paperUpdates, id };
      }
      return paper;
    });

    if (!found) {
      return res.status(404).json({ success: false, error: 'Research paper not found' });
    }

    saveData(current);
    addAuditLog('PUBLICATION_UPDATED', 'success', req, `Updated paper ID: ${id}`);
    res.json({ success: true, publications: current.researchPapers });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

app.delete('/api/publications/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const current = loadData();
    current.researchPapers = (current.researchPapers || []).filter((p: any) => p.id !== id);
    saveData(current);
    addAuditLog('PUBLICATION_DELETED', 'warning', req, `Deleted paper ID: ${id}`);
    res.json({ success: true, publications: current.researchPapers });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// ==================== ADMIN AUTHENTICATION & SECURITY ENDPOINTS ====================

// POST /api/admin/login - Authenticate with rate limiting & brute-force protection
app.post('/api/admin/login', (req, res) => {
  const { passcode } = req.body;
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  // 1. Check if IP is currently locked out
  const attemptInfo = loginAttempts.get(String(ip));
  if (attemptInfo && attemptInfo.lockedUntil > now) {
    const remainingSeconds = Math.ceil((attemptInfo.lockedUntil - now) / 1000);
    addAuditLog('LOGIN_BLOCKED', 'security', req, `Blocked attempt during lockout. ${remainingSeconds}s remaining.`);
    return res.status(429).json({
      success: false,
      authenticated: false,
      lockedOut: true,
      remainingSeconds,
      error: `Security Lockout Active: Too many failed passcode attempts. Please wait ${Math.ceil(remainingSeconds / 60)} minute(s) before trying again.`,
    });
  }

  // 2. Validate passcode
  const current = loadData();
  const storedPass = current.adminPasscode || 'sami2026';
  const storedHash = current.adminPasscodeHash;

  const isValid = timingSafePasscodeCheck(passcode, storedPass, storedHash);

  if (isValid) {
    // Reset rate limiter on successful authentication
    loginAttempts.delete(String(ip));

    // Auto-migrate plaintext passcode to HMAC-SHA256 hash if not already hashed
    if (!current.adminPasscodeHash) {
      current.adminPasscodeHash = hashPasscode(passcode);
      delete current.adminPasscode;
      saveData(current);
    }

    // Generate secure cryptographically random session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = now + SESSION_DURATION_MS;
    activeSessions.set(token, {
      token,
      createdAt: now,
      expiresAt,
      ip: String(ip),
      userAgent: String(req.headers['user-agent'] || 'Unknown'),
    });

    addAuditLog('LOGIN_SUCCESS', 'success', req, 'Admin authenticated successfully.');

    const isDefault = passcode === 'sami2026';

    return res.json({
      success: true,
      authenticated: true,
      token,
      expiresAt,
      sessionDurationMinutes: Math.round(SESSION_DURATION_MS / (60 * 1000)),
      isDefaultPasscode: isDefault,
      message: 'Authentication successful',
    });
  } else {
    // Record failed attempt
    const currentAttempts = (attemptInfo?.count || 0) + 1;
    if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION_MS;
      loginAttempts.set(String(ip), { count: currentAttempts, lockedUntil, lastAttempt: now });
      addAuditLog('LOGIN_LOCKOUT', 'security', req, `Account locked out for 15 minutes after ${currentAttempts} failed attempts.`);
      return res.status(429).json({
        success: false,
        authenticated: false,
        lockedOut: true,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
        error: `Security Lockout Triggered: 5 failed attempts detected. Access blocked for 15 minutes to protect your portfolio.`,
      });
    } else {
      loginAttempts.set(String(ip), { count: currentAttempts, lockedUntil: 0, lastAttempt: now });
      const attemptsLeft = MAX_FAILED_ATTEMPTS - currentAttempts;
      addAuditLog('LOGIN_FAILED', 'failure', req, `Failed passcode attempt (${currentAttempts}/${MAX_FAILED_ATTEMPTS}).`);
      return res.status(401).json({
        success: false,
        authenticated: false,
        lockedOut: false,
        attemptsLeft,
        error: `Invalid admin passcode. ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining before 15-minute security lockout.`,
      });
    }
  }
});

// POST /api/admin/change-passcode - Update passcode securely (Protected)
app.post('/api/admin/change-passcode', requireAdminAuth, (req, res) => {
  try {
    const { currentPasscode, newPasscode } = req.body;

    if (!newPasscode || typeof newPasscode !== 'string' || newPasscode.trim().length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New passcode must be at least 6 characters long.',
      });
    }

    const current = loadData();
    const storedPass = current.adminPasscode || 'sami2026';
    const storedHash = current.adminPasscodeHash;

    const isCurrentValid = timingSafePasscodeCheck(currentPasscode, storedPass, storedHash);

    if (!isCurrentValid) {
      addAuditLog('PASSCODE_CHANGE_FAILED', 'failure', req, 'Failed passcode change attempt: current passcode incorrect.');
      return res.status(401).json({
        success: false,
        error: 'Current passcode is incorrect.',
      });
    }

    // Save newly hashed passcode
    current.adminPasscodeHash = hashPasscode(newPasscode.trim());
    delete current.adminPasscode; // Remove plaintext passcode completely
    saveData(current);

    addAuditLog('PASSCODE_CHANGED', 'security', req, 'Admin passcode was successfully changed.');

    res.json({
      success: true,
      message: 'Passcode updated successfully. Please use your new passcode on subsequent logins.',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/admin/security-status - Get security overview (Protected)
app.get('/api/admin/security-status', requireAdminAuth, (req, res) => {
  const current = loadData();
  const session = (req as any).adminSession as SessionInfo;
  const isDefault = !current.adminPasscodeHash && current.adminPasscode === 'sami2026';

  res.json({
    success: true,
    security: {
      isDefaultPasscode: isDefault,
      activeSessionsCount: activeSessions.size,
      maxFailedAttempts: MAX_FAILED_ATTEMPTS,
      lockoutDurationMinutes: Math.round(LOCKOUT_DURATION_MS / (60 * 1000)),
      sessionDurationMinutes: Math.round(SESSION_DURATION_MS / (60 * 1000)),
      currentSessionCreatedAt: new Date(session.createdAt).toISOString(),
      currentSessionExpiresAt: new Date(session.expiresAt).toISOString(),
      currentSessionIp: session.ip,
      auditLogsCount: (current.securityAuditLogs || []).length,
      serverUptimeSeconds: Math.round(process.uptime()),
    },
  });
});

// GET /api/admin/audit-logs - View security audit log history (Protected)
app.get('/api/admin/audit-logs', requireAdminAuth, (req, res) => {
  const current = loadData();
  res.json({
    success: true,
    logs: current.securityAuditLogs || [],
  });
});

// POST /api/admin/clear-logs - Clear audit logs (Protected)
app.post('/api/admin/clear-logs', requireAdminAuth, (req, res) => {
  const current = loadData();
  current.securityAuditLogs = [];
  saveData(current);
  addAuditLog('LOGS_CLEARED', 'security', req, 'Audit log history was cleared by admin.');
  res.json({ success: true, message: 'Security audit logs cleared.' });
});

// POST /api/admin/logout - Revoke active bearer session
app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
    addAuditLog('LOGOUT', 'success', req, 'Admin logged out.');
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Reset to Default Template (Protected)
app.post('/api/portfolio/reset', requireAdminAuth, (req, res) => {
  const defaultData: any = getDefaultPortfolioData();
  saveData(defaultData);
  addAuditLog('DATA_RESET', 'warning', req, 'Portfolio was reset to default template.');
  const { adminPasscode, adminPasscodeHash, securityAuditLogs, ...publicData } = defaultData;
  res.json({ success: true, data: publicData, message: 'Reset to default template complete' });
});

// Start server function
async function startServer() {
  if (!isProduction) {
    // Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/\n`);
  });
}

startServer();
