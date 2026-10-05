export interface RepoStats {
  stars: number;
  forks: number;
  url: string;
}

const ONE_HOUR = 60 * 60;

/**
 * Live star/fork counts for a public repository ("owner/name").
 * Cached for an hour; returns null if GitHub is unreachable or rate-limited,
 * so callers can simply hide the stats instead of failing the page.
 * Set GITHUB_TOKEN to raise the API rate limit.
 */
export async function getRepoStats(repo: string): Promise<RepoStats | null> {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      next: { revalidate: ONE_HOUR },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { stargazers_count: number; forks_count: number; html_url: string };
    return { stars: data.stargazers_count, forks: data.forks_count, url: data.html_url };
  } catch {
    return null;
  }
}

export const repoUrl = (repo: string) => `https://github.com/${repo}`;
