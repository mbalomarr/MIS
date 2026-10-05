import { z } from "zod";

/* =========================================================================
   Registration rules — one schema shared by the browser form (instant
   feedback via react-hook-form) and the server action (the real gate).
   ========================================================================= */

export const MAJORS = [
  "Management Information Systems",
  "Accounting",
  "Finance",
  "Business Administration",
  "Marketing",
  "Computer Science",
  "Computer Engineering",
  "Law",
  "Interior Design",
  "Other",
] as const;

export const PMU_EMAIL_DOMAIN = "@pmu.edu.sa";

/** GitHub usernames: 1–39 chars, letters/digits/single hyphens, no leading or trailing hyphen. */
const GITHUB_HANDLE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Please enter your full name.")
    .max(120, "Name is too long.")
    .refine((name) => /\s/.test(name), "Please include your first and last name."),

  pmuId: z
    .string()
    .trim()
    .regex(/^\d{9,10}$/, "Your PMU Student ID should be 9 or 10 digits."),

  major: z.enum(MAJORS, { error: "Select your major." }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Please enter a valid email address."))
    .refine((email) => email.endsWith(PMU_EMAIL_DOMAIN), `Use your PMU email (${PMU_EMAIL_DOMAIN}).`),

  githubHandle: z
    .string()
    .trim()
    .transform((handle) => handle.replace(/^@/, ""))
    .refine((handle) => handle === "" || GITHUB_HANDLE.test(handle), "That doesn't look like a GitHub username.")
    .transform((handle) => handle || undefined)
    .optional(),

  /** Honeypot: hidden from people, filled by bots. Must stay empty. */
  website: z.string().max(0).optional(),
});

/** What the form holds while the user types (before trimming/transforms). */
export type RegistrationInput = z.input<typeof registrationSchema>;
/** What the server receives after validation. */
export type RegistrationData = z.output<typeof registrationSchema>;

export type RegistrationField = Exclude<keyof RegistrationInput, "website">;
