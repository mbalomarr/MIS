import { GitHubIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface GitHubLinkProps {
  /** "icon" = round icon button, "full" = icon + "GitHub" label */
  variant?: "icon" | "full";
  className?: string;
  onClick?: () => void;
}

/** Link to the project's GitHub repository, opening in a new tab. */
export function GitHubLink({ variant = "icon", className, onClick }: GitHubLinkProps) {
  return (
    <a
      href={siteConfig.links.githubRepo}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 transition-colors duration-300 ease-brand",
        variant === "icon" && "size-10 justify-center rounded-full border",
        className,
      )}
    >
      <GitHubIcon size={20} />
      {variant === "full" ? <span>GitHub</span> : <span className="sr-only">GitHub</span>}
      <span className="sr-only"> repository (opens in a new tab)</span>
    </a>
  );
}
