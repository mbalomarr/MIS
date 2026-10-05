/* =========================================================================
   Site configuration: names, contact details, external links and
   navigation. Layout components read from here and never hard-code them.
   ========================================================================= */

export const siteConfig = {
  name: "PMU MIS Hub",
  shortName: "MIS · PMU",
  description:
    "The hub for the Management Information Systems major at Prince Mohammad Bin Fahd University and the official website of the MIS Student Club — bridging strategic business management and innovative technology.",
  university: "Prince Mohammad Bin Fahd University",
  universityShort: "PMU",
  clubName: "MIS Club",
  tagline: "Bridging strategic business management and innovative technology.",
  contact: {
    email: "misclub@pmu.edu.sa",
    location: "Prince Mohammad Bin Fahd University, Al Khobar",
  },
  links: {
    githubRepo: "https://github.com/mbalomarr/MIS",
    instagram: "https://www.instagram.com/misclub.pmu",
    university: "https://www.pmu.edu.sa",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/** Homepage section ids — the navbar anchors and the sections share these. */
export const sectionIds = {
  hero: "hero",
  academicHub: "academic-hub",
  misClub: "mis-club",
  projects: "projects",
} as const;

/** Primary navigation — one entry per half of the platform, plus projects. */
export const mainNav: NavItem[] = [
  { label: "Academic Hub", href: `/#${sectionIds.academicHub}` },
  { label: "MIS Club", href: `/#${sectionIds.misClub}` },
  { label: "Projects", href: `/#${sectionIds.projects}` },
];

/** The call-to-action at the end of the navbar. */
export const joinLink: NavItem = { label: "Join Us", href: "/join" };

export interface FooterColumn {
  heading: string;
  links: (NavItem & { external?: boolean })[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "Academic Hub",
    links: [
      { label: "Curriculum", href: "/curriculum" },
      { label: "Resources Library", href: "/resources" },
      { label: "Certifications", href: "/certifications" },
      { label: "Career & Co-op Roadmap", href: "/career-roadmap" },
    ],
  },
  {
    heading: "MIS Club",
    links: [
      { label: "Events Calendar", href: "/events" },
      { label: "Board Members", href: "/board" },
      { label: "Digital ID Card", href: "/id-card" },
      { label: "Join Us", href: "/join" },
    ],
  },
  {
    heading: "Build",
    links: [
      { label: "Tech Projects", href: `/#${sectionIds.projects}` },
      { label: "Source on GitHub", href: siteConfig.links.githubRepo, external: true },
      { label: "PMU Website", href: siteConfig.links.university, external: true },
    ],
  },
];
