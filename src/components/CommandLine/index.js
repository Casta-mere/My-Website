import React from "react";
import styles from "./styles.module.css";

export const TerminalLine = ({
  children,
  blinking = false,
  dir = "castamere",
}) => (
  <div>
    <span className={styles.rightArrow} aria-hidden="true">
      →{"  "}
    </span>
    <span className={styles.userName} aria-hidden="true">
      ~/{dir}{" "}
    </span>
    {blinking ? (
      <span className={styles.blinkCursor} aria-hidden="true">
        ${" "}
      </span>
    ) : (
      <span className={styles.dolar}>$</span>
    )}{" "}
    <span>{children}</span>
  </div>
);

export const TerminalResponse = ({ children, dir = "castamere" }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div
      style={{
        lineHeight: "1.5rem",
        alignItems: "",
        // justifyContent: "left",
        // justifyItems: "left",
        // alignItems: "normal",
      }}
    >
      {childrenArray.map((child, index) => {
        // 判断当前是否是第一行
        if (index === 0) {
          return (
            <>
              <span className={styles.rightArrow} aria-hidden="true">
                +{" "}
              </span>
              <span className={styles.userName} aria-hidden="true">
                ~/{dir}{" "}
              </span>
              {child}
            </>
          );
        } else {
          // 对后续行添加等长的空白
          return (
            <div>
              <span style={{ opacity: 0 }}>
                <span className={styles.rightArrow} aria-hidden="true">
                  →{"  "}
                </span>
                <span className={styles.userName} aria-hidden="true">
                  ~/{dir}{" "}
                </span>
              </span>
              {child}
            </div>
          );
        }
      })}
    </div>
  );
};

const TerminalResponse_ = ({ children }) => (
  <div style={{ lineHeight: "1.5rem" }}>
    <span className={styles.rightArrow} aria-hidden="true">
      →{"  "}
    </span>

    <span className={styles.userName} aria-hidden="true">
      ~/{"castamere"}{" "}
    </span>
    <span>{children}</span>
  </div>
);

export const TerminalRoot = ({ children, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.toolBar}>
        <div className={styles.dot} style={{ backgroundColor: "#fb5f57" }} />
        <div className={styles.dot} style={{ backgroundColor: "#fdbf2d" }} />
        <div className={styles.dot} style={{ backgroundColor: "#27cb3f" }} />
        <div className={styles.title} aria-hidden="true">
          {title}
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default function Terminal({}) {
  return (
    <div className={styles.card}>
      <div className={styles.toolBar}>
        <div className={styles.dot} style={{ backgroundColor: "#fb5f57" }} />
        <div className={styles.dot} style={{ backgroundColor: "#fdbf2d" }} />
        <div className={styles.dot} style={{ backgroundColor: "#27cb3f" }} />
        <div className={styles.title} aria-hidden="true">
          Console
        </div>
      </div>
      <div className={styles.main}>
        <TerminalLine>
          <span className={styles.command}>ll</span>
        </TerminalLine>
        <TerminalResponse>
          <span>total 143M</span>
          <span>
            -rw-r--r-- 1 143M Aug 29 11:41 Miniconda3-latest-Linux-x86_64.sh
          </span>
          <span>drwxr-xr-x 1 4.0K Aug 22 14:55 My-Website</span>
        </TerminalResponse>

        <TerminalLine>
          <span className={styles.command}>chmod</span> 777
          Miniconda3-latest-Linux-x86_64.sh
        </TerminalLine>

        <TerminalLine>
          <span className={styles.command}>ll</span>
        </TerminalLine>
        <TerminalResponse>
          <span>total 143M</span>
          <span>
            -rwxrwxrwx 1 143M Aug 29 11:41 Miniconda3-latest-Linux-x86_64.sh
          </span>
          <span>drwxr-xr-x 1 4.0K Aug 22 14:55 My-Website</span>
        </TerminalResponse>

        <TerminalResponse>./Miniconda3-latest-Linux-x86_64.sh</TerminalResponse>
        <TerminalLine />
        <TerminalResponse>2</TerminalResponse>
      </div>
    </div>
  );
}
