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
  const [leaving, setLeaving] = useState(true);
  const timeoutId = useRef<number | null>(null);
  const color = colors[useColorMode().colorMode === "dark" ? 1 : 0];
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
          "absolute right-0 bottom-0 h-0.5 ": true,
          [color.underScore]: true,
          "w-0 transition-all duration-500": leaving,
          "w-full": !leaving,
        })}
      />
      <span
        className={classNames({
          "absolute left-0 bottom-0 h-0.5": true,
          [color.underScore]: true,
          "w-full transition-all duration-500": hover,
          "w-0": !hover,
        })}
      />
    </a>
  );
};

export default Link;
