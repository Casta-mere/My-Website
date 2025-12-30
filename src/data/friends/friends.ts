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
  {
    title: "Electrical Killer",
    avatar: "https://github.com/electrical-killer.png",
    url: "https://eksnotebook.com/",
    description: "Slow walker",
    tags: ["IoT"],
  },
  {
    title: "taf.fyi",
    avatar: "https://taf.fyi/assets/friends/fuuzen_128.jpg",
    url: "https://taf.fyi",
    description: "关注永雏塔菲喵谢谢喵",
    tags: ["全栈开发"],
  },
  {
    title: "Keyle's Blog",
    avatar: "https://vrast.cn/favicon.ico",
    url: "https://vrast.cn/",
    description: "在这里记录一些偶尔冒出来转眼就会忘的灵感",
    tags: [],
  },
  {
    title: "星辰博客",
    avatar: "https://blog.starchen.top/favicon.jpg",
    url: "https://blog.starchen.top",
    description: "以热爱之名，点亮技术探索者的漫长岁月！",
    tags: ["技术博客"],
  },
  {
    title: "半方池水半方田",
    avatar: "https://cdn.gallery.uuanqin.top/img/avatar.webp",
    url: "https://blog.uuanqin.top/",
    description: "只能懂一点点",
    tags: [],
  },
  {
    title: "小胡同学",
    avatar: "https://bu.dusays.com/2025/07/05/68690b5992ae7.png",
    url: "https://blog.henrywhu.cn/",
    description: "在喜欢的事情里反复横跳的斜杠学生",
    tags: ["前端开发"],
  },
  {
    title: "浩瀚星河",
    avatar: "https://cdn.codepzj.cn/image/20250529174726187.jpeg",
    url: "https://www.golangblog.com",
    description: "缓慢向上也是一种勇气",
    tags: [],
  },
  {
    title: "lailai's Home",
    description: "Student & Developer",
    url: "https://lailai.one",
    avatar: "https://lailai.one/img/logo.png",
    tags: [],
  },
  {
    title: "Evilrabbit Blog",
    description: "爱 Coding 爱生活",
    url: "https://blog.yujiay.wang/link/",
    avatar: "https://blog.yujiay.wang/images/site/BlogHsvg.png",
    tags: [],
  },
  {
    title: "内密心書",
    description: "喜欢捣鼓的博主",
    url: "https://oortaka.top/",
    avatar: "https://oortaka.top/upload/10-tuya.png",
    tags: [],
  },
];

export default friendList;
