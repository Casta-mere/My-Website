import React, { useEffect, useState } from "react";

export default function TypeWirter2() {
  const text = '第二步：实现打字结束后"挨个删除"效果';

  const [displayText, setDisplayText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let interval;

    if (isDeleting) {
      interval = setInterval(() => {
        setDisplayText((prevText) => prevText.slice(0, -1));
        if (displayText.length === 0) {
          setIsDeleting(false);
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        if (displayText.length < text.length) {
          setDisplayText((prevText) => prevText + text[displayText.length]);
        } else {
          clearInterval(interval);
          setIsDeleting(true);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  });

  return <div>{displayText}|</div>;
}
