import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { localePair } from "./localePair";
import { useUmamiStats } from "./useUmamiStats";

export default function UmamiPageViewCounter() {
  const { metadata } = useBlogPost();
  const { permalink } = metadata;
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const { views, error } = useUmamiStats({
    paths: localePair(permalink),
    cacheKey: permalink,
  });

  if (error) return null;

  if (views == null)
    return (
      <span className="tailwind flex items-center">
        <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
      </span>
    );

  return currentLocale === "en" ? <>{views} views</> : <>{views} 次阅读</>;
}
