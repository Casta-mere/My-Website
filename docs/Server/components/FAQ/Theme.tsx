import { useColorMode } from "@docusaurus/theme-common";
import React from "react";

const Theme = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <>
      <button
        className="button button--success"
        onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      >
        Toggle dark mode
      </button>
      <h3>Dark mode is now {colorMode === "dark" ? "on" : "off"}</h3>
    </>
  );
};

export default Theme;
