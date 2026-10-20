export interface NotePost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export const notesData: NotePost[] = [
  {
    id: "php-mysql-lessons",
    title: "Building with PHP & MySQL: Key Lessons From Developing a University ERP",
    category: "Backend Engineering",
    date: "February 2025",
    readTime: "5 min read",
    excerpt:
      "A reflection on designing multi-role authentication, preventing SQL injection with PDO, and structuring relational schemas for university administration.",
    content: [
      "When beginning web development, building simple CRUD scripts is common. But when tackling an entire University ERP system involving students, faculty, courses, attendance records, and exam results, relational architecture becomes the defining factor.",
      "The first crucial lesson was strict database normalization. Creating separate tables for students, courses, semesters, and enrollments with foreign keys prevented data anomalies that would otherwise corrupt records when a student changes a course or department.",
      "Security was the second major focus. Transitioning immediately to parameterized prepared statements with PDO eliminated SQL injection vulnerabilities. Handling session states securely, regenerating session IDs on login, and checking role-based permissions at the script header ensured students couldn't access faculty grading endpoints.",
      "Working without heavy frameworks first gave me a solid appreciation of HTTP request lifecycles, cookies, headers, and database connection pooling that will carry directly into modern full-stack architectures."
    ],
    tags: ["PHP", "MySQL", "Web Development", "Security", "Backend"]
  },
  {
    id: "learning-c-cpp-first",
    title: "Why Learning C & C++ First Deepens Understanding of Modern Web Development",
    category: "Computer Science",
    date: "January 2025",
    readTime: "4 min read",
    excerpt:
      "How wrestling with manual pointers, stack vs. heap allocation, and structured logic in C provides an invaluable mental model for high-level JavaScript.",
    content: [
      "In modern web development, languages like JavaScript abstract away memory management through automatic garbage collection. However, starting my CSE studies with C and C++ provided an essential peek behind the curtain.",
      "When working with pointers, manual memory allocation via malloc/free, and pass-by-reference semantics in C, concepts like JavaScript's object references, mutation side-effects, and call stacks suddenly become completely transparent.",
      "Furthermore, debugging segmentation faults teaches rigorous discipline in array boundary checking and deterministic program states. When learning React or Node.js later, you don't treat the runtime as a black box—you recognize the computational machine beneath it.",
      "For any aspiring software developer, investing time into low-level systems programming is one of the highest leverage foundations you can build."
    ],
    tags: ["C", "C++", "Memory Management", "Algorithms", "Foundations"]
  },
  {
    id: "database-normalization-retail",
    title: "Database Normalization in Practice: Moving from Chaos to 3NF in Retail Systems",
    category: "Database Systems",
    date: "November 2024",
    readTime: "6 min read",
    excerpt:
      "A walkthrough of restructuring a flat clothing inventory into normalized third normal form tables to handle multi-size variants, billing, and returns cleanly.",
    content: [
      "When I started the Clothing Shop Management System, my earliest draft attempted to store product variations (like sizes S, M, L, XL and colors) inside single table rows. It worked for two days, and then broke catastrophically when an invoice needed to discount only a specific size.",
      "That experience forced me to study database normalization deeply. We separated items into a master products table, an item_variants table containing specific SKU and barcode numbers, and an order_items join table.",
      "By achieving Third Normal Form (3NF), updates to a master product title never corrupt historical invoices. Invoices lock in the historical unit price at the time of purchase, preserving accounting audits even if base item prices inflate later.",
      "Clean relational design requires upfront mental effort, but it pays compounding dividends in system reliability."
    ],
    tags: ["Databases", "SQL", "Schema Design", "POS Systems"]
  },
  {
    id: "practical-ai-apis",
    title: "Bridging the Gap: Integrating AI APIs into Practical Web Interfaces",
    category: "AI & Innovation",
    date: "October 2024",
    readTime: "5 min read",
    excerpt:
      "Designing user-centric preference quizzes and structured JSON prompts for sensory recommendation without confusing the user.",
    content: [
      "Generative AI is often shown as open-ended chatbots, but for everyday consumer tasks like finding a perfume, a blank chat prompt is paralyzing. Most people don't know the exact terms like 'bergamot heart note' or 'vetiver drydown'.",
      "While building the AI Perfume Recommendation System, the core challenge was transforming qualitative human preferences (e.g. 'I like rainy autumn evenings and crisp woody smells') into reliable recommendation matrices.",
      "By constraining the user experience into a structured step-by-step quiz and utilizing schema-enforced prompt responses, the application yields consistent, actionable recommendations without hallucinating nonexistent products.",
      "The future of AI engineering isn't just about large models—it is about thoughtful interface design that meets users where they are."
    ],
    tags: ["AI", "UI/UX", "JavaScript", "Prompt Engineering"]
  }
];
