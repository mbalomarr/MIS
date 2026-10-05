import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="bg-[radial-gradient(120%_90%_at_70%_10%,var(--color-ink-700)_0%,var(--color-ink-800)_45%,var(--color-ink-900)_100%)] pt-40 pb-24 text-paper">
      <Container>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-signal-500/35 bg-signal-500/10 px-3.5 py-1.5 text-xs tracking-[0.14em] text-signal-300 uppercase">
          <span className="size-2 animate-pulse-ring rounded-full bg-signal-500" aria-hidden="true" />
          {siteConfig.university}
        </p>
        <h1 className="max-w-[18ch] text-4xl text-white sm:text-5xl lg:text-6xl">
          Where <span className="text-signal-500">business strategy</span> meets{" "}
          <span className="text-signal-500">technology</span>.
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-ink-300">{siteConfig.description}</p>
      </Container>
    </section>
  );
}
