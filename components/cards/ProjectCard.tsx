import { ArrowUpRight } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { repoUrl } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import type { Project, ProjectStatus } from "@/types/content";
import { RepoStats } from "./RepoStats";

const STATUS: Record<ProjectStatus, { label: string; tone: BadgeTone }> = {
  live: { label: "Live", tone: "live" },
  "in-progress": { label: "In progress", tone: "progress" },
  planned: { label: "Planned", tone: "muted" },
};

/**
 * An open-source project on a dark surface: GitHub repo header, status,
 * tech stack, live stars/forks and a link to the code. Projects without a
 * repository yet link to the main repo so people can follow progress.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { title, description, stack, status, repo } = project;
  const href = repo ? repoUrl(repo) : siteConfig.links.githubRepo;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-panel border border-paper/10 bg-ink-700/40 transition duration-300 ease-brand hover:-translate-y-1 hover:border-signal-500/50 hover:shadow-float">
      <header className="flex items-center justify-between gap-3 border-b border-paper/10 bg-ink-900/60 px-6 py-4">
        <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-ink-300">
          <GitHubIcon size={18} className="shrink-0 text-white" />
          <span className="truncate">{repo ?? "coming soon"}</span>
        </span>
        <Badge tone={STATUS[status].tone}>{STATUS[status].label}</Badge>
      </header>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl text-white">{title}</h3>
        <p className="mb-6 flex-1 text-sm text-ink-300">{description}</p>

        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {stack.map((tech) => (
            <li key={tech}>
              <Badge tone="onDark" className="font-mono normal-case tracking-normal">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-5">
          {repo ? <RepoStats repo={repo} /> : <span className="text-sm text-ink-400">Repository opens with the first release</span>}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-300 transition-colors hover:text-white"
          >
            {repo ? "View code" : "Follow progress"}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">: {title} on GitHub (opens in a new tab)</span>
          </a>
        </footer>
      </div>
    </article>
  );
}
