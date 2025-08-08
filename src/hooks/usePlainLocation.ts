import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export function usePlainLocation(): string {
  const { i18n } = useDocusaurusContext();
  const currentPath = useLocation().pathname;

  if (i18n.currentLocale === i18n.defaultLocale) {
    return currentPath;
  }

  const localePrefix = `/${i18n.currentLocale}`;
  if (currentPath.startsWith(localePrefix)) {
    const plainPath = currentPath.slice(localePrefix.length);
    return plainPath || "/";
  }

  return currentPath;
}
