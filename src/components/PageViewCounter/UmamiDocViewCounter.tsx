import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { localePair } from "./localePair";
import { useUmamiStats } from "./useUmamiStats";

export default function UmamiDocViewCounter() {
  const { metadata } = useDoc();
  const { permalink } = metadata;
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const { slug } = metadata;
  const isDirectoryPage = slug.endsWith("/") || slug.endsWith("Intro");
  const { views, error } = useUmamiStats({
    paths: localePair(permalink),
    cacheKey: permalink,
  });

  if (error) return null;

  return (
    <div className="tailwind">
      <div className="flex justify-end items-center mt-6">
        {views == null ? (
          <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
        ) : currentLocale === "en" ? (
          isDirectoryPage ? (
            <>This page has been viewed {views.toLocaleString()} times</>
          ) : (
            <>This article has been viewed {views.toLocaleString()} times</>
          )
        ) : isDirectoryPage ? (
          <>该页面已被访问 {views.toLocaleString()} 次</>
        ) : (
          <>本文已被阅读 {views.toLocaleString()} 次</>
        )}
      </div>
    </div>
  );
}
