import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect, useState } from "react";

const baseUrl =
  "https://umami.castamerego.com/api/websites/e993a914-0864-4b88-a53c-75e46dc174d7/stats?startAt=1727427048000";

const headers = {
  Authorization:
    "Bearer UktYSkoOuDBHl4srL/k0/MVxuWDLt9NZIzy9kQKYAAXl6j2Jbe47OKrp1H8j3YNCXolksMtOO9l8zwb1zbyH3kAcdOaWexJF1FuHeCv18HjJ8/fikSqf62izxuQYEGFEtdx2p6ukF8OQ0S3Lap5ACdr8VGguo0qbAexF6mnURaQp7LLOK8nebcofH5oADUyrIr0JJ6MncaMgvfZBqF0FMYHMMytpxarbsMgCubeHbJWpm+kGBCvkiNoorliF5Cqbv2xrmy8gQEohNLp5lVLtXO71+mDQMWTSRWz4XVg1vkVbg5rngITVBwPDLv3jyO8qY3DXZLeJGknxNW+OdoUhaqFgH46lMEGGhg==",
};

export default function UmamiDocViewCounter() {
  const { metadata } = useDoc();
  const { permalink } = metadata;
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const [views, setViews] = useState<number | null>(null);
  const { slug } = metadata;
  const isDirectoryPage = slug.endsWith("/") || slug.endsWith("Intro");

  useEffect(() => {
    const cacheKey = `umami_views_${permalink}`;
    const timeKey = `${cacheKey}_time`;
    const cacheTime = 1000 * 60 * 5;
    const now = Date.now();

    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(timeKey);
    if (cached && cachedTime && now - parseInt(cachedTime) < cacheTime) {
      setViews(parseInt(cached));
    } else {
      setViews(null);
    }

    const fetchViews = async () => {
      const currentTime = Date.now();
      const paths = permalink.startsWith("/en/")
        ? [permalink, permalink.replace(/^\/en/, "")]
        : [permalink, "/en" + permalink];

      const requests = paths.map((path) => {
        const encodedPath = encodeURIComponent(path);
        const url = `${baseUrl}&endAt=${currentTime}&unit=month&timezone=Asia%2FShanghai&url=${encodedPath}&compare=false`;

        return fetch(url, { headers })
          .then((res) => res.json())
          .then((data) => data?.pageviews?.value ?? 0)
          .catch(() => 0);
      });

      const results = await Promise.all(requests);
      const totalViews = results.reduce((a, b) => a + b, 0);
      setViews(totalViews);
      localStorage.setItem(cacheKey, totalViews.toString());
      localStorage.setItem(timeKey, currentTime.toString());
    };

    fetchViews();
  }, [permalink]);

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
