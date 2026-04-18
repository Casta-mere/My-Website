import Translate from "@docusaurus/Translate";
import React, { useCallback, useRef } from "react";
import { FaBalanceScale, FaCodeBranch, FaGithub, FaStar } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import styles from "./styles.module.css";
import {
  LANGUAGE_COLORS,
  formatNumber,
  getGitHubRepoData,
} from "./useGitHubRepo";

// ─── Helpers ─────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  return <>{formatNumber(value)}</>;
}

// ─── Main component ──────────────────────────────────────────

interface GitHubRepoProps {
  owner: string;
  repo: string;
}

export default function GitHubRepo({ owner, repo }: GitHubRepoProps) {
  const data = getGitHubRepoData(owner, repo);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (glareRef.current) {
      glareRef.current.style.setProperty(
        "--glare-x",
        `${(x / rect.width) * 100}%`,
      );
      glareRef.current.style.setProperty(
        "--glare-y",
        `${(y / rect.height) * 100}%`,
      );
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  if (!data) {
    const repoUrl = `https://github.com/${owner}/${repo}`;
    return (
      <div className={`tailwind ${styles.wrapper}`}>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline block"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.card}>
            <div className={styles.content}>
              <div className="flex items-center gap-2 mb-2">
                <FaGithub className={styles.repoIcon} />
                <span className={styles.ownerText}>{owner} /</span>
                <span className={styles.repoName}>{repo}</span>
              </div>

              <p className={styles.description}>
                <Translate>仓库信息暂不可用，点击前往 GitHub 查看</Translate>
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }

  const ownerLogin = data.owner?.login ?? data.full_name?.split("/")[0] ?? "";
  const langColor = data.language
    ? LANGUAGE_COLORS[data.language] || "#6b7280"
    : null;

  return (
    <div className={`tailwind ${styles.wrapper}`}>
      <a
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline block"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div
          ref={cardRef}
          className={styles.card}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={glareRef} className={styles.glare} />
          <div className={styles.content}>
            <div className="flex items-center gap-2 mb-2">
              <FaGithub className={styles.repoIcon} />
              <span className={styles.ownerText}>{ownerLogin} /</span>
              <span className={styles.repoName}>{data.name}</span>
            </div>

            {data.description && (
              <p className={`${styles.description} line-clamp-2`}>
                {data.description}
              </p>
            )}

            <div className={styles.metaRow}>
              {data.language && langColor && (
                <span className="flex items-center gap-1.5">
                  <span
                    className={styles.glowDot}
                    style={
                      {
                        backgroundColor: langColor,
                        "--glow-color": langColor,
                      } as React.CSSProperties
                    }
                  />
                  {data.language}
                </span>
              )}
              <span className={styles.metaItem}>
                <FaStar className="text-yellow-500" />
                <AnimatedNumber value={data.stargazers_count} />
              </span>
              <span className={styles.metaItem}>
                <FaCodeBranch />
                <AnimatedNumber value={data.forks_count} />
              </span>
              <span className={styles.metaItem}>
                <VscIssues />
                <AnimatedNumber value={data.open_issues_count} />
              </span>
              {data.license && (
                <span className={styles.metaItem}>
                  <FaBalanceScale />
                  {data.license.spdx_id}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
