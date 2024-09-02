import {
  TerminalLine,
  TerminalResponse,
} from "@site/src/components/CommandLine";
import styles from "@site/src/components/CommandLine/styles.module.css";
import React from "react";

export default function Terminal({}) {
  const dir2 = ".ssh";
  return (
    <div className={styles.card}>
      <div className={styles.toolBar}>
        <div className={styles.dot} style={{ backgroundColor: "#fb5f57" }} />
        <div className={styles.dot} style={{ backgroundColor: "#fdbf2d" }} />
        <div className={styles.dot} style={{ backgroundColor: "#27cb3f" }} />
        <div className={styles.title} aria-hidden="true">
          公钥处理(服务器端)
        </div>
      </div>
      {/* cat ~/.ssh/id_rsa.pub >> authorized_keys */}
      <div className={styles.main}>
        <TerminalLine dir={dir2}>
          <span className={styles.command}>cat</span>
          <span className={styles.line}> ./id_rsa.pub</span>
          <span className={styles.tunnel}> &gt;&gt;</span>
          <span className={styles.line}> authorized_keys</span>
        </TerminalLine>

        <TerminalLine dir={dir2}>
          <span className={styles.command}>vi</span>
          <span className={styles.line}> /etc/ssh/sshd_config</span>
        </TerminalLine>
        <TerminalLine dir={dir2}>
          {/* cat /etc/ssh/sshd_config | grep -v '^#' | grep -v '^$' */}
          <span className={styles.command}>cat</span>
          <span className={styles.line}> /etc/ssh/sshd_config</span>
          <span className={styles.tunnel}> |</span>
          <span className={styles.command}> grep</span>
          <span className={styles.line}> -v '^#'</span>
          <span className={styles.tunnel}> |</span>
          <span className={styles.command}> grep</span>
          <span className={styles.line}> -v '^$'</span>
        </TerminalLine>

        <TerminalResponse dir={dir2}>
          <span className={styles.line}>
            Include /etc/ssh/sshd_config.d/*.conf
          </span>
          <span className={styles.comment}># 把下面这行取消注释即可</span>
          <span className={styles.emph}>PubkeyAuthentication yes</span>
          <span className={styles.line}>KbdInteractiveAuthentication no</span>
          <span className={styles.line}>UsePAM yes</span>
          <span className={styles.line}>...</span>
          <span className={styles.line}>
            AuthorizedKeysCommandUser ecs-instance-connect
          </span>
        </TerminalResponse>
      </div>
    </div>
  );
}
