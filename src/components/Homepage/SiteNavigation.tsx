import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { FaLanguage, FaRss } from "react-icons/fa";
import { FaBlog, FaBook, FaCode, FaGithub } from "react-icons/fa6";

const useNavButtonAnimation = () => {
  React.useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("nav-btn-icon-rotate")
    ) {
      const style = document.createElement("style");
      style.id = "nav-btn-icon-rotate";
      style.innerHTML = `
          .nav-btn-icon {
            transform-origin: bottom center;
            display: inline-block;
            transition: color 0.2s;
          }
          .nav-btn-icon-animate {
            animation: icon-rotate-swing 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          .nav-btn:hover .nav-btn-icon {
            color: var(--nav-btn-icon-hover-color, #3b82f6);
          }
          @keyframes icon-rotate-swing {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(-10deg); }
            40% { transform: rotate(10deg); }
            60% { transform: rotate(-8deg); }
            80% { transform: rotate(8deg); }
            100% { transform: rotate(0deg); }
          }
        `;
      document.head.appendChild(style);
    }
  }, []);

  const iconRef = React.useRef(null);

  const handleMouseEnter = React.useCallback(() => {
    const el = iconRef.current;
    if (el) {
      el.classList.remove("nav-btn-icon-animate");
      void el.offsetWidth;
      el.classList.add("nav-btn-icon-animate");
    }
  }, []);

  React.useEffect(() => {
    const el = iconRef.current;
    if (!el) return;
    const handleAnimationEnd = () => {
      el.classList.remove("nav-btn-icon-animate");
    };
    el.addEventListener("animationend", handleAnimationEnd);
    return () => {
      el.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return { iconRef, handleMouseEnter };
};

export default function SiteNavigation() {
  const { i18n } = useDocusaurusContext();

  function NavButton({
    href,
    icon,
    label,
    labelen,
    external = false,
    iconColor = "#3b82f6",
  }) {
    const i18nhref = href.startsWith("/")
      ? i18n.currentLocale === "zh-Hans"
        ? href
        : `/en${href}`
      : href;
    const { iconRef, handleMouseEnter } = useNavButtonAnimation();

    return (
      <a
        href={i18nhref}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="nav-btn px-4 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-md bg-slate-800/40 transition-colors duration-200 cursor-pointer text-white text-sm relative overflow-hidden hover:bg-slate-600/40"
        style={
          {
            textDecoration: "none",
            ["--nav-btn-icon-hover-color" as any]: iconColor,
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
      >
        <div className="flex items-center gap-2 relative z-10">
          {icon && (
            <span className="nav-btn-icon" ref={iconRef}>
              {icon}
            </span>
          )}
          {i18n.currentLocale === "zh-Hans" ? label : labelen}
        </div>
      </a>
    );
  }

  function I18nButton() {
    const href = i18n.currentLocale === "zh-Hans" ? "/en" : "/";
    const { iconRef, handleMouseEnter } = useNavButtonAnimation();

    return (
      <a
        href={href}
        rel="noopener noreferrer"
        className="nav-btn px-4 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-md bg-slate-800/40 transition-colors duration-200 cursor-pointer text-white text-sm relative overflow-hidden hover:bg-slate-600/40"
        style={
          {
            textDecoration: "none",
            ["--nav-btn-icon-hover-color" as any]: "#1eff0090",
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
      >
        <div className="flex items-center justify-center gap-2 relative z-10 h-full">
          <span
            className="nav-btn-icon flex items-center justify-center h-full"
            ref={iconRef}
          >
            <FaLanguage className="w-5 h-5" />
          </span>
        </div>
      </a>
    );
  }

  const navs = [
    {
      href: "https://github.com/Casta-mere",
      icon: <FaGithub />,
      label: "GitHub",
      labelen: "GitHub",
      external: true,
      iconColor: "#3b82f6",
    },
    {
      href: "/blog",
      icon: <FaBlog />,
      label: "Blog",
      labelen: "Blog",
      iconColor: "#f59e42",
    },
    {
      href: "/docs/Intro",
      icon: <FaBook />,
      label: "系列文章",
      labelen: "Series Articles",
      iconColor: "#f472b6",
    },
    {
      href: "/docs/Snippets/Intro",
      icon: <FaCode />,
      label: "代码片段",
      labelen: "Code Snippets",
      iconColor: "#a259e6",
    },
    {
      href: "/blog/rss.xml",
      icon: <FaRss />,
      label: "RSS",
      labelen: "RSS",
      iconColor: "#ff0000da",
    },
  ];
  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-2 md:flex-nowrap md:gap-4">
      {[...navs, "i18n"].map((nav, idx) => (
        <React.Fragment key={typeof nav === "string" ? nav : nav.href}>
          {nav === "i18n" ? (
            <I18nButton />
          ) : (
            <NavButton
              {...(nav as {
                href: string;
                icon: React.ReactNode;
                label: string;
                labelen: string;
                external?: boolean;
                iconColor?: string;
              })}
            />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
