import React, { useEffect, useState } from "react";

export default function TypeWirter1() {
  const text = '第一步：实现基础的"挨个打字"效果';

  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayText.length < text.length) {
        setDisplayText((prevText) => prevText + text[displayText.length]);
      } else {
        clearInterval(interval);
        // 重置状态以重新开始打字
        setTimeout(() => {
          setDisplayText("");
        }, 1000); // 1 秒后重置状态以实现循环
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return <div>{displayText}|</div>;
}
