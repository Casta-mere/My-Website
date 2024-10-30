import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const calculatedProgress = Math.ceil((scrollTop / scrollHeight) * 100);
    setProgress(calculatedProgress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="tailwind">
      <div className="border-l border-gray-600">
        <div className="ml-4 -mb-2">{progress}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
