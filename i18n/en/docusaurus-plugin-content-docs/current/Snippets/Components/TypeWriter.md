---
tags: [React, Snippet]
title: TypeWriter
keywords:
  - React
  - Typewriter
  - Snippet
last_update:
  date: 13 SEP 2024 GMT
  author: Casta-mere
---

A simple React Typewriter effect component

import Typewriter from "@site/src/components/TypeWriter";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

## Demonstration

<h2>
  <Typewriter
    text="Monday left me broken; Tuesday, I was through with hoping; Wednesday, my empty arms are open; Thursday, waiting for love, waiting for love; Thank the stars, it's Friday; I'm burning like a fire gone wild on Saturday; Guess I won't be coming to church on Sunday; I'll be waiting for love, waiting for love; to come around;◢◤"
    delinterval={2000}
  />
</h2>

:::info
You can refer to the [TypeWriter](/blog/TypeWriter) for more details on how this component is implemented.
:::

## Code

<Tabs>
<TabItem value="tsx" label="TypeWriter.tsx">

```tsx showLineNumbers title="TypeWriter.tsx"
import React, { useEffect, useState } from "react";
import "./TypeWriter.css";

const SEPERATOR = ";";
const INTERVAL = 3000;
const TYPING_SPEED = 30;

function Typewriter({
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
          clearInterval(interval);
          setIsDeleting(false);
          setIsTypingFinished(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, typingSpeed / 3);
    } else if (isTypingFinished) {
      interval = setTimeout(() => {
        setIsDeleting(true);
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

    return () => {
      clearInterval(interval);
    };
  }, [
    texts,
    typingSpeed,
    displayText,
    isDeleting,
    isTypingFinished,
    textIndex,
  ]);

  return (
    <div className="typewriter">
      <span>{displayText}</span>
      <span className="cursor">|</span>
    </div>
  );
}

export default Typewriter;
```

</TabItem>
<TabItem value="css" label="TypeWriter.css">

```css showLineNumbers title="TypeWriter.css"
.typewriter {
  display: inline-block;
  position: relative;
}

.cursor {
  display: inline-block;
  animation: blink 0.75s step-start infinite;
  font-weight: bold;
  font-size: 1em;
  margin-left: 1px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

</TabItem>
</Tabs>
