import type { Project } from "@/types/content";

/* Open-source projects shown on the homepage. Projects with a `repo` get live GitHub stats. */

export const projectsShowcase = {
  eyebrow: "Open Source",
  title: "We build in the open.",
  description:
    "Club projects live on GitHub — read the code, open an issue, or send a pull request. Every contribution is a portfolio piece.",
};

export const projects: Project[] = [
  {
    title: "MIS Club Portal",
    description:
      "This website: the hub for the MIS major and the MIS Club, built with the Next.js App Router, TypeScript and Tailwind CSS.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    status: "live",
    repo: "mbalomarr/MIS",
  },
  {
    title: "QR Attendance System",
    description:
      "Event check-in by scanning a signed QR code, so attendance is recorded in seconds and can't be faked with a copied link.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    status: "planned",
  },
  {
    title: "Digital Member ID",
    description:
      "A digital membership card for every registered member, used for event check-in and priority registration.",
    stack: ["Next.js", "Tailwind", "Prisma"],
    status: "planned",
  },
];
