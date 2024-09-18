import React from "react";
import {
  FaGithub,
  FaGitkraken,
  FaGoogle,
  FaQq,
  FaTwitter,
  FaXbox,
  FaYoutube,
} from "react-icons/fa";

const Icons = () => {
  return (
    <div className="tailwind">
      <div className="flex gap-3">
        <FaGithub size="20" />
        <FaQq size="20" />
        <FaGitkraken size="20" />
        <FaYoutube size="20" />
        <FaXbox size="20" />
        <FaTwitter size="20" />
        <FaGoogle size="20" />
      </div>
    </div>
  );
};

export default Icons;
