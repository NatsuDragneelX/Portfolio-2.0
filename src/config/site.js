export const site = {
  name: "Shivam Patel",
  role: "Software Developer / Technician",
  title: "Shivam Patel — Software Developer & Technician",
  tagline:
    "Building intuitive software, solving real-world problems, and crafting smooth digital experiences.",
  description:
    "Building intuitive software, solving real-world problems, and crafting smooth digital experiences.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://patelshivam.org",
  email: "patelshivam1175@gmail.com", 
  github: "https://github.com/NatsuDragneelX",
  linkedin: "https://www.linkedin.com/in/shivam-patel-0989b2330",
  locale: "en_US",
};

/** Top-level routes (no hash links). */
export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/games", label: "Games" },
];
