import React from "react";
import styles from "./styles.module.css";

const USERNAME = "";
const CONDA = "";
const DIR = "castamere";
const RESPONSE_STYLE = "PLAIN";
const LINE_BREAK = "AUTO";

export const TerminalLine = ({
  children,
  conda = CONDA,
  userName = USERNAME,
  dir = DIR,
}) => {
  const userNamePath = userName === "" ? `~/${dir} ` : `${userName}@~/${dir} `;
  const env = conda === "" ? "" : `(${conda}) `;
  const frontMatterContent = (
    <>
      <span className={styles.env}>{env}</span>
      <span className={styles.rightArrow}>→ </span>
      <span className={styles.userNamePath}>{userNamePath}</span>
      <span className={styles.dolar}>$ </span>
    </>
  );

  return (
    <div>
      {frontMatterContent}
      {children}
    </div>
  );
};

export const MysqlLine = ({ children, linebreak = LINE_BREAK }) => {
  const childrenArray = React.Children.toArray(children);
  const frontMatterContent = [
    <span className={styles.mysql}>{"mysql> "}</span>,
    <span className={styles.mysql}>{"    -> "}</span>,
  ];

  switch (linebreak) {
    case "AUTO":
      return (
        <>
          {
            <div style={{ lineHeight: "1.5rem", alignItems: "" }}>
              {childrenArray.map((child, index) => {
                if (index === 0)
                  return (
                    <React.Fragment key={index}>
                      {frontMatterContent[0]}
                      {child}
                    </React.Fragment>
                  );

                if (
                  React.isValidElement(child) &&
                  typeof child.type === "function"
                ) {
                  if (child.type.name === "Dbkey") {
                    return (
                      <React.Fragment key={index}>
                        <br />
                        {frontMatterContent[1]}
                        {child}
                      </React.Fragment>
                    );
                  }
                  return <React.Fragment key={index}>{child}</React.Fragment>;
                }
              })}
            </div>
          }
        </>
      );

    case "MANUAL":
      return (
        <>
          {
            <div style={{ lineHeight: "1.5rem", alignItems: "" }}>
              {childrenArray.map((child, index) => {
                if (index === 0)
                  return (
                    <React.Fragment key={index}>
                      {frontMatterContent[0]}
                      {child}
                    </React.Fragment>
                  );

                if (React.isValidElement(child)) {
                  if (child.type === "br") {
                    return (
                      <React.Fragment key={index}>
                        <br />
                        {frontMatterContent[1]}
                      </React.Fragment>
                    );
                  } else
                    return <React.Fragment key={index}>{child}</React.Fragment>;
                }
              })}
            </div>
          }
        </>
      );
      break;
    default:
      break;
  }
};

export const TerminalResponse = ({
  children,
  conda = CONDA,
  userName = USERNAME,
  dir = DIR,
  response_style = RESPONSE_STYLE,
}) => {
  const childrenArray = React.Children.toArray(children);
  const userNamePath = userName === "" ? `~/${dir} ` : `${userName}@~/${dir} `;
  const env = conda === "" ? "" : `(${conda}) `;
  const frontMatterContent = (
    <>
      <span className={styles.env}>{env}</span>
      <span className={styles.rightArrow}>+ </span>
      <span className={styles.userNamePath}>{userNamePath}</span>
    </>
  );

  switch (response_style) {
    case "NEWLINE":
      return (
        <>
          <div style={{ lineHeight: "1.5rem", alignItems: "" }}>
            {childrenArray.map((child, index) => (
              <div key={index}>{child}</div>
            ))}
          </div>
        </>
      );

    case "PLAIN":
      return (
        <div style={{ lineHeight: "1.5rem", alignItems: "" }}>
          {childrenArray.map((child, index) => {
            const frontMatter =
              index === 0 ? (
                frontMatterContent
              ) : (
                <span style={{ opacity: 0 }}>{frontMatterContent}</span>
              );

            return (
              <div key={index}>
                {frontMatter}
                {child}
              </div>
            );
          })}
        </div>
      );

    default:
      break;
  }
};

export const TerminalHeader = ({ title }) => {
  return (
    <div className={styles.toolBar}>
      <div className={styles.dot} style={{ backgroundColor: "#fb5f57" }} />
      <div className={styles.dot} style={{ backgroundColor: "#fdbf2d" }} />
      <div className={styles.dot} style={{ backgroundColor: "#27cb3f" }} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export const Line = ({ text }) => {
  return <span className={styles.line}>{text} </span>;
};

export const Cmd = ({ text }) => {
  return <span className={styles.command}>{text} </span>;
};

export const Tunnel = ({ text }) => {
  return <span className={styles.tunnel}>{text} </span>;
};

export const Emph = ({ text }) => {
  return <span className={styles.emph}>{text} </span>;
};

export const Comment = ({ text }) => {
  return <span className={styles.comment}>{text} </span>;
};

export const Args = ({ text }) => {
  return <span className={styles.args}>{text} </span>;
};

export const Dbkey = ({ text }) => {
  return <span className={styles.dbkey}>{text} </span>;
};

export const Dbvalue = ({ text }) => {
  return <span className={styles.dbvalue}>{text} </span>;
};

export const Dbfunction = ({ text }) => {
  return <span className={styles.dbfunction}>{text}</span>;
};

export const TerminalRoot = ({ children, title }) => {
  return (
    <div className={styles.card} aria-hidden="true">
      <TerminalHeader title={title} />
      <div className={styles.main}>{children}</div>
    </div>
  );
};
