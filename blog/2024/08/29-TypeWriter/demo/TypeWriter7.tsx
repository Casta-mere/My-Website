import React, { useEffect, useState } from "react";
import "./TypeWriter.css";

const SEPERATOR = ";";
const INTERVAL = 3000;
const TYPING_SPEED = 30;

export default function TypeWirter6({
  text,
  textSeparator = SEPERATOR,
  typingSpeed = TYPING_SPEED,
  delinterval = INTERVAL,
}) {
  const texts = text.split(textSeparator);
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
      }, typingSpeed / 3);
    } else if (isTypingFinished) {
      interval = setTimeout(() => {
        setIsDeleting(true);
        setIsTypingFinished(false);
      }, delinterval);
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
      }, typingSpeed);
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
