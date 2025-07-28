import React from "react";
import HomepageHeader from "./components/HomepageHeader";
import ProjectShowcase from "./components/ProjectShowcase";
import SiteNavGation from "./components/SiteNavgation";

export default function Home() {
  return (
    <div
      style={{
        background: "rgb(16, 16, 16)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="container tailwind">
        <div className="flex flex-col mt-10 gap-4">
          <HomepageHeader />
          <SiteNavGation />
          <ProjectShowcase />
        </div>
      </div>
    </div>
  );
}
