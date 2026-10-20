export interface CurrentlyBuildingItem {
  id: string;
  category: string;
  title: string;
  description: string;
  focus: string;
  technologies: string[];
  status: string;
}

export const currentlyBuildingList: CurrentlyBuildingItem[] = [
  {
    id: "ai-applications",
    category: "AI Applications",
    title: "Practical AI-Powered Web Applications",
    description: "Experimenting with practical AI-powered web applications that integrate modern language models and computer vision into useful daily consumer interfaces.",
    focus: "Prompt engineering, structured JSON outputs, client-side vision models",
    technologies: ["JavaScript", "AI APIs", "Computer Vision", "React"],
    status: "Active Research"
  },
  {
    id: "web-development",
    category: "Web Development",
    title: "Full-Stack Architecture & Backend Systems",
    description: "Building full-stack applications and improving backend development skills with relational schemas, robust authentication, and performant REST endpoints.",
    focus: "Database normalization, secure sessions, modular API design",
    technologies: ["PHP", "MySQL", "React", "Tailwind CSS"],
    status: "In Development"
  },
  {
    id: "problem-solving",
    category: "Problem Solving",
    title: "Algorithmic Thinking & Computational Logic",
    description: "Continuously improving programming and algorithmic thinking through regular problem solving in C and C++, focusing on memory efficiency and optimal solutions.",
    focus: "Data structures, time complexity analysis, algorithm implementation",
    technologies: ["C", "C++", "Algorithms"],
    status: "Ongoing Practice"
  }
];
