import React from "react";

interface Props {
  title: string;
  url: string;
}

const Link = ({ title, url }: Props) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
};

export default Link;
