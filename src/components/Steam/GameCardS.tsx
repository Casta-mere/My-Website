import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import classNames from "classnames";
import React, { useState } from "react";
import { Game } from "./Game";

type GameCardProps = {
  game: Game;
};

const GameCardS = ({ game }: GameCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { colorMode } = useColorMode();

  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  const timePlayed = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (currentLocale === "en") {
      return mins === 0 ? `${hours} hrs` : `${hours} hrs ${mins} mins`;
    }
    return mins === 0 ? `${hours} 小时` : `${hours} 小时 ${mins} 分钟`;
  };

  return (
    <li
      key={game.appid}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames({
        "rounded-xl p-1": true,
        "bg-gray-200": hovered && colorMode === "light",
        "bg-gray-700": hovered && colorMode === "dark",
        "cursor-pointer": hovered,
      })}
      onClick={() =>
        window.open(
          `https://store.steampowered.com/app/${game.appid}/_/`,
          "_blank"
        )
      }
    >
      <div className="flex gap-4 items-center m-2">
        <div className="avatar relative flex-shrink-0">
          <img
            className={classNames(
              "avatar__photo object-cover w-full h-full rounded-xl transition-all duration-300 ease-in-out",
              {
                "scale-125": hovered,
              }
            )}
            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
            alt={game.name}
          />
        </div>
        {game.name}
        <div className="ml-auto text-right whitespace-nowrap text-sm">
          {timePlayed(game.playtime_forever)}
        </div>
      </div>
    </li>
  );
};

export default GameCardS;
