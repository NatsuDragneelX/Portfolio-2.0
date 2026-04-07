export const serviceTiers = [
  {
    id: "basic",
    name: "Basic Website",
    description:
      "A polished, fast brochure site or landing page that clearly communicates your offer.",
    priceRange: "$800 — $1,800",
    timeline: "1–2 weeks",
    bullets: [
      "Up to 3 pages",
      "Mobile-first responsive layout",
      "Contact or lead form",
      "Basic SEO metadata & social previews",
      "Deployment to Vercel/Netlify or your host",
    ],
  },
  {
    id: "standard",
    name: "Standard Website",
    description:
      "Marketing site with editable content, blog-ready structure, and room to grow.",
    priceRange: "$2,400 — $5,000",
    timeline: "3–5 weeks",
    featured: true,
    bullets: [
      "5–8 pages",
      "Headless CMS setup (Sanity, Contentful, or similar)",
      "Blog or changelog",
      "Newsletter or CRM hookup",
      "Analytics & conversion events",
      "Accessibility pass (WCAG-oriented)",
    ],
  },
  {
    id: "premium",
    name: "Premium Website",
    description:
      "High-touch build with custom visuals, motion, integrations, and performance as a feature.",
    priceRange: "$5,500+",
    timeline: "6+ weeks",
    bullets: [
      "Custom UI system & component library",
      "Subtle motion (Framer Motion / CSS)",
      "Complex integrations (payments, auth, dashboards)",
      "Edge caching & image optimization",
      "Ongoing support retainer optional",
    ],
  },
];

/** Rows for comparison table: feature key -> tier availability */
export const comparisonFeatures = [
  {
    feature: "Responsive pages",
    basic: true,
    standard: true,
    premium: true,
  },
  {
    feature: "Contact / lead capture",
    basic: true,
    standard: true,
    premium: true,
  },
  {
    feature: "CMS & editable content",
    basic: false,
    standard: true,
    premium: true,
  },
  {
    feature: "Blog / news",
    basic: false,
    standard: true,
    premium: true,
  },
  {
    feature: "Custom design system",
    basic: false,
    standard: "Partial",
    premium: true,
  },
  {
    feature: "Advanced motion & polish",
    basic: false,
    standard: "Light",
    premium: true,
  },
  {
    feature: "Third-party APIs & auth",
    basic: false,
    standard: "Add-on",
    premium: true,
  },
];
