export interface FriendItem {
  title: string;
  url: string;
  avatar?: string;
  description?: string;
  tags?: string[];
}

const friendList: FriendItem[] = [
  {
    title: "Today Red",
    avatar: "https://github.com/Achinoise1.png",
    url: "http://todayred.castamerego.com/",
    description: " 吹灭读书灯，一身都是月",
    tags: ["python开发", "前端开发"],
  },
  {
    title: "Alan",
    avatar: "https://github.com/3Alan.png",
    url: "https://www.alanwang.site/",
    description: "此刻想举重若轻，之前必要负重前行",
    tags: ["前端开发"],
  },
  {
    title: "Mozuta",
    avatar: "https://github.com/Mozuta.png",
    url: "http://hex.mozuta.com/",
    description: "HEX",
    tags: ["Dreamer", "Reader"],
  },
];

export default friendList;
