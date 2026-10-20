export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  department?: string;
  period: string;
  status?: string;
  location?: string;
  logoUrl?: string;
  responsibilities: string[];
  skills?: string[];
}

export const workExperiencesData: WorkExperienceItem[] = [
  {
    id: "general-manager-mn-corp",
    role: "General Manager",
    company: "MN Corporation",
    period: "March 01, 2023 — Present (Continuing)",
    status: "Present",
    location: "Dhaka, Bangladesh",
    logoUrl: "",
    responsibilities: [
      "Managed day-to-day administrative and operational activities of the organization.",
      "Prepared and maintained VAT & Tax-related documents and records.",
      "Handled banking transactions and banking documentation.",
      "Processed RTGS transactions and coordinated with banks when required.",
      "Prepared and managed sales contracts, invoices, bills, and related documents.",
      "Maintained proper records of sales, purchases, payments, and financial documents.",
      "Coordinated with clients, suppliers, banks, and internal departments.",
      "Assisted in financial and administrative reporting and documentation.",
      "Ensured accuracy and timely completion of official documents and transactions.",
      "Supported overall office management and operational activities."
    ],
    skills: ["Operations Management", "VAT & Tax Compliance", "Banking & RTGS", "Contract Management", "Financial Documentation", "Team Coordination"]
  },
  {
    id: "pos-operator-aci",
    role: "POS Operator",
    company: "ACI Logistic Limited",
    department: "Operator",
    period: "October 01, 2024 — December 20, 2024",
    status: "Completed",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Operated POS (Point of Sale) systems for daily sales transactions.",
      "Processed cash, card, mobile banking, and other customer payments.",
      "Generated and issued customer invoices, receipts, and bills.",
      "Handled product scanning, pricing, discounts, and promotional offers.",
      "Coordinated with inventory and store staff regarding product availability and stock updates."
    ],
    skills: ["POS Systems", "Sales Operations", "Payment Processing", "Inventory Coordination", "Customer Service"]
  }
];
