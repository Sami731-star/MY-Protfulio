export interface PersonalInfo {
  name: string;
  initials: string;
  headline: string;
  shortBio: string;
  shortIntro?: string;
  extendedBio: string[];
  location: string;
  university: string;
  department: string;
  degree: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  whatsapp?: string;
  resumeUrl: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeFileType?: string;
  resumeUpdatedAt?: string;
  avatarUrl?: string;
  avatarCaption?: string;
  currentlyLearning: string[];
  coreInterests: string[];
}

export const personalData: PersonalInfo = {
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
  // Placeholders as requested:
  linkedin: "https://linkedin.com/in/oakimul-sami",
  facebook: "https://facebook.com/oakimul.sami",
  instagram: "https://instagram.com/oakimul.sami",
  whatsapp: "+8801560062460",
  resumeUrl: "#", // Handled via in-app interactive resume viewer/download modal
  resumeFileName: "MY CV.pdf",
  resumeFileSize: "2.08 MB",
  resumeFileType: "application/pdf",
  resumeUpdatedAt: "2026-09-26T12:41:43.701Z",
  avatarUrl: "", // Oakimul Sami photo
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
};
