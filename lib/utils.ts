import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines class names and resolves Tailwind conflicts: cn("px-4", isWide && "px-8") → "px-8". */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
