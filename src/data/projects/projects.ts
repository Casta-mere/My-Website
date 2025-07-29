export interface ProjectItem {
  title: string;
  description: string;
  description_en: string;
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
    description_en: "My personal website, built with Docusaurus",
    github: "https://github.com/Casta-mere/My-Website",
    img: "/img/docusaurus.png",
    url: "https://www.castamerego.com/",
    tags: ["Docusaurus", "Blog"],
  },
  {
    title: "fzf Scripts",
    description: "fzf 脚本，包括 Docker, Conda, Git 等",
    description_en:
      "fzf enhancement scripts, including Docker, Conda, Git, etc.",
    github: "https://github.com/Casta-mere/fzf_scripts/",
    img: "https://www.castamerego.com/assets/images/fzf-15354ba1d5a7755c5dbe8bd720814db0.png",
    blog: "https://www.castamerego.com/blog/fzf",
    tags: ["fzf", "shell"],
    umami: "fzf-scripts",
  },
  {
    title: "Docusaurus-Plugin-Umami",
    description: "在 Docusaurus 中集成 Umami 数据统计与解析",
    description_en:
      "Integrate Umami data statistics and analysis into Docusaurus",
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
    description_en: "Comic UP Ticket Booking System",
    github: "https://github.com/Casta-mere/CPP-Ticket",
    img: "/img/projects/CPP-Ticket.png",
    tags: ["Comic UP"],
    umami: "cpp-ticket",
  },
  {
    title: "Read-Book",
    description: "Read-Book 豆瓣读书 Top 200 小测验",
    description_en: "Read-Book Douban Top 200 Book Quiz",
    github: "https://github.com/Casta-mere/Read-Book",
    img: "/img/projects/read-book.png",
    url: "http://readbook.castamerego.com/",
    tags: ["Flask"],
    umami: "Read-Book",
  },
  {
    title: "Mind-Scout",
    description: "Mind-Scout 智能知识侦察助手",
    description_en: "Mind-Scout Intelligent Knowledge Scout Assistant",
    github: "https://github.com/Casta-mere/Mind-Scout",
    img: "/img/projects/mind-scout.png",
    url: "http://mindscout.castamerego.com/",
    tags: ["Next.JS", "Tailwind CSS", "TypeScript"],
    umami: "Mind-Scout",
  },
];
