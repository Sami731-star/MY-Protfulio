export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools';
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  column?: 1 | 2 | 3;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  // Column 1
  {
    id: "languages",
    title: "Languages",
    description: "Core programming languages for algorithmic problem solving and software systems.",
    column: 1,
    skills: ["C++", "Python", "JavaScript", "TypeScript", "C"]
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Client-side modern frameworks and component libraries.",
    column: 1,
    skills: ["React", "Next.js", "Tailwind CSS", "Chakra UI", "HeroUI", "HTML", "CSS"]
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server runtime, API microservices, and web engines.",
    column: 1,
    skills: ["FastAPI", "Node.js", "Express.js", "REST API"]
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational, in-memory caches, vector and realtime stores.",
    column: 1,
    skills: ["PostgreSQL", "Redis", "Firebase", "Supabase", "Pinecone"]
  },

  // Column 2
  {
    id: "ai",
    title: "AI",
    description: "Modern generative AI architectures, agent pipelines, and LLM tooling.",
    column: 2,
    skills: ["RAG Pipelines", "Vector Databases", "Vector Embeddings", "AI Agents", "Prompt Engineering", "Model Context Protocol (MCP)", "Tool Calling", "LangChain", "Vercel AI SDK"]
  },
  {
    id: "ai-tools",
    title: "AI Development Tools",
    description: "AI-assisted developer environments and code engines.",
    column: 2,
    skills: ["Codex", "Claude Code", "Cursor"]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Data analysis, scientific computation, and exploratory notebooks.",
    column: 2,
    skills: ["Pandas", "NumPy", "Matplotlib", "Jupyter Notebooks", "SQL"]
  },
  {
    id: "qa",
    title: "QA",
    description: "Automated testing, load verification, and reliability suites.",
    column: 2,
    skills: ["Pytest", "Jest", "Mocha", "Load Testing", "k6", "Unit Testing"]
  },

  // Column 3
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Containerization, cloud infrastructure, and CI/CD automation.",
    column: 3,
    skills: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD Pipelines", "Datadog", "Argo CD", "Apache Airflow", "AWS (ECS, EKS, EC2, RDS, S3, MWAA)"]
  },
  {
    id: "blockchain",
    title: "Blockchain & Smart Contracts",
    description: "Decentralized applications, smart contract protocols, and Web3 tooling.",
    column: 3,
    skills: ["Solidity", "Web3.py", "Web3.js", "Remix", "Hardhat", "ethers.js", "Alchemy"]
  },
  {
    id: "others",
    title: "Others",
    description: "Development workflows, operating systems, and fundamental computing concepts.",
    column: 3,
    skills: ["Git", "GitHub", "Linux", "System Design", "Vercel", "Web Scraping", "Data Structures and Algorithms", "Competitive Programming"]
  }
];
