import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { FaBook, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ProjectItem, projectList } from "../../data/projects/projects";

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: any, callback?: () => void) => void;
    };
  }
}

function ProjectCard({ proj }: { proj: ProjectItem }) {
  const { i18n } = useDocusaurusContext();
  const mainLink = proj.url || proj.github || undefined;
  return (
    <div
      key={proj.github}
      className="project-card bg-slate-800/60 rounded-xl p-6 shadow-lg text-white relative overflow-hidden transition-all duration-300 cursor-pointer group"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;

        if (mainLink) {
          if (proj.umami && window.umami) {
            window.umami.track(proj.umami);
            setTimeout(() => {
              window.open(mainLink, "_blank");
            }, 150);
          } else {
            window.open(mainLink, "_blank");
          }
        }
      }}
      tabIndex={0}
      role="button"
      style={{ outline: "none" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 project-card-glass"></div>
      {proj.img && (
        <div className="w-full h-32 rounded-lg overflow-hidden flex items-center justify-center mb-3">
          <img
            src={proj.img}
            alt={proj.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 relative z-10">{proj.title}</h3>
      <p className="text-sm mb-2 relative z-10 opacity-80 transition-opacity duration-300">
        {i18n.currentLocale === "zh-Hans"
          ? proj.description
          : proj.description_en}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {proj.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-blue-600/40 rounded text-xs text-purple-100"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute left-0 right-0 bottom-0 px-6 py-2 flex gap-4 items-center bg-slate-900/80 rounded-b-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {proj.url && (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm gap-1 text-green-400 hover:underline"
            {...(proj.umami && { "data-umami-event": proj.umami })}
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt /> <Translate>网页</Translate>
          </a>
        )}
        <a
          href={proj.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm gap-1 text-blue-400 hover:underline"
          {...(proj.umami && { "data-umami-event": proj.umami })}
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub /> GitHub
        </a>
        {proj.blog && (
          <a
            href={proj.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm gap-1 text-pink-400 hover:underline"
            {...(proj.umami && { "data-umami-event": proj.umami })}
            onClick={(e) => e.stopPropagation()}
          >
            <FaBook /> <Translate>相关博客</Translate>
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <div className="slick-prev" />,
    nextArrow: <div className="slick-next" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="mt-4 mb-16">
      <h2 className="text-2xl font-bold text-white">
        <Translate>项目</Translate>
      </h2>
      <div className="">
        <Slider {...sliderSettings}>
          {projectList.map((proj) => (
            <div key={proj.github} className="px-3">
              <ProjectCard proj={proj} />
            </div>
          ))}
        </Slider>
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
        
        /* Carousel */
        .slick-dots {
          bottom: -50px;
        }
        .slick-dots li button:before {
          color: #a259e6;
          font-size: 12px;
        }
        .slick-dots li.slick-active button:before {
          color: #f472b6;
        }
        .slick-prev, .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
        }
        .slick-prev {
          left: -50px;
        }
        .slick-next {
          right: -50px;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 20px;
          color: #a259e6;
          line-height: 1;
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          color: #f472b6;
        }
        @media (max-width: 768px) {
          .slick-prev, .slick-next {
            display: none !important;
          }
          .slick-slider {
            margin: 0 !important;
          }
        }
        .slick-slider {
          position: relative;
          margin: 0 60px;
          padding-top: 10px;
        }
        @media (max-width: 768px) {
          .slick-slider {
            margin: 0;
          }
        }
        .slick-track {
          padding-top: 10px;
        }
        .slick-list {
          padding-top: 10px !important;
        }
      `}</style>
    </section>
  );
}
