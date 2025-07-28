import React from "react";
import { FaBook, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { ProjectItem, projectList } from "../../data/projects/projects";

// 项目卡片组件
function ProjectCard({ proj }: { proj: ProjectItem }) {
  const mainLink = proj.url || proj.github || undefined;
  return (
    <div
      key={proj.github}
      className="project-card bg-slate-800/60 rounded-xl p-6 shadow-lg text-white relative overflow-hidden transition-all duration-300 cursor-pointer group"
      onClick={() => {
        if (mainLink) window.open(mainLink, "_blank");
      }}
      tabIndex={0}
      role="button"
      style={{ outline: "none" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 project-card-glass"></div>
      {proj.img && (
        <img
          src={proj.img}
          alt={proj.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}
      <h3 className="text-lg font-semibold mb-2 relative z-10">{proj.title}</h3>
      <p className="text-sm mb-2 relative z-10 opacity-80 transition-opacity duration-300">
        {proj.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {proj.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-purple-600/40 rounded text-xs text-purple-100"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* 悬浮时展开链接区 */}
      <div className="absolute left-0 right-0 bottom-0 px-6 py-2 flex gap-4 items-center bg-slate-900/80 rounded-b-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {proj.url && (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-400 hover:underline"
          >
            <FaExternalLinkAlt /> Demo
          </a>
        )}
        <a
          href={proj.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:underline"
        >
          <FaGithub /> GitHub
        </a>
        {proj.blog && (
          <a
            href={proj.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-pink-400 hover:underline"
          >
            <FaBook /> Blog
          </a>
        )}
      </div>
    </div>
  );
}

// 展示区主组件
export default function ProjectShowcase() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.map((proj) => (
          <ProjectCard key={proj.github} proj={proj} />
        ))}
      </div>
      {/* 注入高级悬浮动效样式 */}
      <style>{`
        .project-card {
          box-shadow: 0 4px 24px 0 #a259e6a0, 0 1.5px 8px 0 #3b82f680;
        }
        .project-card:hover {
          transform: scale(1.04) translateY(-4px);
          box-shadow: 0 8px 32px 0 #a259e6cc, 0 2px 16px 0 #3b82f6cc;
        }
        .project-card-glass {
          background: linear-gradient(120deg, #a259e6 10%, #3b82f6 60%, #f472b6 100%);
          opacity: 0.18;
          filter: blur(16px);
          border-radius: 1rem;
          transition: opacity 0.3s;
        }
        .project-card:hover .project-card-glass {
          opacity: 0.32;
        }
        .project-card:hover p {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
