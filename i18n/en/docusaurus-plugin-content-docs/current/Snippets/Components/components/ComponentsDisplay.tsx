import DocusaurusLink from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import Link from "@site/src/components/Link/Link";
import RecentGames from "@site/src/components/Steam/RecentGames";
import Typewriter from "@site/src/components/TypeWriter";
import classNames from "classnames";
import React from "react";
import Terminal2 from "./Terminal2";

export type ComponentItem = {
  name: string;
  component: React.ReactNode;
  link: string;
};

const Components: ComponentItem[] = [
  {
    name: "Typewriter",
    component: (
      <div className="text-2xl truncate">
        <Typewriter
          text="Monday left me broken; Tuesday, I was through with hoping; Wednesday, my empty arms are open; Thursday, waiting for love, waiting for love; Thank the stars, it's Friday; I'm burning like a fire gone wild on Saturday; Guess I won't be coming to church on Sunday; I'll be waiting for love, waiting for love; to come around;◢◤"
          delinterval={2000}
        />
      </div>
    ),
    link: "/docs/Snippets/Components/TypeWriter",
  },
  {
    name: "Hyperlink",
    component: (
      <div className="text-2xl">
        <Link
          title="This is a hyperlink"
          url="/docs/Snippets/Components/Link"
          badge={true}
        />
      </div>
    ),
    link: "/docs/Snippets/Components/Link",
  },
  {
    name: "Terminal Emulator",
    component: <Terminal2 />,
    link: "/docs/Snippets/Components/cmdTerminal",
  },
  {
    name: "Steam Recent Games",
    component: <RecentGames />,
    link: "/docs/Snippets/Components/Steam",
  },
];

export default function ComponentsDisplay() {
  const { colorMode } = useColorMode();
  return (
    <div className="tailwind">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Components.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="card h-full w-full shadow--md"
          >
            <div className="p-4 text-lg font-bold">{item.name}</div>

            <div className="min-h-[4rem] h-full flex items-center justify-center px-4">
              {item.component}
            </div>

            <button
              className={classNames({
                "m-4  rounded-md py-1": true,
                "bg-gray-500 hover:bg-gray-600": colorMode === "dark",
                "bg-slate-200 hover:bg-slate-300 ": colorMode === "light",
              })}
            >
              <DocusaurusLink to={item.link} aria-label={`${item.name} `}>
                View Details
              </DocusaurusLink>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
