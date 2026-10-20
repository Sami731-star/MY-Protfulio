export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  developmentProcess: string[];
  challenges: string[];
  futureImprovements: string[];
  status: 'Completed' | 'In Active Development' | 'Prototype';
  year: string;
}

export const projectsData: Project[] = [
  {
    id: "university-erp",
    title: "University ERP System",
    tagline: "Comprehensive institutional management portal for academia, administration, and student records",
    description:
      "A full-featured web-based university management system designed to streamline and automate academic operations, student registries, faculty administration, attendance tracking, fees collection, and exam evaluations.",
    image: "/src/assets/images/project_university_erp_1790235592889.jpg",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Apache/XAMPP"],
    features: [
      "Admin dashboard with institutional overview metrics",
      "Student management (enrollment, profiles, academic records)",
      "Faculty management and department course allocation",
      "Attendance tracking module with date & lecture filters",
      "Course management and semester syllabus allocation",
      "Fees and student payment transaction ledger",
      "Examination marks entry and semester result publication",
      "Comprehensive downloadable student & financial reports",
      "Strict role-based access control (Admin, Faculty, Student)"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined, // Disabled placeholder per instructions
    overview:
      "Modern universities handle large amounts of administrative and academic data daily. This ERP system centralizes disparate departments into an integrated web portal, replacing scattered paperwork with structured relational database workflows.",
    problem:
      "Manual record keeping for course registrations, faculty schedules, and attendance creates administrative bottlenecks, high margin for data errors, and delays in releasing semester examination results.",
    solution:
      "Engineered a normalized MySQL database schema connected to PHP backend scripts with authenticated role sessions. Admins oversee university operations, faculty log daily attendance and test marks, while students inspect course materials and fee receipts.",
    developmentProcess: [
      "Requirement specification & relational entity-relationship (ER) modeling for university entities",
      "Database schema normalization (3NF) to eliminate data redundancy and preserve referential integrity",
      "Implementation of session-based authentication and granular role-based route middleware",
      "Development of modular frontend views using reusable CSS and responsive data tables",
      "Comprehensive testing of grading calculations, attendance percentages, and PDF report generation"
    ],
    challenges: [
      "Designing complex SQL relational queries with multiple JOIN operations across courses, semesters, and student marks without hurting query performance",
      "Enforcing strict access boundaries so students cannot inspect unauthorized faculty evaluation rubrics"
    ],
    futureImprovements: [
      "Migrating frontend views to a modern React SPA for instantaneous client-side interactions",
      "Integrating SMS/Email alert notifications for upcoming tuition dues and exam schedules",
      "Adding automated barcode/biometric attendance device logging"
    ],
    status: "Completed",
    year: "2024"
  },
  {
    id: "clothing-shop-system",
    title: "Clothing Shop Management System",
    tagline: "Point-of-sale inventory and transaction management engine tailored for apparel businesses",
    description:
      "A tailored inventory, billing, and order management system created for online and retail clothing/T-shirt brands, featuring automated stock counts, invoice printing, delivery tracking, and daily closing calculations.",
    image: "/src/assets/images/project_clothing_shop_1790235618598.jpg",
    technologies: ["React", "JavaScript", "PHP", "MySQL", "Tailwind CSS"],
    features: [
      "Product catalog management with size, color, and SKU variations",
      "Stock-in workflow and real-time inventory count tracking",
      "Instant billing terminal with automated calculation",
      "Printable clean customer invoices & receipts",
      "Order status pipeline (Paid, Pending, Processing, Return)",
      "Dynamic discount and promotional code logic",
      "Configurable delivery charge computation based on region",
      "End-of-day daily closing & cash reconciliation tally",
      "Monthly revenue and inventory movement analytics",
      "Secure administrative control panel"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined,
    overview:
      "Managing an apparel and T-shirt enterprise requires tracking multi-variant stock (sizes S/M/L/XL, colors) and processing orders across physical counters and online delivery requests seamlessly.",
    problem:
      "Apparel merchants frequently suffer inventory mismatches when selling across online channels and in-person showrooms, losing track of pending customer couriers and returned packages.",
    solution:
      "Built a unified management engine with a fast React frontend connected to a PHP/MySQL API backend. When orders are drafted, stock automatically adjusts, printable invoices generate instantly, and courier statuses update with clear daily closing ledgers.",
    developmentProcess: [
      "Analyzed local retail workflows: inventory stocking, barcode/SKU labeling, billing, and returns",
      "Designed dynamic variant schema supporting nested product attributes (size, color, batch)",
      "Crafted an interactive cart and billing screen in React with instant calculation formulas",
      "Built printable invoice templates with clean print CSS media queries",
      "Implemented daily closing audit tools providing daily gross profit and pending courier summaries"
    ],
    challenges: [
      "Preventing double-allocation of limited inventory during high-volume sales rushes",
      "Designing an ergonomic invoice print layout that prints crisply on thermal POS receipt and standard A4 printers"
    ],
    futureImprovements: [
      "Integration with courier API webhooks for automated live tracking updates",
      "Adding low-stock SMS warnings when popular sizes fall below minimum threshold"
    ],
    status: "Completed",
    year: "2025"
  },
  {
    id: "ai-perfume-recommendation",
    title: "AI Perfume Recommendation System",
    tagline: "Intelligent fragrance profile analyzer offering personalized scent recommendations",
    description:
      "An AI-assisted web application that guides users through an intuitive sensory preference quiz and utilizes modern AI reasoning to recommend tailored perfume fragrance profiles, top/heart/base notes, and occasions.",
    image: "/src/assets/images/project_perfume_ai_1790235633422.jpg",
    technologies: ["JavaScript", "React", "AI API Integration", "Tailwind CSS", "REST"],
    features: [
      "Multi-step interactive olfactory preference questionnaire",
      "Fragrance pyramid detection (Top, Heart, and Base notes)",
      "AI-driven semantic scent profile matching and reasoning",
      "Personalized recommendations based on weather, occasion, and mood",
      "Ingredient notes breakdown (Citrus, Woody, Oriental, Gourmand, Floral)",
      "Saved favorite fragrance profiles"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined,
    overview:
      "Choosing fragrances online is notoriously challenging because buyers cannot physically smell perfumes before ordering. This system translates personal lifestyle, preferred weather, favorite scent memories, and budget into matched fragrance archetypes.",
    problem:
      "Most fragrance shopping platforms force users to browse hundreds of confusing perfume bottles with complex note descriptions that general consumers find intimidating.",
    solution:
      "Built a questionnaire capturing intuitive signals (favorite season, preferred daily vibes, occasion). An integrated AI model analyzes the user inputs and maps them into harmonious olfactory families, outputting personalized bottle and fragrance recommendations with clear explanations.",
    developmentProcess: [
      "Researched olfactory classifications: the Fragrance Wheel, scent longevity, and note transitions",
      "Designed an accessible multi-step quiz UI with step-by-step state transitions in React",
      "Engineered structured prompting pipelines returning validated JSON scent profiles",
      "Crafted visual scent radar and note composition cards explaining why each perfume fits the user"
    ],
    challenges: [
      "Balancing creative fragrance descriptions with structured, predictable JSON response schemas",
      "Making abstract sensory descriptions (e.g. 'fresh rain on warm cedar') accessible to beginner fragrance enthusiasts"
    ],
    futureImprovements: [
      "Direct integration with regional perfume retailers' inventory",
      "Community rating system and sample vial ordering integration"
    ],
    status: "Completed",
    year: "2025"
  },
  {
    id: "sign-language-detection",
    title: "Sign Language Detection App",
    tagline: "Computer vision application translating hand signs and gestures into real-time readable text",
    description:
      "An assistive computer vision and machine learning project that detects human hand gestures via webcam input, maps skeletal landmark coordinates, and classifies signs into understandable textual output to bridge communication gaps.",
    image: "/src/assets/images/project_sign_language_1790235646146.jpg",
    technologies: ["Computer Vision", "Machine Learning / AI", "Python", "JavaScript", "HTML5 Canvas"],
    features: [
      "Real-time webcam hand tracking and landmark keypoint detection",
      "Gesture feature extraction and coordinate normalization",
      "Multi-sign classification model recognizing alphabet and basic vocabulary",
      "Visual feedback overlay showing hand skeletal joints",
      "Instant textual transcription of recognized gestures",
      "Responsive accessibility-first user interface"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined,
    overview:
      "Sign language is the primary communication method for millions of deaf and hard-of-hearing individuals worldwide. This project investigates using affordable consumer webcams and computer vision to translate gestures into text in real time.",
    problem:
      "Communication barriers frequently isolate non-verbal individuals in educational, medical, and commercial environments where fluent sign language interpreters are unavailable.",
    solution:
      "Leveraged hand pose estimation algorithms to extract 21 3D hand landmarks per frame. Trained a lightweight classification pipeline that matches hand geometry against gesture datasets and prints the predicted letters and words with high confidence.",
    developmentProcess: [
      "Curated sign language gesture training samples under varying ambient lighting conditions",
      "Implemented hand landmark extraction pipeline using vision models",
      "Calculated angular and Euclidean coordinate vectors between fingertip joints",
      "Developed an interactive dashboard rendering the camera feed alongside live classification scores",
      "Fine-tuned confidence thresholds to reduce false positive gesture flickers"
    ],
    challenges: [
      "Handling variations in hand scale, rotation, and different camera lighting without dropping frame rates",
      "Distinguishing signs with subtle finger curled differences (such as letters 'M', 'N', and 'S')"
    ],
    futureImprovements: [
      "Expanding vocabulary from static finger-spelling to dynamic continuous sentence gestures",
      "Adding text-to-speech audio pronunciation for two-way conversation"
    ],
    status: "In Active Development",
    year: "2025"
  },
  {
    id: "nova-ai",
    title: "Nova AI Intelligence Platform",
    tagline: "Intelligent conversational assistant and multimodal reasoning engine powered by modern LLMs",
    description:
      "A next-generation AI assistant platform engineered with Gemini and modern Large Language Models (LLMs), featuring streaming responses, contextual multi-turn conversation memory, prompt engineering templates, and interactive data insights.",
    image: "/src/assets/images/project_nova_ai_1792417125663.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Node.js", "Express", "REST APIs"],
    features: [
      "Real-time streaming AI chat responses with token-by-token rendering",
      "Multi-turn conversation history and context-aware session management",
      "Custom system prompts and specialized personas (Coding, Writing, Analysis)",
      "Code snippet highlighting with 1-click copy and formatting",
      "Dark mode cyberpunk UI with fluid animations and responsive layout",
      "API rate-limiting protection and resilient server-side proxy integration"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined,
    overview:
      "Nova AI brings cutting-edge artificial intelligence into an intuitive, ultra-responsive workspace. Built to explore practical LLM integration, it handles complex coding queries, research summarization, and interactive brainstorming sessions with minimal latency.",
    problem:
      "Off-the-shelf AI interfaces often lack customized developer tooling, lightweight responsive design, or safe proxy layers for deploying proprietary prompting workflows without exposing API credentials.",
    solution:
      "Constructed a full-stack architecture using React and Node.js. Server-side proxy endpoints safely handle API authorization with streaming response chunking, while the client delivers high-performance Markdown and syntax-highlighted code rendering.",
    developmentProcess: [
      "Designed futuristic cyberpunk UI with glowing indigo/cyan themes and fluid Motion animations",
      "Integrated Gemini API using server-side secure endpoints for API key protection",
      "Implemented Server-Sent Events (SSE) and stream readers for real-time text output",
      "Built session caching to allow users to switch between multiple chat threads seamlessly",
      "Optimized performance to ensure sub-100ms UI interaction latency"
    ],
    challenges: [
      "Managing smooth Markdown stream parsing as token chunks arrive asynchronously without layout shifts",
      "Handling API token limits and gracefully managing network disconnection recovery"
    ],
    futureImprovements: [
      "Multimodal document & image analysis with OCR integration",
      "Vector database embeddings for semantic search across user documents (RAG)"
    ],
    status: "Completed",
    year: "2025"
  },
  {
    id: "diagnostic-center-management",
    title: "Diagnostic Center Management System",
    tagline: "Complete healthcare diagnostic clinic portal for lab tests, appointments, doctor schedules & medical billing",
    description:
      "A comprehensive digital hospital & diagnostic clinic solution automating patient registration, appointment scheduling, laboratory pathology test tracking, digital invoice billing, and medical report delivery.",
    image: "/src/assets/images/project_diagnostic_center_1792417141912.jpg",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap/Tailwind", "PDF Generation"],
    features: [
      "Patient registry with unique patient ID (PID) and complete medical visit history",
      "Diagnostic lab test catalog (Blood tests, X-Ray, ECG, Ultrasonography, MRI)",
      "Doctor appointment scheduling with date & time slot booking calendar",
      "Automated bill calculation with discount vouchers, paid amounts, and due tracking",
      "Pathology report entry system with printable/downloadable lab test results",
      "Multi-role user authentication (Receptionist, Lab Technologist, Doctor, Admin)",
      "Financial revenue analytics and daily transaction ledger reports"
    ],
    githubUrl: "https://github.com/sami731-star",
    liveDemoUrl: undefined,
    overview:
      "Healthcare facilities need robust, error-free management to handle thousands of patient samples and clinical records daily. This diagnostic center portal digitizes the entire lifecycle from patient entry to test sample collection and final report generation.",
    problem:
      "Paper-based patient records and handwritten lab reports result in lost diagnostic data, long queues at payment counters, and delays in delivering critical medical test findings.",
    solution:
      "Engineered a database-driven healthcare platform with clean clinical workflows. Patients receive automated invoices with test barcodes, pathologists log verified lab metrics, and admins monitor real-time daily hospital revenue.",
    developmentProcess: [
      "Consulted diagnostic lab workflows to blueprint pathology test attributes and normal range values",
      "Architected relational schema in MySQL with foreign key constraints for patient test orders and billings",
      "Developed responsive admin and receptionist portals with rapid patient search and instant test selection",
      "Implemented PDF report generator module formatting test results with clinic header and doctor signature",
      "Security audit for role isolation ensuring lab staff only modify medical results while reception manages billing"
    ],
    challenges: [
      "Structuring dynamic pathology test parameters where each test has distinct normal range metrics and units",
      "Ensuring accurate ledger computations when partial payments, refunds, and corporate discounts are applied"
    ],
    futureImprovements: [
      "Online patient portal for downloading test reports via SMS token link",
      "Barcode & QR code scanner integration on lab specimen tubes"
    ],
    status: "Completed",
    year: "2025"
  }
];
