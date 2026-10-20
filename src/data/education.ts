export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  department?: string;
  location?: string;
  status: string; // e.g. "Currently Studying", "Completed", "Graduated"
  period: string; // e.g. "2024 — Present", "2021 — 2023"
  expectedGraduation?: string;
  academicFocus?: string;
  coursework?: string[];
  level?: 'University' | 'College' | 'School' | 'Other';
  board?: string; // e.g. "Dhaka Board", "Rajshahi Board", etc.
  logoUrl?: string;
  gpa?: string;
}

// Backward-compatible single object interface
export interface EducationInfo {
  institution: string;
  degree: string;
  department: string;
  location: string;
  status: string;
  period: string;
  expectedGraduation: string;
  coursework: string[];
  academicFocus: string;
  notes: string[];
  logoUrl?: string;
}

export const educationList: EducationItem[] = [
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
];

export const educationData: EducationInfo = {
  institution: educationList[0].institution,
  degree: educationList[0].degree,
  department: educationList[0].department || "Department of Computer Science & Engineering",
  location: educationList[0].location || "Dhaka, Bangladesh",
  status: educationList[0].status,
  period: educationList[0].period,
  expectedGraduation: educationList[0].expectedGraduation || "Expected: 2028",
  academicFocus: educationList[0].academicFocus || "",
  coursework: educationList[0].coursework || [],
  notes: [
    "Active participant in department coding exercises and collaborative lab projects.",
    "Maintaining dedicated focus on core computer science foundations alongside practical software development."
  ],
  logoUrl: ""
};
