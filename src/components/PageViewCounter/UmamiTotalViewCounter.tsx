import React from "react";
import { useUmamiStats } from "./useUmamiStats";

export default function UmamiTotalViewCounter() {
  const { views, error } = useUmamiStats();

  const formatViews = (views: number | null) => {
    if (views == null)
      return (
        <span className="tailwind flex items-center">
          <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
        </span>
      );
    if (views < 1000) return views.toString();
    if (views < 1000000) return (views / 1000).toFixed(2) + "k";
    return (views / 1000000).toFixed(2) + "M";
  };

  if (error) return null;

  return <span>{formatViews(views)}</span>;
}
