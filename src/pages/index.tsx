import {
  Articles,
  HomepageHeader,
  ProjectShowcase,
  SiteNavigation,
} from "@site/src/components/Homepage";
import React from "react";

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
          <SiteNavigation />
          <Articles />
          <ProjectShowcase />
        </div>
      </div>
    </div>
  );
}
