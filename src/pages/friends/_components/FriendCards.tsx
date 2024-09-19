import friendList, { FriendItem } from "@site/src/data/friends/friends";
import classNames from "classnames";
import React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";

const SkillBadge = ({ skill }: { skill: string }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 opacity-80">
      {skill}
    </span>
  );
};

const colors = [
  "#FFA500",
  "#4169E1",
  "#DC143C",
  "#FF6347",
  "#FFD700",
  "#FFC0CB",
  "#FFBF00",
  "#87CEEB",
  "#C0C0C0",
];

const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const FriendCard = ({ friend }: { friend: FriendItem }) => {
  const [hovered, setHovered] = useState(false);
  const card = {
    "card cursor-pointer min-h-28r overflow-hidden rounded-card bg-card px-4 py-1  border-2 border-zinc-400 border-opacity-20":
      true,
    "justify-center": true,
    "transition-all hover:translate-y-[-5px] hover:scale-[1.01] hover:bg-[rgba(229,231,235,0.3)] hover:shadow-[0_3px_10px_0_rgba(164,190,217,0.3)]":
      true,
  };
  return (
    <li
      className={classNames(card, "group")}
      key={friend.title}
      onClick={() => {
        window.open(friend.url, "_blank");
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex gap-4 items-center m-2">
        <div className="avatar min-w-14 h-14 relative">
          <img
            className="avatar__photo object-cover w-full h-full"
            src={friend.avatar}
          />
        </div>
        <div className="flex-row">
          <h3 className="font-bold text-lg dark:text-red-500 group-hover:text-2xl group-hover:font-extrabold transition-all">
            {friend.title}
          </h3>
          <div>
            <RoughNotation
              type="underline"
              color={getRandom(colors)}
              strokeWidth={4}
              show={hovered}
              animationDuration={650}
              multiline={true}
              iterations={1}
            >
              {friend.description}
            </RoughNotation>
          </div>
        </div>
      </div>
      <div className="m-2">
        <ul className="flex gap-2">
          {friend.tags.map((skill) => (
            <SkillBadge key={skill} skill={"#" + skill} />
          ))}
        </ul>
      </div>
    </li>
  );
};

const FriendCards = () => {
  return (
    <div className="tailwind">
      <section className="my-8">
        <ul className="grid gap-6 sm:grid-cols-2">
          {friendList.map((friend) => (
            <FriendCard friend={friend} key={friend.title} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FriendCards;
