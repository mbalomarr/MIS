"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { joinLink, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubLink } from "./GitHubLink";

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
}

/** Slide-down navigation panel shown below the header on small screens. */
export function MobileMenu({ id, isOpen, onNavigate }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      id={id}
      className={cn(
        "fixed inset-x-0 top-[var(--header-h)] max-h-[calc(100svh-var(--header-h))] overflow-y-auto lg:hidden",
        "border-b border-paper-200 bg-paper p-6 shadow-lift",
        "transition-[opacity,transform,visibility] duration-300 ease-brand",
        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
      )}
    >
      <ul className="grid gap-1">
        {mainNav.map(({ label, href }) => {
          const isCurrent = !href.includes("#") && pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-2 py-3 text-lg font-medium text-ink-800 hover:text-signal-700",
                  isCurrent && "font-semibold text-signal-700",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <GitHubLink
            variant="full"
            onClick={onNavigate}
            className="w-full rounded-lg px-2 py-3 text-lg font-medium text-ink-800 hover:text-signal-700"
          />
        </li>
      </ul>
      <Link
        href={joinLink.href}
        onClick={onNavigate}
        className="mt-4 flex w-full items-center justify-center rounded-full bg-signal-500 px-6 py-3 font-semibold text-ink-900 transition hover:shadow-glow"
      >
        {joinLink.label}
      </Link>
    </div>
  );
}
