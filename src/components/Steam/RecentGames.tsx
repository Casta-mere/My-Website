import React, { useEffect, useState } from "react";
import GameCardS from "./GameCardS";

const DATA_URL = "/data/steam.json";

export default function RecentGames() {
  const [games, setGames] = useState<any | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        const data = await res.json();
        setGames(data ?? []);
      } catch {
        setGames([]);
      }
    };

    fetchGames();
  }, []);

  if (games == null)
    return (
      <span className="tailwind flex items-center">
        <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
      </span>
    );

  return (
    <div className="tailwind">
      <div className="container">
        <ul className="grid sm:grid-cols-1 max-w-xl">
          {games.length === 0 && <p>博主去拯救世界了——</p>}
          {games.length !== 0 &&
            games.map((game: any) => (
              <GameCardS key={game.appid} game={game} />
            ))}
        </ul>
      </div>
    </div>
  );
}
