import classNames from "classnames";
import React from "react";

interface UnderlineAnimationProps {
  hover: boolean;
  leaving: boolean;
  underlineColor: string;
  size?: "sm" | "lg";
}

const UnderlineAnimation: React.FC<UnderlineAnimationProps> = ({
  hover,
  leaving,
  underlineColor,
  size = "sm",
}) => {
  return (
    <>
      <span
        className={classNames({
          "absolute right-0 h-0.5": true,
          "bottom-0": size === "sm",
          "-bottom-1": size === "lg",
          [underlineColor]: true,
          "w-0 transition-all duration-500 ease-out": leaving,
          "w-full": !leaving,
        })}
      />
      <span
        className={classNames({
          "absolute left-0 h-0.5": true,
          "bottom-0": size === "sm",
          "-bottom-1": size === "lg",
          [underlineColor]: true,
          "w-full transition-all duration-500 ease-out": hover,
          "w-0": !hover,
        })}
      />
    </>
  );
};

export default UnderlineAnimation;
