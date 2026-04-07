export const standardTechServices = [
  {
    id: "repair",
    name: "PC & Laptop Repair",
    description: "Diagnostics, OS installs, driver cleanup, and performance tuning.",
    priceRange: "$60-$180",
    timeline: "Same day to 2 days",
  },
  {
    id: "custom-build",
    name: "Custom PC Building",
    description: "Full compatibility planning, part selection, assembly, and testing.",
    priceRange: "$120-$350",
    timeline: "1-4 days",
  },
  {
    id: "software",
    name: "Software Troubleshooting",
    description: "Malware cleanup, crash fixes, startup issues, and system recovery.",
    priceRange: "$50-$160",
    timeline: "Same day to 2 days",
  },
  {
    id: "network",
    name: "Network Setup",
    description: "Router setup, Wi-Fi security hardening, and optimization.",
    priceRange: "$80-$250",
    timeline: "2-6 hours",
  },
  {
    id: "consulting",
    name: "Tech Consulting",
    description: "Tailored plans for homes and small businesses.",
    priceRange: "$45-$120/hr",
    timeline: "Flexible",
  },
];

export const developmentServices = [
  {
    id: "website-starter",
    name: "Website Starter",
    description: "Modern, responsive website with core pages and contact flow.",
    priceRange: "$900-$2,000",
    timeline: "1-2 weeks",
    featured: false,
    bullets: [
      "Up to 3 core pages (Home, Services, Contact)",
      "Mobile-first responsive layout",
      "Contact form with email delivery setup",
      "Basic SEO metadata and social preview tags",
      "Deployment and launch handoff",
    ],
  },
  {
    id: "website-growth",
    name: "Website Growth",
    description: "Multi-page website with stronger UX, SEO, and conversion structure.",
    priceRange: "$2,200-$4,800",
    timeline: "3-5 weeks",
    featured: true,
    bullets: [
      "5-8 pages with conversion-focused structure",
      "Stronger UX polish and reusable section components",
      "On-page SEO setup (titles, meta, structure)",
      "Analytics and basic event tracking",
      "Speed/performance tuning and launch QA",
    ],
  },
  {
    id: "website-custom",
    name: "Custom Web Build",
    description: "Advanced build with integrations, custom UI, and scalability planning.",
    priceRange: "$5,000-$12,000+",
    timeline: "6+ weeks",
    featured: false,
    bullets: [
      "Custom UI and tailored user flows",
      "Advanced integrations (APIs, auth, dashboards)",
      "Complex content architecture and scaling plan",
      "Performance, security, and maintainability focus",
      "Post-launch support and iteration roadmap",
    ],
  },
];

export const serviceDifference = [
  {
    feature: "Best for",
    standard: "Repairs, setup, and local IT needs",
    development: "Business websites and web products",
  },
  {
    feature: "Pricing model",
    standard: "Flat service fee or hourly",
    development: "Project-based scoped pricing",
  },
  {
    feature: "Timeline",
    standard: "Hours to a few days",
    development: "1-6+ weeks based on scope",
  },
  {
    feature: "Deliverables",
    standard: "Working hardware/software environment",
    development: "Live responsive website + handoff",
  },
  {
    feature: "Support style",
    standard: "On-demand fixes and maintenance",
    development: "Iterative revisions + launch support",
  },
];
