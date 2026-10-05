import type { LucideIcon } from "lucide-react";

export interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional tool chips shown under the description (e.g. Python, C#, SQL) */
  tools?: string[];
}

export type EventType = "bootcamp" | "talk" | "competition";

export interface ClubEvent {
  /** ISO date, YYYY-MM-DD */
  date: string;
  type: EventType;
  title: string;
  description: string;
  location: string;
  time: string;
  capacity: string;
}

export type ProjectStatus = "live" | "in-progress" | "planned";

export interface Project {
  title: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  /** "owner/name" on GitHub. Omitted for projects that have no repository yet. */
  repo?: string;
}
