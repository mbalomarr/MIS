import { PillarCard } from "@/components/cards/PillarCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academicHub, pillars } from "@/content/academic";
import { sectionIds } from "@/lib/site";

/** The MIS major and its three core pillars, on the light Paper surface. */
export function AcademicHub() {
  return (
    <section id={sectionIds.academicHub} aria-labelledby="academic-hub-title" className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="academic-hub-title"
          eyebrow={academicHub.eyebrow}
          title={academicHub.title}
          description={academicHub.description}
        />

        <ul className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <PillarCard {...pillar} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
