import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import classNames from "classnames";
import React, { useRef, useState } from "react";

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
  const [hover, setHover] = useState(false);
  const color = colors[useColorMode().colorMode === "dark" ? 1 : 0];
  const isSameUrl = useLocation().pathname === url;
  const timeoutId = useRef<number | null>(null);

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
      onMouseEnter={() => {
        setHover(true);

        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = window.setTimeout(() => {
          timeoutId.current = null;
        }, 500);
      }}
      onMouseLeave={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = window.setTimeout(() => setHover(false), 300);
        } else {
          setHover(false);
        }
      }}
    >
      {title}
      <span
        className={classNames({
          "absolute bottom-0 h-0.5 transition-all duration-500": true,
          "w-full left-0": hover,
          "w-0 right-0": !hover,
          [color.underScore]: true,
        })}
      />
    </a>
  );
};

export default Link;
