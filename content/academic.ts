import { Code2, GraduationCap, LayoutGrid } from "lucide-react";
import type { Pillar } from "@/types/content";

/* Core pillars of the MIS major — adapted from the "Who We Are" cards in the original index.html. */

export const academicHub = {
  eyebrow: "The Academic Hub",
  title: "A major for people who want to understand the business and build the system.",
  description:
    "Management Information Systems sits exactly between two worlds. MIS students learn to translate messy business problems into clean technical specifications — and then ship the solution.",
};

export const pillars: Pillar[] = [
  {
    icon: LayoutGrid,
    title: "System Analysis & Product",
    description:
      "Requirement gathering, user stories, and turning business needs into technical specs — practiced on real platforms and marketplaces, not textbook exercises.",
  },
  {
    icon: Code2,
    title: "Technical Skills & Tools",
    description:
      "Business automation, database design, AI agents and conversational bots, plus network fundamentals in Cisco Packet Tracer.",
    tools: ["Python", "C#", "SQL", "MySQL"],
  },
  {
    icon: GraduationCap,
    title: "Career Readiness",
    description:
      "Co-op and internship preparation for competitive roles in regional tech and energy companies, professional branding, and guest sessions with working alumni.",
  },
];
