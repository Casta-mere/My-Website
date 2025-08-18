import Translate from "@docusaurus/Translate";
import classNames from "classnames";
import React from "react";
import { badgeColors } from "./colors";
interface LinkBadgeProps {
  isVisible: boolean;
  isExternalLink: boolean;
  isAnchorLink: boolean;
  isResourceLink: boolean;
}

const LinkBadge: React.FC<LinkBadgeProps> = ({
  isVisible,
  isExternalLink,
  isAnchorLink,
  isResourceLink,
}) => {
  const type: keyof typeof badgeColors = isExternalLink
    ? "external"
    : isAnchorLink
    ? "inPage"
    : isResourceLink
    ? "resource"
    : "internal";
  const { badgeColor, arrowColor } = badgeColors[type];

  return (
    <span
      className={classNames({
        "absolute -top-8 left-1/2 transform -translate-x-1/2": true,
        "px-2 py-1 text-xs rounded shadow-lg": true,
        "transition-all duration-300": true,
        "opacity-0 scale-75": !isVisible,
        "opacity-100 scale-100": isVisible,
        "pointer-events-none": true,
        "whitespace-nowrap": true,
        "select-none": true,
        "text-white": true,
        [badgeColor]: true,
      })}
    >
      {isExternalLink && <Translate>站外链接</Translate>}
      {isAnchorLink && <Translate>页面内跳转</Translate>}
      {isResourceLink && <Translate>站内资源</Translate>}
      {!isExternalLink && !isAnchorLink && !isResourceLink && (
        <Translate>站内文章</Translate>
      )}
      <span
        className={classNames({
          "absolute top-full left-1/2 transform -translate-x-1/2": true,
          "w-0 h-0": true,
          "border-l-4 border-r-4 border-t-4": true,
          "border-transparent": true,
          "text-white": true,
          [arrowColor]: true,
        })}
      />
    </span>
  );
};

export default LinkBadge;
