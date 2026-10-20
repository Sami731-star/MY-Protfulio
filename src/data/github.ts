export interface RepositoryCard {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars?: number;
  forks?: number;
  isPrivate?: boolean;
  topics: string[];
  url: string;
}

export const githubProfileData = {
  username: "sami731-star",
  profileUrl: "https://github.com/sami731-star",
  headline: "Aspiring Software Engineer & Computer Science Student",
  location: "Dhaka, Bangladesh",
  bio: "Learning, building, and solving problems across web engineering, database architecture, and computer science fundamentals.",
  repositories: [
    {
      name: "university-erp-system",
      description: "Comprehensive institutional web portal managing students, faculty, course allocations, attendance records, and examination results.",
      language: "PHP",
      languageColor: "#777bb4",
      topics: ["php", "mysql", "erp", "academic-portal", "attendance-tracker"],
      url: "https://github.com/sami731-star"
    },
    {
      name: "clothing-shop-management",
      description: "Inventory, billing POS terminal, and customer invoice tracking system designed for apparel and retail businesses.",
      language: "JavaScript",
      languageColor: "#f1e05a",
      topics: ["react", "javascript", "pos-system", "inventory-management", "mysql"],
      url: "https://github.com/sami731-star"
    },
    {
      name: "ai-perfume-recommender",
      description: "Intelligent fragrance recommendation application matching user olfactory lifestyle preferences to perfume notes via AI.",
      language: "JavaScript",
      languageColor: "#f1e05a",
      topics: ["ai-api", "fragrance-analyzer", "react", "tailwindcss"],
      url: "https://github.com/sami731-star"
    },
    {
      name: "sign-language-cv-detector",
      description: "Computer vision hand landmark tracking and gesture classification translating sign language into real-time text.",
      language: "Python",
      languageColor: "#3572A5",
      topics: ["computer-vision", "machine-learning", "gestures", "accessibility"],
      url: "https://github.com/sami731-star"
    }
  ] as RepositoryCard[],
  contributionPhilosophy: [
    "Commit regularly, write semantic commit messages, and build clean modular repositories.",
    "Refactor and normalize code logic as understanding deepens.",
    "Embrace open-source collaboration, documentation readability, and version control hygiene."
  ]
};
