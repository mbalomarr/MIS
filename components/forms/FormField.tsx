import type { ReactElement } from "react";
import { cloneElement } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** The control (Input / Select). It receives id and aria wiring automatically. */
  children: ReactElement<Record<string, unknown>>;
}

/** Label + control + hint + error message, connected with ids for screen readers. */
export function FormField({ id, label, required = false, hint, error, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-800">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-400"> (optional)</span>
        )}
      </label>

      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })}

      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-400">
          {hint}
        </p>
      )}
      <p id={errorId} className="mt-1.5 min-h-4 text-xs text-danger">
        {error}
      </p>
    </div>
  );
}
