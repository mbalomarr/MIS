import type { ClubEvent } from "@/types/content";

/* Club activities — taken from the "Coming up next" list in the original index.html. */

export const clubCommunity = {
  eyebrow: "The MIS Club",
  title: "Workshops, talks and hackathons — run by students, for every major.",
  description:
    "The MIS Club turns the major into practice. Membership is free and open to every student on campus; members get priority seats at every session.",
};

export const events: ClubEvent[] = [
  {
    date: "2026-09-24",
    type: "bootcamp",
    title: "Python for Business Automation — Day 1",
    description:
      "Hands-on session automating administrative workflows: reading spreadsheets, generating reports and scheduling scripts. No prior coding required.",
    location: "Building 5 · Lab 204",
    time: "4:00 – 7:00 PM",
    capacity: "30 seats",
  },
  {
    date: "2026-10-02",
    type: "talk",
    title: "Inside an ERP Rollout: Lessons from the Field",
    description:
      "An alumnus working in IT consulting walks through a real enterprise system implementation — the requirements, the resistance, and what actually shipped.",
    location: "Main Auditorium",
    time: "6:00 – 7:30 PM",
    capacity: "Open to all majors",
  },
  {
    date: "2026-10-15",
    type: "bootcamp",
    title: "Database Design & MySQL Workshop",
    description:
      "From ER diagram to working schema. Normalisation, keys, indexes and writing the queries that answer real business questions.",
    location: "Building 5 · Lab 204",
    time: "4:00 – 7:00 PM",
    capacity: "30 seats",
  },
];
