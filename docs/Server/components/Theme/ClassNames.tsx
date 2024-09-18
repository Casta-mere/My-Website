import classNames from "classnames";

import React from "react";

const ClassNames = () => {
  return (
    <div className="tailwind">
      <div className="flex mb-5">
        <span
          className={classNames({
            "inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset select-none":
              true,
            "bg-red-50 text-red-700 ring-red-600/10": true,
            "hover:bg-green-50 hover:text-green-700 hover:ring-green-600/20":
              true,
          })}
        >
          badge
        </span>
      </div>
    </div>
  );
};

export default ClassNames;
