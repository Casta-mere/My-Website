import classNames from "classnames";
import React from "react";

const Link2 = () => {
  return (
    <span className="tailwind">
      <div className="opacity-0">temp</div>
      <span className="relative">
        一个链接
        <span
          className={classNames({
            "absolute -top-8 left-1/2 transform -translate-x-1/2": true,
            "px-2 py-1 text-xs rounded shadow-lg": true,
            "pointer-events-none": true,
            "whitespace-nowrap": true,
            "text-white": true,
            "bg-orange-500": true,
          })}
        >
          站外链接
          <span
            className={classNames({
              "absolute top-full left-1/2 transform -translate-x-1/2": true,
              "border-l-4 border-r-4 border-t-4": true,
              "w-0 h-0": true,
              "border-transparent": true,
              "border-t-orange-500": true,
            })}
          />
        </span>
      </span>
      <span className="opacity-0">123</span>
      <span className="relative">
        两个链接
        <span
          className={classNames({
            "absolute -top-8 left-1/2 transform -translate-x-1/2": true,
            "px-2 py-1 text-xs rounded shadow-lg": true,
            "pointer-events-none": true,
            "whitespace-nowrap": true,
            "text-white": true,
            "bg-orange-500": true,
          })}
        >
          站内文章
          <span
            className={classNames({
              "absolute top-full left-1/2 transform -translate-x-1/2": true,
              "border-l-4 border-r-4 border-t-4": true,
              "w-0 h-0": true,
              "border-transparent": true,
              "border-t-orange-500": true,
            })}
          />
        </span>
      </span>
      <span className="opacity-0">123</span>
      <span className="relative">
        三个链接
        <span
          className={classNames({
            "absolute -top-8 left-1/2 transform -translate-x-1/2": true,
            "px-2 py-1 text-xs rounded shadow-lg": true,
            "pointer-events-none": true,
            "whitespace-nowrap": true,
            "text-white": true,
            "bg-orange-500": true,
          })}
        >
          页面内跳转
          <span
            className={classNames({
              "absolute top-full left-1/2 transform -translate-x-1/2": true,
              "border-l-4 border-r-4 border-t-4": true,
              "w-0 h-0": true,
              "border-transparent": true,
              "border-t-orange-500": true,
            })}
          />
        </span>
      </span>
      <div className="opacity-0">temp</div>
    </span>
  );
};

export default Link2;
