import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Typewriter from "@site/src/components/TypeWriter";
import Layout from "@theme/Layout";
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

const intro = ["Full Stack Developer", "EDG! 2024 Valorant World Champion!"];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const weekday = new Date().getDay();

  const lines =
    waitingForLove[weekday] + ";" + intro.map((line) => line).join(";");
  return (
    <header>
      <div className="container">
        <h1 className="hero__title  padding-top--lg">{siteConfig.title}</h1>
        <div className="hero__subtitle">
          <Typewriter text={lines} delinterval={5000} />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Volar Morgulis">
      <HomepageHeader />
    </Layout>
  );
}
