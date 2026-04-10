import githubRepoSnapshot from "@site/src/data/github/repos.generated";

export interface GitHubRepoData {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: { spdx_id: string; name: string } | null;
  owner: { avatar_url: string; login: string };
}

export interface GitHubRepoSnapshot {
  generatedAt: string;
  repos: Record<string, GitHubRepoData>;
  stale: string[];
  missing: string[];
}

const snapshot = githubRepoSnapshot as GitHubRepoSnapshot;

export function getGitHubRepoKey(owner: string, repo: string) {
  return `${owner}/${repo}`.toLowerCase();
}

export function getGitHubRepoData(owner: string, repo: string) {
  return snapshot.repos[getGitHubRepoKey(owner, repo)] ?? null;
}

export function getGitHubRepoSnapshot() {
  return snapshot;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Lua: "#000080",
  Scala: "#c22d40",
  MDX: "#fcb32c",
};

export function formatNumber(n: number): string {
  if (n >= 1000) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return String(n);
}
