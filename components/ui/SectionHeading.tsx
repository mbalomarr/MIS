import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** id for the <h2>, so the parent <section> can point aria-labelledby at it */
  id: string;
  /** Light text for dark sections */
  onDark?: boolean;
  /** Optional element aligned right on wide screens (a link or button) */
  action?: ReactNode;
}

/** Eyebrow + title + lead paragraph that opens every homepage section. */
export function SectionHeading({ eyebrow, title, description, id, onDark = false, action }: SectionHeadingProps) {
  return (
    <header className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
      <div className="max-w-3xl">
        <p
          className={cn(
            "mb-3 text-sm font-medium tracking-[0.18em] uppercase",
            onDark ? "text-signal-300" : "text-signal-700",
          )}
        >
          {eyebrow}
        </p>
        <h2 id={id} className={cn("text-3xl sm:text-4xl lg:text-[2.5rem]", onDark ? "text-white" : "text-ink-800")}>
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-[1.0625rem]", onDark ? "text-ink-300" : "text-ink-400")}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
