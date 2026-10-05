"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { registerMember } from "@/app/actions/register";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  MAJORS,
  PMU_EMAIL_DOMAIN,
  registrationSchema,
  type RegistrationData,
  type RegistrationField,
  type RegistrationInput,
} from "@/lib/validations/registration";
import { FormField } from "./FormField";

const EMPTY_FORM: RegistrationInput = {
  fullName: "",
  pmuId: "",
  major: "" as RegistrationInput["major"],
  email: "",
  githubHandle: "",
  website: "",
};

/** MIS Club registration form: validated in the browser, then again by the server action. */
export function JoinForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput, unknown, RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: EMPTY_FORM,
    mode: "onTouched",
  });

  async function onSubmit(data: RegistrationData) {
    setServerError(null);
    try {
      const result = await registerMember(data);
      if (result.ok) {
        setSuccessMessage(result.message);
        reset(EMPTY_FORM);
        return;
      }
      setServerError(result.message);
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        if (message) setError(field as RegistrationField, { message }, { shouldFocus: true });
      }
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (successMessage) {
    return (
      <div role="status" className="rounded-panel bg-white p-8 text-center shadow-float sm:p-10">
        <CheckCircle2 size={48} className="mx-auto mb-4 text-success" aria-hidden="true" />
        <h2 className="mb-2 text-2xl text-ink-800">Welcome to the MIS Hub!</h2>
        <p className="mb-6 text-ink-400">Your Digital ID is being generated.</p>
        <button
          type="button"
          onClick={() => setSuccessMessage(null)}
          className="text-sm font-semibold text-signal-700 underline-offset-4 hover:underline"
        >
          Register another student
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="join-form-title"
      className="relative rounded-panel bg-white p-6 shadow-float sm:p-10"
    >
      <h2 id="join-form-title" className="mb-6 border-b border-paper-200 pb-4 text-2xl text-ink-800">
        Member Registration
      </h2>

      <div className="grid gap-2">
        <FormField id="fullName" label="Full name" required error={errors.fullName?.message}>
          <Input autoComplete="name" placeholder="e.g. Mohammed Alomar" maxLength={120} {...register("fullName")} />
        </FormField>

        <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          <FormField id="pmuId" label="PMU Student ID" required error={errors.pmuId?.message}>
            <Input inputMode="numeric" autoComplete="off" placeholder="e.g. 202012345" maxLength={10} {...register("pmuId")} />
          </FormField>

          <FormField id="major" label="Major" required error={errors.major?.message}>
            <Select options={MAJORS} placeholder="Select your major" {...register("major")} />
          </FormField>
        </div>

        <FormField
          id="email"
          label="PMU email"
          required
          hint={`Must end in ${PMU_EMAIL_DOMAIN}`}
          error={errors.email?.message}
        >
          <Input type="email" autoComplete="email" placeholder={`you${PMU_EMAIL_DOMAIN}`} maxLength={180} {...register("email")} />
        </FormField>

        <FormField
          id="githubHandle"
          label="GitHub username"
          hint="Lets us credit your work in the projects showcase."
          error={errors.githubHandle?.message}
        >
          <Input autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="e.g. octocat" maxLength={40} {...register("githubHandle")} />
        </FormField>
      </div>

      {/* Honeypot: off-screen for people, tempting for bots. */}
      <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal-500 px-8 py-4 font-semibold text-ink-900 transition duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-glow disabled:pointer-events-none disabled:opacity-75"
      >
        {isSubmitting && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isSubmitting ? "Submitting…" : "Submit Registration"}
      </button>

      <p role="alert" className="mt-4 min-h-5 text-sm font-medium text-danger">
        {serverError}
      </p>
      <p className="text-xs text-ink-400">By registering you agree to receive club announcements at your PMU email.</p>
    </form>
  );
}
