export interface AchievementItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Milestone';
  items?: string[];
  placeholderNote?: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "programming-solving",
    category: "Programming & Problem Solving",
    title: "Algorithmic Foundation in C & C++",
    subtitle: "Core logic and standard algorithms",
    description:
      "Consistent practice solving structured programming challenges in C and C++, focusing on memory handling, recursion, arrays, pointers, and algorithmic logic.",
    status: "Milestone",
    items: [
      "Implemented standard sorting and searching algorithms from scratch",
      "Completed foundational problem sets across structured programming coursework",
      "Active daily practice in logical problem breakdown"
    ]
  },
  {
    id: "university-projects",
    category: "University Projects",
    title: "Academic Systems & Database Engineering",
    subtitle: "Department course milestones & lab builds",
    description:
      "Successfully developed multi-user relational database systems as key university software milestones, including full role-based academic management architectures.",
    status: "Milestone",
    items: [
      "Engineered the University ERP System with 9 functional modules",
      "Delivered relational schema designs meeting third normal form (3NF) requirements",
      "Presented system design blueprints for academic lab review"
    ]
  },
  {
    id: "technical-learning",
    category: "Technical Learning",
    title: "Full-Stack Web Specialization",
    subtitle: "Self-driven technology exploration",
    description:
      "Progressive mastery of modern full-stack development through self-directed study, open-source documentation, and hands-on application prototyping.",
    status: "In Progress",
    items: [
      "Self-directed progression from fundamental HTML/CSS to React component architecture",
      "Relational backend engineering with PHP and MySQL",
      "Hands-on API integrations and computer vision experiments"
    ]
  },
  {
    id: "personal-software",
    category: "Personal Software Projects",
    title: "Real-World Utility Applications",
    subtitle: "End-to-end practical software products",
    description:
      "Designed and deployed practical solutions solving tangible everyday problems, from retail commerce management to sensory recommendation tools.",
    status: "Completed",
    items: [
      "Built Clothing Shop Management System for retail and inventory workflows",
      "Prototyped AI Perfume Recommendation System with personalized quiz logic",
      "Explored Sign Language translation using computer vision"
    ]
  },
  {
    id: "certifications",
    category: "Certifications & Credentials",
    title: "Professional Certifications Placeholder",
    subtitle: "Ongoing skill accreditations",
    description:
      "Currently undertaking certified coursework and foundational technical credentials. Updated as new verified qualifications are completed.",
    status: "In Progress",
    items: [
      "In-progress coursework in Web Development and Database Administration",
      "Upcoming technical assessment credentials"
    ],
    placeholderNote: "Section ready to list verified certifications, licenses, and course completions."
  }
];
