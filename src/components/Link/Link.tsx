import { useColorMode as useDocusaurusColorMode } from "@docusaurus/theme-common";
import { usePlainLocation } from "@site/src/hooks/usePlainLocation";
import classNames from "classnames";
import React from "react";
import {
  colors,
  LinkBadge,
  UnderlineAnimation,
  useHoverEffect,
} from "./_components";

interface Props {
  title: string;
  url: string;
  size?: "sm" | "lg";
  open?: "newTab" | "sameTab";
  onSameUrl?: "open" | "refresh" | "disable";
  colorMode?: "dark" | "light" | "homepage";
  badge?: boolean;
}

const Link = ({
  title,
  url,
  open = "newTab",
  onSameUrl = "refresh",
  size = "sm",
  colorMode,
  badge,
}: Props) => {
  const { hover, leaving, onMouseEnter, onMouseLeave } = useHoverEffect();
  let mode: "dark" | "light" | "homepage";
  if (colorMode) {
    mode = colorMode;
  } else {
    try {
      mode = useDocusaurusColorMode().colorMode;
    } catch {
      mode = "light";
    }
  }
  const color = colors[mode];
  const href = url;

  const isExternalLink = !href.startsWith("/");
  const isAnchorLink =
    href.includes("#") && href.split("#")[0] === usePlainLocation();

  return (
    <a
      href={isAnchorLink ? (onSameUrl === "disable" ? undefined : url) : url}
      className={classNames({
        "relative inline-block": true,
        [color.main]: true,
        [color.hover]: true,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target={
        open === "newTab"
          ? isAnchorLink
            ? onSameUrl === "open"
              ? "_blank"
              : undefined
            : "_blank"
          : undefined
      }
      rel="noopener noreferrer"
    >
      {title}
      {badge && (
        <LinkBadge
          isVisible={hover}
          isExternalLink={isExternalLink}
          isAnchorLink={isAnchorLink}
        />
      )}
      <UnderlineAnimation
        hover={hover}
        leaving={leaving}
        underlineColor={color.underScore}
        size={size}
      />
    </a>
  );
};

export default Link;
