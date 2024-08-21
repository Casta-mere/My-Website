import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

const taglines = [
  "Monday left me broken",
  "Tuesday, I was through with hoping",
  "Wednesday, my empty arms are open",
  "Thursday, waiting for love, waiting for love",
  "Thank the stars, it's Friday",
  "I'm burning like a fire gone wild on Saturday",
  "Guess I won't be coming to church on Sunday"
]

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  const weekday = new Date().getDay();
  return (
    <header>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{taglines[weekday - 1]}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Volar Morgulis">
      <HomepageHeader />
    </Layout>
  );
}
