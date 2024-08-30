import React, { useEffect, useState } from "react";

export default function TypeWirter3() {
  const text = "第三步：实现打字结束后等待几秒再删除";

  const [displayText, setDisplayText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    let interval;

    if (isDeleting) {
      interval = setInterval(() => {
        setDisplayText((prevText) => prevText.slice(0, -1));
        if (displayText.length === 0) {
          setIsDeleting(false);
        }
      }, 100);
    } else if (isTypingFinished) {
      interval = setTimeout(() => {
        setIsDeleting(true);
        setIsTypingFinished(false);
      }, 3000);
    } else {
      interval = setInterval(() => {
        if (displayText.length < text.length) {
          setDisplayText((prevText) => prevText + text[displayText.length]);
        } else {
          clearInterval(interval);
          setIsTypingFinished(true);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  });

  return <div>{displayText}|</div>;
}
