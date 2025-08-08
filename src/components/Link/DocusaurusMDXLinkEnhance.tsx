import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useColorMode as useDocusaurusColorMode } from "@docusaurus/theme-common";
import type { Props } from "@theme/MDXComponents/A";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import LinkBadge from "./LinkBadge";

const colors = {
  light: {
    main: "text-blue-500",
    hover: "hover:text-orange-500",
    underScore: "bg-orange-500",
  },
  dark: {
    main: "text-blue-400",
    hover: "hover:text-violet-500",
    underScore: "bg-violet-500",
  },
};
const DocusaurusMDXLinkEnhance = (props: Props) => {
  const [hover, setHover] = useState(false);
  const [leaving, setLeaving] = useState(true);
  const timeoutId = useRef<number | null>(null);

  let mode: "dark" | "light";

  try {
    mode = useDocusaurusColorMode().colorMode;
  } catch {
    mode = "dark";
  }

  const color = colors[mode];
  console.log(color);
  const location = useLocation();

  const isExternalLink = props.href && !props.href.startsWith("/");

  const isAnchorLink =
    props.href &&
    props.href.includes("#") &&
    props.href.startsWith(location.pathname);

  return (
    <span className="tailwind" style={{ display: "inline-block" }}>
      <span
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
      >
        <Link {...props} />

        <LinkBadge
          isVisible={hover}
          isExternalLink={!!isExternalLink}
          isAnchorLink={!!isAnchorLink}
        />

        <span
          className={classNames({
            "absolute right-0 h-0.5 bottom-0": true,
            [color.underScore]: true,
            "w-0 transition-all duration-500": leaving,
            "w-full": !leaving,
          })}
        />
        <span
          className={classNames({
            "absolute left-0 h-0.5 bottom-0": true,
            [color.underScore]: true,
            "w-full transition-all duration-500": hover,
            "w-0": !hover,
          })}
        />
      </span>
    </span>
  );
};

export default DocusaurusMDXLinkEnhance;
