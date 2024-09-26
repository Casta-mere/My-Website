import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const Locale = () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  return <h3>Current Language is {currentLocale}</h3>;
};

export default Locale;
