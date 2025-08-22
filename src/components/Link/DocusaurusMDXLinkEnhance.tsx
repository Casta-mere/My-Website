import Link from "@docusaurus/Link";
import { useColorMode as useDocusaurusColorMode } from "@docusaurus/theme-common";
import { usePlainLocation } from "@site/src/hooks/usePlainLocation";
import type { Props } from "@theme/MDXComponents/A";
import classNames from "classnames";
import React from "react";
import {
  colors,
  LinkBadge,
  UnderlineAnimation,
  useHoverEffect,
} from "./_components";

const DocusaurusMDXLinkEnhance = (props: Props) => {
  if (!props.href) return <Link {...props} />;
  const { href } = props;

  const { hover, leaving, onMouseEnter, onMouseLeave } = useHoverEffect();

  let mode: "dark" | "light";
  try {
    mode = useDocusaurusColorMode().colorMode;
  } catch {
    mode = "dark";
  }

  const color = colors[mode];

  const isExternalLink = !href.startsWith("/");
  const isResourceLink = href.startsWith("/assets/");
  const isAnchorLink =
    href.includes("#") && href.split("#")[0] === usePlainLocation();

  return (
    <span className="tailwind" style={{ display: "inline-block" }}>
      <span
        className={classNames({
          "relative inline-block": true,
          [color.main]: !hover,
          [color.hover]: hover,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link {...props} />

        <LinkBadge
          isVisible={hover}
          isExternalLink={isExternalLink}
          isAnchorLink={isAnchorLink}
          isResourceLink={isResourceLink}
        />

        <UnderlineAnimation
          hover={hover}
          leaving={leaving}
          underlineColor={color.underScore}
        />
      </span>
    </span>
  );
};

export default DocusaurusMDXLinkEnhance;
