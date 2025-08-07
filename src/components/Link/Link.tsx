import { useLocation } from "@docusaurus/router";
import { useColorMode as useDocusaurusColorMode } from "@docusaurus/theme-common";
import classNames from "classnames";
import React, { useRef, useState } from "react";

interface Props {
  title: string;
  url: string;
  size?: "sm" | "lg";
  open?: "newTab" | "sameTab";
  onSameUrl?: "open" | "refresh" | "disable";
  colorMode?: "dark" | "light" | "custom";
}

const colors = [
  {
    main: "text-blue-500",
    hover: "hover:text-orange-500",
    underScore: "bg-orange-500",
  },
  {
    main: "text-blue-400",
    hover: "hover:text-violet-500",
    underScore: "bg-violet-500",
  },
  {
    main: "text-gray-300",
    hover: "hover:text-violet-500",
    underScore: "bg-violet-500",
  },
];

const Link = ({
  title,
  url,
  open = "newTab",
  onSameUrl = "refresh",
  size = "sm",
  colorMode,
}: Props) => {
  const [hover, setHover] = useState(false);
  const [leaving, setLeaving] = useState(true);
  const timeoutId = useRef<number | null>(null);
  let mode: "dark" | "light" | "custom";
  if (colorMode) {
    mode = colorMode;
  } else {
    try {
      mode = useDocusaurusColorMode().colorMode;
    } catch {
      mode = "light";
    }
  }
  const color = colors[mode === "dark" ? 1 : mode === "light" ? 0 : 2];
  const isSameUrl = useLocation().pathname === url;

  return (
    <a
      href={isSameUrl ? (onSameUrl === "disable" ? undefined : url) : url}
      className={classNames({
        "relative inline-block": true,
        [color.main]: true,
        [color.hover]: true,
      })}
      onMouseEnter={() => {
        setHover(true);
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = window.setTimeout(() => {
          timeoutId.current = null;
          setLeaving(false);
        }, 500);
      }}
      onMouseLeave={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = window.setTimeout(() => {
            setHover(false);
            setLeaving(false);
          }, 300);
          window.setTimeout(() => {
            setLeaving(true);
          }, 350);
        } else {
          setHover(false);
          setLeaving(true);
        }
      }}
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
          "absolute right-0 h-0.5 ": true,
          "bottom-0": size === "sm",
          "-bottom-1": size === "lg",
          [color.underScore]: true,
          "w-0 transition-all duration-500": leaving,
          "w-full": !leaving,
        })}
      />
      <span
        className={classNames({
          "absolute left-0 h-0.5": true,
          "bottom-0": size === "sm",
          "-bottom-1": size === "lg",
          [color.underScore]: true,
          "w-full transition-all duration-500": hover,
          "w-0": !hover,
        })}
      />
    </a>
  );
};

export default Link;
