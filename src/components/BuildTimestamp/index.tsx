import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect, useState } from "react";

const BuildTimestamp: React.FC = () => {
  const { siteConfig, i18n } = useDocusaurusContext();
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    const ts = siteConfig.customFields?.buildTimestamp as string;
    if (!ts) return;
    const date = new Date(ts);
    const locale = i18n.currentLocale === "en" ? "en-US" : "zh-Hans-CN";
    setFormatted(
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    );
  }, []);

  return <span>{formatted}</span>;
};

export default BuildTimestamp;
