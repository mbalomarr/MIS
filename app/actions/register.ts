"use server";

import { z } from "zod";
import { registrationSchema, type RegistrationField } from "@/lib/validations/registration";

export type RegisterResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<RegistrationField, string>> };

const SUCCESS_MESSAGE = "You're registered! Watch your PMU inbox for the welcome email and group link.";

/**
 * Registers a student for the MIS Club.
 * Validates on the server with the same Zod schema the form uses — browser
 * validation is a convenience, not a security boundary.
 * Database insertion is wired up in a later phase; for now the validated
 * data is logged and a success state is returned.
 */
export async function registerMember(input: unknown): Promise<RegisterResult> {
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    // A filled honeypot means a bot: report success and drop the submission.
    const honeypotTripped = parsed.error.issues.some((issue) => issue.path[0] === "website");
    if (honeypotTripped) return { ok: true, message: SUCCESS_MESSAGE };

    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as Partial<Record<RegistrationField, string>>,
    };
  }

  const { fullName, pmuId, major, email, githubHandle } = parsed.data;
  const member = { fullName, pmuId, major, email, githubHandle };
  console.info("[register] validated registration:", member);

  return { ok: true, message: SUCCESS_MESSAGE };
}
