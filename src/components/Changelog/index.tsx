import React, { useEffect } from "react";
import styles from "./styles.module.css";

interface ChangelogEnhancerProps {
  children: React.ReactNode;
}

const SYSTEM_KEYWORDS = ["添加", "重构", "修复", "更新", "优化", "添加"];

const DOCUSAURUS_KEYWORDS = ["建站", "更新 Docusaurus"];
const CONTENT_KEYWORDS = ["添加 博客", "添加 系列文章"];
const FRIEND_KEYWORD = "添加 友链";

function getItemType(
  text: string
): "system" | "content" | "normal" | "friend" | "docusaurus" {
  for (const keyword of CONTENT_KEYWORDS) {
    if (text.includes(keyword)) {
      return "content";
    }
  }

  if (text.includes(FRIEND_KEYWORD)) {
    return "friend";
  }

  for (const keyword of DOCUSAURUS_KEYWORDS) {
    if (text.includes(keyword)) {
      return "docusaurus";
    }
  }

  for (const keyword of SYSTEM_KEYWORDS) {
    if (text.includes(keyword)) {
      return "system";
    }
  }

  return "normal";
}

export default function Changelog({ children }: ChangelogEnhancerProps) {
  useEffect(() => {
    const listItems = document.querySelectorAll(`.${styles.changelogPage} li`);

    listItems.forEach((item) => {
      const text = item.textContent || "";
      const type = getItemType(text);
      const emojiSpan = document.createElement("span");

      if (type === "system") {
        item.classList.add(styles.changelogItemSystem);
        emojiSpan.textContent = "🛠️";
      } else if (type === "content") {
        item.classList.add(styles.changelogItemContent);
        emojiSpan.textContent = "✒️";
      } else if (type === "friend") {
        item.classList.add(styles.changelogItemFriend);
        emojiSpan.textContent = "🤝";
      } else if (type === "docusaurus") {
        item.classList.add(styles.changelogItemDocusaurus);
        emojiSpan.textContent = "⚙️";
      }
      item.insertBefore(emojiSpan, item.firstChild);
    });
  }, []);

  return <div className={styles.changelogPage}>{children}</div>;
}
