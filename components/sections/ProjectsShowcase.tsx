import { ProjectCard } from "@/components/cards/ProjectCard";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { NetworkBackdrop } from "@/components/ui/NetworkBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectsShowcase } from "@/content/projects";
import { sectionIds, siteConfig } from "@/lib/site";

/** Dark open-source section: project cards with live GitHub stats. */
export function ProjectsShowcase() {
  return (
    <section
      id={sectionIds.projects}
      aria-labelledby="projects-title"
      className="relative overflow-hidden bg-ink-900 py-16 text-paper sm:py-24"
    >
      <NetworkBackdrop idPrefix="projects" className="opacity-40" />

      <Container className="relative">
        <SectionHeading
          id="projects-title"
          onDark
          eyebrow={projectsShowcase.eyebrow}
          title={projectsShowcase.title}
          description={projectsShowcase.description}
          action={
            <ButtonLink href={siteConfig.links.githubRepo} external variant="ghost">
              <GitHubIcon size={18} />
              View on GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          }
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
