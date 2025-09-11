import { useColorMode } from "@docusaurus/theme-common";
import Translate from "@docusaurus/Translate";
import Link from "@site/src/components/Link/Link";
import classNames from "classnames";
import React from "react";

interface reference {
  title: string;
  url: string;
  author?: string;
  time?: string;
}

interface Props {
  references: reference[];
}

const Reference = ({ references }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <div className="tailwind">
      <div
        className="alert alert--info p-4 rounded-lg group border-l-4  mt-8"
        style={{ borderLeftColor: "rgb(76, 179, 212)" }}
        role="alert"
      >
        <div className="flex items-center gap-5 my-2">
          <button className="button button--primary cursor-default text-2xl transition-all group-hover:-rotate-12 group-hover:translate-y-[-5px] group-hover:scale-[1.3]">
            📜
          </button>

          <h2
            className={classNames({
              "text-3xl font-bold": true,
              " text-black": colorMode === "light",
              " text-white": colorMode === "dark",
            })}
          >
            <Translate>参考文献</Translate>
          </h2>
        </div>
        {references.map((ref, index) => {
          return (
            <div key={index}>
              [{index + 1}] {ref.author && <span>{ref.author}, </span>}
              {ref.time && <span>{ref.time}, </span>}
              <Link title={ref.title} url={ref.url} badge={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reference;
