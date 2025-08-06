import React, { useEffect, useState } from "react";

const baseUrl =
  "https://umami.castamerego.com/api/websites/e993a914-0864-4b88-a53c-75e46dc174d7/stats?startAt=1727427048000";

const headers = {
  Authorization:
    "Bearer UktYSkoOuDBHl4srL/k0/MVxuWDLt9NZIzy9kQKYAAXl6j2Jbe47OKrp1H8j3YNCXolksMtOO9l8zwb1zbyH3kAcdOaWexJF1FuHeCv18HjJ8/fikSqf62izxuQYEGFEtdx2p6ukF8OQ0S3Lap5ACdr8VGguo0qbAexF6mnURaQp7LLOK8nebcofH5oADUyrIr0JJ6MncaMgvfZBqF0FMYHMMytpxarbsMgCubeHbJWpm+kGBCvkiNoorliF5Cqbv2xrmy8gQEohNLp5lVLtXO71+mDQMWTSRWz4XVg1vkVbg5rngITVBwPDLv3jyO8qY3DXZLeJGknxNW+OdoUhaqFgH46lMEGGhg==",
};

export default function UmamiTotalViewCounter() {
  const [pageViews, setPageViews] = useState();

  useEffect(() => {
    const fetchViews = async () => {
      const currentTime = Date.now();
      const request = () => {
        const url = `${baseUrl}&endAt=${currentTime}&unit=month&timezone=Asia%2FShanghai&compare=false`;

        return fetch(url, { headers })
          .then((res) => res.json())
          .catch(() => 0);
      };

      const results = await request();
      setPageViews(results?.pageviews?.value ?? 0);
      console.log(results);
    };
    fetchViews();
  }, []);

  const formatViews = (views: number | null) => {
    if (views === undefined)
      return (
        <span className="tailwind flex items-center">
          <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
        </span>
      );
    if (views < 1000) return views.toString();
    if (views < 1000000) return (views / 1000).toFixed(2) + "k";
    return (views / 1000000).toFixed(2) + "M";
  };

  return <span>{formatViews(pageViews)}</span>;
}
