import React, { useEffect, useState } from "react";
import "./TypeWriter.css";

export default function TypeWirter5() {
  const text = "第五步：画龙点睛";

  const texts = text.split(";");
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    let interval;

    if (isDeleting) {
      interval = setInterval(() => {
        setDisplayText((prevText) => prevText.slice(0, -1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, 100);
    } else if (isTypingFinished) {
      interval = setTimeout(() => {
        setIsDeleting(true);
        setIsTypingFinished(false);
      }, 500);
    } else {
      interval = setInterval(() => {
        if (displayText.length < currentText.length) {
          setDisplayText(
            (prevText) => prevText + currentText[displayText.length]
          );
        } else {
          clearInterval(interval);
          setIsTypingFinished(true);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  });

  return (
    <div>
      {displayText}
      <span className="cursor">|</span>
    </div>
  );
}
