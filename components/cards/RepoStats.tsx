import { GitFork, Star } from "lucide-react";
import { getRepoStats } from "@/lib/github";

/** Live star and fork counts for a repository. Renders nothing if GitHub can't be reached. */
export async function RepoStats({ repo }: { repo: string }) {
  const stats = await getRepoStats(repo);
  if (!stats) return null;

  const items = [
    { icon: Star, value: stats.stars, label: stats.stars === 1 ? "star" : "stars" },
    { icon: GitFork, value: stats.forks, label: stats.forks === 1 ? "fork" : "forks" },
  ];

  return (
    <ul className="flex items-center gap-4 text-sm text-ink-300" aria-label="Repository stats">
      {items.map(({ icon: Icon, value, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5 tabular-nums">
          <Icon size={15} aria-hidden="true" />
          {value}
          <span className="sr-only">{label}</span>
        </li>
      ))}
    </ul>
  );
}
