import { useLocation } from "@docusaurus/router";
import React from "react";

const Location = () => {
  const location = useLocation();

  return <h3>Current URL is {location.pathname}</h3>;
};

export default Location;
