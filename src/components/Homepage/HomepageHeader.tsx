import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Typewriter from "@site/src/components/TypeWriter";

import React from "react";
const waitingForLove = [
  "Guess I won't be coming to church on Sunday",
  "Monday left me broken",
  "Tuesday, I was through with hoping",
  "Wednesday, my empty arms are open",
  "Thursday, waiting for love, waiting for love",
  "Thank the stars, it's Friday",
  "I'm burning like a fire gone wild on Saturday",
];

const intro = ["全栈开发", "EDG! 我们是冠军!"];

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const weekday = new Date().getDay();

  const lines =
    waitingForLove[weekday] + ";" + intro.map((line) => line).join(";");
  return (
    <div className="flex flex-col gap-4">
      <h1
        className="text-7xl font-bold"
        style={{
          background:
            "linear-gradient(90deg, #3B82F6 0%, #A259E6 25%, #F472B6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backdropFilter: "blur(8px)",
          textShadow: "0 2px 8px rgba(80,80,120,0.3)",
        }}
      >
        {siteConfig.title}
      </h1>
      <div className="text-xl text-white select-none">
        <Typewriter text={lines} delinterval={5000} />
      </div>
    </div>
  );
}
