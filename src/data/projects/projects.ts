export interface ProjectItem {
  title: string;
  description: string;
  github: string;
  img?: string;
  url?: string;
  blog?: string;
  tags?: string[];
  umami?: string;
}

export const projectList: ProjectItem[] = [
  {
    title: "My Website",
    description: "我的个人网站，使用 Docusaurus 构建",
    github: "https://github.com/Casta-mere/My-Website",
    img: "/img/docusaurus.png",
    url: "https://www.castamerego.com/",
    tags: ["Docusaurus", "Blog"],
  },
  {
    title: "fzf Scripts",
    description: "一系列用于增强 fzf 的脚本和配置",
    github: "https://github.com/Casta-mere/fzf_scripts/",
    blog: "https://www.castamerego.com/blog/fzf",
    img: "https://www.castamerego.com/assets/images/fzf-15354ba1d5a7755c5dbe8bd720814db0.png",
    tags: ["fzf", "shell"],
    umami: "fzf-scripts",
  },
  {
    title: "Docusaurus-Plugin-Umami",
    description: "在 Docusaurus 中集成 Umami 数据统计与解析",
    github: "https://github.com/Casta-mere/Docusaurus-Plugin-Umami",
    img: "/img/projects/Umami.png",
    url: "https://umami.castamerego.com/share/EplxZVQRe6OkyBt3/castamerego.com",
    blog: "https://www.castamerego.com/docs/Server/Docusaurus-Umami",
    tags: ["Docusaurus", "Umami"],
    umami: "docusaurus-plugin-umami",
  },
  {
    title: "CPP-Ticket",
    description: "CPP 抢票系统",
    github: "https://github.com/Casta-mere/CPP-Ticket",
    img: "/img/projects/CPP-Ticket.png",
    tags: ["Comic UP"],
    umami: "cpp-ticket",
  },
  {
    title: "Read-Book",
    description: "Read-Book 豆瓣读书 Top 200 小测验",
    github: "https://github.com/Casta-mere/Read-Book",
    img: "/img/projects/read-book.png",
    url: "http://readbook.castamerego.com/",
    tags: ["Flask"],
    umami: "Read-Book",
  },
  {
    title: "Mind-Scout",
    description: "Mind-Scout 智能知识侦察助手",
    github: "https://github.com/Casta-mere/Mind-Scout",
    img: "/img/projects/mind-scout.png",
    url: "http://mindscout.castamerego.com/",
    tags: ["Next.JS", "Tailwind CSS", "TypeScript"],
    umami: "Mind-Scout",
  },
];
