import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import classNames from "classnames";
import React from "react";

interface Props {
  title: string;
  url: string;
  open?: "newTab" | "sameTab";
  onSameUrl?: "open" | "refresh" | "disable";
}

const colors = [
  {
    main: "text-blue-500",
    hover: "hover:text-blue-700",
    underScore: "bg-blue-400",
  },
  {
    main: "text-gray-500",
    hover: "hover:text-gray-400",
    underScore: "bg-gray-300",
  },
];

const Link = ({
  title,
  url,
  open = "newTab",
  onSameUrl = "refresh",
}: Props) => {
  const color = colors[useColorMode().colorMode === "dark" ? 1 : 0];
  const isSameUrl = useLocation().pathname === url;

  return (
    <a
      className={classNames({
        "relative inline-block transition-all duration-300 ": true,
        [color.main]: true,
        [color.hover]: true,
      })}
      href={isSameUrl ? (onSameUrl === "disable" ? undefined : url) : url}
      target={
        open === "newTab"
          ? isSameUrl
            ? onSameUrl === "open"
              ? "_blank"
              : undefined
            : "_blank"
          : undefined
      }
      rel="noopener noreferrer"
    >
      {title}
      <span
        className={classNames({
          "absolute left-0 bottom-0 h-0.5": true,
          "w-full": true,
          [color.underScore]: true,
        })}
      />
    </a>
  );
};

export default Link;
