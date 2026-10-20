export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  category: string;
  organization?: string;
  summary: string;
  details: string[];
  keyTechnologies: string[];
}

export const journeyTimeline: JourneyItem[] = [
  {
    id: "cse-degree",
    period: "2024 — Present",
    title: "Computer Science & Engineering Undergraduate",
    category: "Academic Foundation",
    organization: "Uttara University, Dhaka",
    summary:
      "Enrolled in the B.Sc. in Computer Science & Engineering program, building a rigorous grounding in computing foundations, discrete math, data structures, and computer organization.",
    details: [
      "Currently pursuing foundational and core computing curriculum.",
      "Studying structured programming in C, object-oriented concepts in C++, and computer logic design.",
      "Collaborating with fellow university peers on practical lab assignments and algorithmic problem solving."
    ],
    keyTechnologies: ["C", "C++", "Data Structures", "Discrete Math"]
  },
  {
    id: "web-dev-learning",
    period: "2024",
    title: "Web Development Learning & Fundamentals",
    category: "Technical Learning",
    summary:
      "Began deep exploration of modern web standards, semantic HTML, responsive CSS layouts, and core JavaScript.",
    details: [
      "Mastered responsive layout techniques using Flexbox, CSS Grid, and media queries.",
      "Gained strong confidence in DOM manipulation, asynchronous JavaScript, event handling, and ES6+ features.",
      "Constructed static and interactive single-page mini-tools to cement frontend basics."
    ],
    keyTechnologies: ["HTML5", "CSS3", "Modern JavaScript", "Tailwind CSS"]
  },
  {
    id: "php-mysql-projects",
    period: "2024 — 2025",
    title: "PHP & MySQL Database Systems",
    category: "Backend Development",
    summary:
      "Explored server-side web development with PHP, relational schema design with MySQL, and local testing with XAMPP.",
    details: [
      "Designed normalized relational databases with primary/foreign keys and referential integrity constraints.",
      "Wrote secure SQL queries preventing SQL injection using prepared statements and parameterized inputs.",
      "Engineered full user authentication, hashed password storage, and session state management.",
      "Built the University ERP System as a milestone demonstration of relational backend capabilities."
    ],
    keyTechnologies: ["PHP", "MySQL", "XAMPP", "Apache", "Session Management"]
  },
  {
    id: "fullstack-dev",
    period: "2025 — Present",
    title: "Full-Stack Development & Component Architecture",
    category: "Full-Stack Engineering",
    summary:
      "Transitioned to component-driven frontend architecture with React while connecting decoupled backend APIs.",
    details: [
      "Adopted React for modular UI composition, state management with hooks, and responsive UX.",
      "Developed the Clothing Shop Management System combining a React interface with a PHP/MySQL backend.",
      "Practiced clean separation of concerns between client state, presentation components, and RESTful endpoints."
    ],
    keyTechnologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS"]
  },
  {
    id: "ai-experiments",
    period: "2025 — Present",
    title: "AI Application Experiments & Computer Vision",
    category: "Applied AI",
    summary:
      "Began experimenting with intelligent application workflows: integrating AI APIs and testing computer vision models.",
    details: [
      "Engineered the AI Perfume Recommendation System using structured prompt design and preference scoring.",
      "Built prototype computer vision pipelines exploring hand gesture detection and coordinate tracking.",
      "Focusing on practical, accessible AI implementations rather than purely theoretical research."
    ],
    keyTechnologies: ["AI APIs", "Computer Vision", "Python", "MediaPipe / Landmarks"]
  },
  {
    id: "problem-solving",
    period: "Continuous",
    title: "Programming & Algorithmic Problem Solving",
    category: "Core Skills",
    summary:
      "Practicing problem solving in C and C++ to strengthen algorithmic thinking, computational efficiency, and analytical skills.",
    details: [
      "Solving algorithmic challenges involving arrays, strings, recursion, sorting, and search algorithms.",
      "Developing an appreciation for time and space complexity tradeoffs in software design.",
      "Regularly writing and testing code on version control repositories."
    ],
    keyTechnologies: ["C", "C++", "Algorithms", "Git"]
  }
];
