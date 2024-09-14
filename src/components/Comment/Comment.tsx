import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import Commentcn from "./Commentcn";
import Commenten from "./Commenten";

export default function Comment(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  if (currentLocale === "en") return <Commenten />;
  return <Commentcn />;
}
