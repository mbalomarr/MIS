import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

/** Shared look for text inputs and selects, including the invalid state. */
export const fieldControlClass = cn(
  "w-full rounded-lg border border-paper-200 bg-white px-3.5 py-3 text-sm text-ink-800",
  "placeholder:text-ink-300 transition-[border-color,box-shadow] duration-300 ease-brand",
  "focus:border-signal-500 focus:shadow-[0_0_0_3px_rgb(47_184_198/0.18)] focus:outline-none",
  "aria-invalid:border-danger aria-invalid:shadow-[0_0_0_3px_rgb(214_69_69/0.14)]",
);

export function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
  return <input className={cn(fieldControlClass, className)} {...props} />;
}
