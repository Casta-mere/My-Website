import Translate from "@docusaurus/Translate";
import classNames from "classnames";
import React from "react";

interface LinkBadgeProps {
  isVisible: boolean;
  isExternalLink: boolean;
  isAnchorLink: boolean;
}

const LinkBadge: React.FC<LinkBadgeProps> = ({
  isVisible,
  isExternalLink,
  isAnchorLink,
}) => {
  const badgeColor = isExternalLink
    ? "bg-orange-500 text-white"
    : isAnchorLink
    ? "bg-violet-500 text-white"
    : "bg-blue-500 text-white";

  const arrowColor = isExternalLink
    ? "border-t-orange-500"
    : isAnchorLink
    ? "border-t-violet-500"
    : "border-t-blue-500";

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
        [badgeColor]: true,
      })}
    >
      {isExternalLink && <Translate>站外链接</Translate>}
      {isAnchorLink && <Translate>页面内跳转</Translate>}
      {!isExternalLink && !isAnchorLink && <Translate>站内文章</Translate>}
      <span
        className={classNames({
          "absolute top-full left-1/2 transform -translate-x-1/2": true,
          "w-0 h-0": true,
          "border-l-4 border-r-4 border-t-4": true,
          "border-transparent": true,
          [arrowColor]: true,
        })}
      />
    </span>
  );
};

export default LinkBadge;
