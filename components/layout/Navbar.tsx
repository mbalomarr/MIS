"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useScrolled } from "@/hooks/use-scrolled";
import { joinLink, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubLink } from "./GitHubLink";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

const MENU_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Fixed site header. Transparent over the dark page banners, frosted paper
 * once scrolled (or while the mobile menu is open). Children style
 * themselves from the `data-solid` attribute via `group/header`.
 */
export function Navbar() {
  const isScrolled = useScrolled();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isSolid = isScrolled || isMenuOpen;

  const closeMenu = () => setMenuOpen(false);

  // While the mobile menu is open: lock page scroll, close on Escape,
  // and close if the viewport grows to the desktop layout.
  useEffect(() => {
    if (!isMenuOpen) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [isMenuOpen]);

  return (
    <header
      data-solid={isSolid}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-50 border-b [--header-h:76px] lg:[--header-h:84px]",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-brand",
        isSolid
          ? "border-paper-200 bg-paper/90 shadow-hairline backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav aria-label="Primary" className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo onClick={closeMenu} />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
            <li className="ml-2">
              <GitHubLink
                className={cn(
                  "border-paper/30 text-paper hover:border-signal-300 hover:text-signal-300",
                  "group-data-[solid=true]/header:border-paper-200 group-data-[solid=true]/header:text-ink-800",
                  "group-data-[solid=true]/header:hover:border-ink-800",
                )}
              />
            </li>
            <li className="ml-3">
              <Link
                href={joinLink.href}
                className="inline-flex items-center rounded-full bg-signal-500 px-5 py-2.5 text-sm font-semibold text-ink-900 transition duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-glow"
              >
                {joinLink.label}
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "grid size-11 place-items-center rounded-lg border lg:hidden",
              "border-paper/30 text-paper",
              "group-data-[solid=true]/header:border-paper-200 group-data-[solid=true]/header:text-ink-800",
            )}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </nav>
      </Container>

      <MobileMenu id={MENU_ID} isOpen={isMenuOpen} onNavigate={closeMenu} />
    </header>
  );
}
