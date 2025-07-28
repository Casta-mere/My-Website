import React from "react";
import { FaBlog, FaBook, FaCode, FaGithub } from "react-icons/fa6";

export default function SiteNavGation() {
  function NavButton({
    href,
    icon,
    label,
    external = false,
    iconColor = "#3b82f6",
  }) {
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

    const iconRef = React.useRef(null);
    const handleMouseEnter = () => {
      const el = iconRef.current;
      if (el) {
        el.classList.remove("nav-btn-icon-animate");
        void el.offsetWidth;
        el.classList.add("nav-btn-icon-animate");
      }
    };
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

    return (
      <a
        href={href}
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
        <span className="nav-btn-dot"></span>
        <div className="flex items-center gap-2 relative z-10">
          {icon && (
            <span className="nav-btn-icon" ref={iconRef}>
              {icon}
            </span>
          )}
          {label}
        </div>
      </a>
    );
  }

  const navs = [
    {
      href: "https://github.com/Casta-mere",
      icon: <FaGithub />,
      label: "GitHub",
      external: true,
      iconColor: "#3b82f6",
    },
    {
      href: "/blog",
      icon: <FaBlog />,
      label: "Blog",
      iconColor: "#f59e42",
    },
    {
      href: "/docs/Intro",
      icon: <FaBook />,
      label: "系列文章",
      iconColor: "#f472b6",
    },
    {
      href: "/docs/Snippets/Intro",
      icon: <FaCode />,
      label: "代码片段",
      iconColor: "#a259e6",
    },
  ];
  return (
    <nav className="flex gap-4">
      {navs.map((nav) => (
        <NavButton key={nav.href} {...nav} />
      ))}
    </nav>
  );
}
