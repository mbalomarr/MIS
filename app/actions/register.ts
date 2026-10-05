"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { registrationSchema, type RegistrationField } from "@/lib/validations/registration";

type FieldErrors = Partial<Record<RegistrationField, string>>;

export type RegisterResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: FieldErrors };

const SUCCESS_MESSAGE = "Welcome to the MIS Hub! Your Digital ID is being generated.";

const DUPLICATE_ERRORS = {
  pmuId: "This PMU Student ID is already registered.",
  email: "This email is already registered.",
} as const;

/** Which unique fields of `pmuId` / `email` already belong to a member. */
async function findDuplicates(pmuId: string, email: string): Promise<FieldErrors> {
  const existing = await prisma.user.findMany({
    where: { OR: [{ pmuId }, { email }] },
    select: { pmuId: true, email: true },
  });
  return {
    ...(existing.some((user) => user.pmuId === pmuId) && { pmuId: DUPLICATE_ERRORS.pmuId }),
    ...(existing.some((user) => user.email === email) && { email: DUPLICATE_ERRORS.email }),
  };
}

const isUniqueViolation = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";

/**
 * Registers a student for the MIS Club and saves them to the database.
 * Validates on the server with the same Zod schema the form uses — browser
 * validation is a convenience, not a security boundary.
 */
export async function registerMember(input: unknown): Promise<RegisterResult> {
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    // A filled honeypot means a bot: report success and save nothing.
    const honeypotTripped = parsed.error.issues.some((issue) => issue.path[0] === "website");
    if (honeypotTripped) return { ok: true, message: SUCCESS_MESSAGE };

    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as FieldErrors,
    };
  }

  const { fullName, pmuId, major, email, githubHandle } = parsed.data;

  try {
    // Check first so the form can point at the exact field that is taken.
    const duplicates = await findDuplicates(pmuId, email);
    if (Object.keys(duplicates).length > 0) {
      return { ok: false, message: "You may already be a member.", fieldErrors: duplicates };
    }

    await prisma.user.create({
      data: {
        fullName,
        pmuId,
        major,
        email,
        githubHandle: githubHandle ?? null,
        qrCodeHash: randomUUID(),
      },
    });

    return { ok: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    // Two submissions racing past the duplicate check: the unique index catches it.
    if (isUniqueViolation(error)) {
      return {
        ok: false,
        message: "You may already be a member.",
        fieldErrors: await findDuplicates(pmuId, email).catch(() => ({})),
      };
    }
    console.error("[register] failed to save member:", error);
    return { ok: false, message: "We couldn't save your registration right now. Please try again in a moment." };
  }
}
