import { useColorMode } from "@docusaurus/theme-common";
import classNames from "classnames";
import React, { useState } from "react";

interface Props {
  text: string;
}

const colors = ["text-green-700", "text-blue-400"];

const GoToComment = ({ text }: Props) => {
  const color = colors[useColorMode().colorMode === "dark" ? 1 : 0];
  const [hover, setHover] = useState(false);
  return (
    <span className="tailwind">
      <button
        className={classNames({
          "m-0": true,
          [color]: true,
          "underline ": hover,
        })}
        onClick={JumpToComment}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {text}
      </button>
    </span>
  );
};

export default GoToComment;

export const JumpToComment = () => {
  const commentTarget = document.querySelector("#comment-anchor");
  commentTarget.scrollIntoView({ behavior: "smooth" });
};
