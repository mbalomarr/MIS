import { Container } from "./Container";
import { NetworkBackdrop } from "./NetworkBackdrop";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Compact dark banner that opens every inner page, so the transparent navbar always sits on a dark surface. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-[radial-gradient(120%_140%_at_70%_0%,var(--color-ink-700)_0%,var(--color-ink-800)_50%,var(--color-ink-900)_100%)] pt-36 pb-16 text-paper lg:pt-44 lg:pb-20">
      <NetworkBackdrop idPrefix="page-hero" className="opacity-55" />
      <Container className="relative">
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-signal-300 uppercase">{eyebrow}</p>
        <h1 className="max-w-[22ch] text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-[56ch] text-lg text-ink-300">{description}</p>}
      </Container>
    </header>
  );
}
