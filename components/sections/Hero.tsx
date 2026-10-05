import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { NetworkBackdrop } from "@/components/ui/NetworkBackdrop";
import { joinLink, sectionIds, siteConfig } from "@/lib/site";

/** Full-height dark hero introducing the MIS Hub. The transparent navbar sits on top of it. */
export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center overflow-hidden bg-[radial-gradient(120%_90%_at_70%_10%,var(--color-ink-700)_0%,var(--color-ink-800)_45%,var(--color-ink-900)_100%)] pt-36 pb-24 text-paper"
    >
      <NetworkBackdrop idPrefix="hero" />

      <div className="relative w-full">
        <Container>
          <p className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-signal-500/35 bg-signal-500/10 py-1.5 pr-3.5 pl-3 text-xs tracking-[0.14em] text-signal-300 uppercase">
            <span className="size-2 animate-pulse-ring rounded-full bg-signal-500" aria-hidden="true" />
            MIS Hub · {siteConfig.university}
          </p>

          <h1
            id="hero-title"
            className="max-w-[16ch] animate-fade-up text-4xl text-white [animation-delay:80ms] sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            Where <span className="text-signal-500">business strategy</span> meets{" "}
            <span className="text-signal-500">building things</span>.
          </h1>

          <p className="mt-6 max-w-[58ch] animate-fade-up text-lg text-ink-300 [animation-delay:160ms] xl:text-xl">
            The MIS Hub at {siteConfig.universityShort} bridges the gap between management and innovative technology —
            one home for the Management Information Systems major and the MIS Club, where students learn how
            organisations work and build the systems that run them.
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href={`#${sectionIds.academicHub}`} size="lg">
              Explore the Major
            </ButtonLink>
            <ButtonLink href={joinLink.href} variant="ghost" size="lg">
              Join the Club
            </ButtonLink>
          </div>
        </Container>
      </div>

      <a
        href={`#${sectionIds.academicHub}`}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-label="Scroll to the Academic Hub"
      >
        <span
          className="block h-12 w-px animate-scroll-cue bg-gradient-to-b from-transparent to-signal-500"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
