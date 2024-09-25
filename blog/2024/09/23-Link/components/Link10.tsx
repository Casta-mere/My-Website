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
  {
    main: "text-yellow-500",
    hover: "hover:text-yellow-700",
    underScore: "bg-yellow-400",
  },
  {
    main: "text-red-500",
    hover: "hover:text-red-400",
    underScore: "bg-red-600",
  },
];

const Link = ({
  title,
  url,
  open = "newTab",
  onSameUrl = "refresh",
}: Props) => {
  const [hover, setHover] = useState(false);
  const [leaving, setLeaving] = useState(true);
  const timeoutId = useRef<number | null>(null);
  const color = colors[useColorMode().colorMode === "dark" ? 1 : 0];
  const color_2 = colors[useColorMode().colorMode === "dark" ? 3 : 2];
  const isSameUrl = useLocation().pathname === url;

  return (
    <a
      href={isSameUrl ? (onSameUrl === "disable" ? undefined : url) : url}
      className={classNames({
        "relative inline-block transition-all duration-300 ": true,
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
        }, 1000);
      }}
      onMouseLeave={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = window.setTimeout(() => {
            setHover(false);
            setLeaving(false);
          }, 700);
          window.setTimeout(() => {
            setLeaving(true);
          }, 750);
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
          "absolute right-0 bottom-0 h-0.5 ": true,
          [color.underScore]: true,
          "w-0 transition-all duration-1000": leaving,
          "w-full": !leaving,
        })}
      />
      <span
        className={classNames({
          "absolute left-0 bottom-0 h-0.5": true,
          [color_2.underScore]: true,
          "w-full transition-all duration-1000": hover,
          "w-0": !hover,
        })}
      />
    </a>
  );
};

export default Link;
