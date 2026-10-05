import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-signal-500 text-ink-900 hover:shadow-glow",
  ghost: "border border-paper/35 text-white hover:bg-paper/10",
  outline: "border border-paper-200 text-ink-800 hover:border-ink-800",
  dark: "bg-ink-800 text-white hover:bg-ink-700 hover:shadow-lift",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
}

/** A link styled as a pill button — every call to action on the site. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition duration-300 ease-brand hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
