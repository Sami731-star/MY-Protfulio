export interface ResearchPaper {
  id: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  paperUrl: string;
  ieeeUrl?: string;
  researchGateUrl?: string;
  authors: string[];
  venue: string;
  status: 'Published' | 'Accepted' | 'Under Review' | 'Preprint' | 'In Progress';
  year: string;
  topics: string[];
  doi?: string;
  citationBibtex?: string;
  featured?: boolean;
}

export const initialResearchPapers: ResearchPaper[] = [
  {
    id: "rl-bowling-iccit-2025",
    title: "Reinforcement Learning for Optimizing Bowling Strategies in One Day Internationals",
    description: "Published research paper in IEEE Xplore as part of the 28th International Conference on Computer and Information Technology (ICCIT 2025). Investigates intelligent decision-making in cricket through Reinforcement Learning and Deep Q-Networks (DQN).",
    bulletPoints: [
      "Published research paper in IEEE Xplore as part of the 28th International Conference on Computer and Information Technology (ICCIT 2025).",
      "Focused on Reinforcement Learning, Deep Q-Network (DQN), and Cricket Analytics for optimizing bowling strategies in One Day Internationals.",
      "Contributed to research methodology, literature review, data analysis, and research documentation."
    ],
    paperUrl: "https://ieeexplore.ieee.org/document/11490554?utm_source=chatgpt.com",
    ieeeUrl: "https://ieeexplore.ieee.org/document/11490554?utm_source=chatgpt.com",
    researchGateUrl: "https://www.researchgate.net/publication/404607227_Reinforcement_Learning_for_Optimizing_Bowling_Strategies_in_One_Day_Internationals",
    authors: ["Oakimul Sami"],
    venue: "IEEE Conference Publication | 28th International Conference on Computer and Information Technology (ICCIT 2025)",
    status: "Published",
    year: "2025",
    topics: ["Reinforcement Learning", "Deep Q-Network (DQN)", "Cricket Analytics", "Sports Analytics", "Artificial Intelligence"],
    doi: "10.1109/ICCIT68739.2025.11490554",
    citationBibtex: `@inproceedings{sami2025bowling,
  title={Reinforcement Learning for Optimizing Bowling Strategies in One Day Internationals},
  author={Sami, Oakimul and others},
  booktitle={2025 28th International Conference on Computer and Information Technology (ICCIT)},
  year={2025},
  publisher={IEEE},
  doi={10.1109/ICCIT68739.2025.11490554}
}`,
    featured: true
  }
];
