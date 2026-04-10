const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = process.cwd();
const SEARCH_DIRS = ["blog", "docs", path.join("src", "pages")];
const SEARCH_EXTENSIONS = new Set([".md", ".mdx", ".tsx", ".jsx"]);
const SNAPSHOT_JSON_PATH = path.join(ROOT, "src", "data", "github", "repos.generated.json");
const SNAPSHOT_TS_PATH = path.join(ROOT, "src", "data", "github", "repos.generated.ts");
const GITHUB_API_BASE = "https://api.github.com/repos";

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walkDirectory(dirPath) {
  if (!(await pathExists(dirPath))) {
    return [];
  }

  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return walkDirectory(fullPath);
      }
      return SEARCH_EXTENSIONS.has(path.extname(entry.name)) ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function extractRepoUsages(content) {
  const tagRegex = /<GitHubRepo\b([\s\S]*?)\/?>/g;
  const usages = [];

  for (const match of content.matchAll(tagRegex)) {
    const attrs = match[1] ?? "";
    const ownerMatch = attrs.match(/\bowner\s*=\s*(?:"([^"]+)"|'([^']+)')/);
    const repoMatch = attrs.match(/\brepo\s*=\s*(?:"([^"]+)"|'([^']+)')/);
    const owner = ownerMatch?.[1] ?? ownerMatch?.[2];
    const repo = repoMatch?.[1] ?? repoMatch?.[2];

    if (owner && repo) {
      usages.push({ owner, repo });
    }
  }

  return usages;
}

function normalizeRepoKey(owner, repo) {
  return `${owner}/${repo}`.toLowerCase();
}

function sortObjectKeys(input) {
  return Object.fromEntries(
    Object.entries(input).sort(([left], [right]) => left.localeCompare(right)),
  );
}

async function discoverRepos() {
  const files = (
    await Promise.all(SEARCH_DIRS.map((dir) => walkDirectory(path.join(ROOT, dir))))
  ).flat();
  const repoMap = new Map();

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8");
    for (const usage of extractRepoUsages(content)) {
      repoMap.set(normalizeRepoKey(usage.owner, usage.repo), usage);
    }
  }

  return [...repoMap.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, value]) => value);
}

async function readExistingSnapshot() {
  if (!(await pathExists(SNAPSHOT_JSON_PATH))) {
    return { generatedAt: null, repos: {}, stale: [], missing: [] };
  }

  try {
    const raw = await fs.readFile(SNAPSHOT_JSON_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      generatedAt: parsed.generatedAt ?? null,
      repos: parsed.repos ?? {},
      stale: Array.isArray(parsed.stale) ? parsed.stale : [],
      missing: Array.isArray(parsed.missing) ? parsed.missing : [],
    };
  } catch (error) {
    console.warn("[github:repos] Failed to read existing snapshot, continuing with empty state.");
    console.warn(error instanceof Error ? error.message : String(error));
    return { generatedAt: null, repos: {}, stale: [], missing: [] };
  }
}

function normalizeApiResponse(json, fallbackOwner) {
  return {
    name: json.name,
    full_name: json.full_name,
    html_url: json.html_url,
    description: json.description,
    language: json.language,
    stargazers_count: json.stargazers_count,
    forks_count: json.forks_count,
    open_issues_count: json.open_issues_count,
    license: json.license
      ? { spdx_id: json.license.spdx_id, name: json.license.name }
      : null,
    owner: {
      avatar_url: json.owner?.avatar_url ?? "",
      login: json.owner?.login ?? fallbackOwner,
    },
  };
}

async function fetchRepo(owner, repo) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "castamere-site-build",
  };

  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}/${owner}/${repo}`, { headers });
  if (!response.ok) {
    const error = new Error(`GitHub API returned ${response.status} for ${owner}/${repo}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

async function buildSnapshot() {
  const discoveredRepos = await discoverRepos();
  const existingSnapshot = await readExistingSnapshot();
  const repos = {};
  const stale = [];
  const missing = [];

  for (const { owner, repo } of discoveredRepos) {
    const key = normalizeRepoKey(owner, repo);

    try {
      const json = await fetchRepo(owner, repo);
      repos[key] = normalizeApiResponse(json, owner);
      console.log(`[github:repos] fetched ${owner}/${repo}`);
    } catch (error) {
      if (existingSnapshot.repos[key]) {
        repos[key] = existingSnapshot.repos[key];
        stale.push(key);
        console.warn(`[github:repos] using stale snapshot for ${owner}/${repo}: ${error.message}`);
      } else {
        missing.push(key);
        console.warn(`[github:repos] missing snapshot for ${owner}/${repo}: ${error.message}`);
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    repos: sortObjectKeys(repos),
    stale,
    missing,
  };
}

async function writeSnapshot(snapshot) {
  const jsonContent = `${JSON.stringify(snapshot, null, 2)}\n`;
  const tsContent = [
    "const githubRepoSnapshot = ",
    `${JSON.stringify(snapshot, null, 2)} as const;`,
    "",
    "export default githubRepoSnapshot;",
    "",
  ].join("\n");

  await fs.writeFile(SNAPSHOT_JSON_PATH, jsonContent, "utf8");
  await fs.writeFile(SNAPSHOT_TS_PATH, tsContent, "utf8");
}

async function main() {
  const snapshot = await buildSnapshot();
  await writeSnapshot(snapshot);

  console.log(
    `[github:repos] wrote ${Object.keys(snapshot.repos).length} repo snapshots (${snapshot.stale.length} stale, ${snapshot.missing.length} missing).`,
  );
}

main().catch((error) => {
  console.error("[github:repos] failed to generate snapshot");
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});