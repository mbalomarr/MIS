import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tones carried over from the original .tag--* styles, plus neutral variants for dark surfaces. */
const tones = {
  bootcamp: "bg-signal-100 text-signal-700",
  talk: "bg-[#e7ecf3] text-ink-600",
  competition: "bg-[#ffe9d6] text-[#a15a16]",
  neutral: "bg-paper-200 text-ink-600",
  onDark: "border border-paper/15 bg-paper/5 text-ink-300",
  live: "bg-success/15 text-[#4fd1a0]",
  progress: "bg-signal-500/15 text-signal-300",
  muted: "bg-paper/10 text-ink-300",
} as const;

export type BadgeTone = keyof typeof tones;

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

/** Small uppercase label for event types, statuses and tech stacks. */
export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.06em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
