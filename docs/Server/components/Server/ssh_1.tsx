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
        生成公钥和私钥
        </div>
      </div>
      <div className={styles.main}>
        <TerminalLine>
          <span className={styles.command}>cd</span> 
          <span className={styles.line}>~/.ssh</span>
        </TerminalLine>
        <TerminalLine dir={dir2}>
          <span className={styles.command}>ll</span>
        </TerminalLine>
        <TerminalResponse dir={dir2}>
          <span className={styles.line}>
            -rw------- 1 root root 0 Sep 2 14:20 authorized_keys
          </span>
        </TerminalResponse>

        <TerminalLine dir={dir2}>
          <span className={styles.command}>ssh-keygen</span>
        </TerminalLine>

        <TerminalResponse dir={dir2}>
            <span className={styles.line}> Generating public/private rsa key pair. </span>
            <span className={styles.line}> Enter file in which to save the key (/root/.ssh/id_rsa): </span>
            <span className={styles.line}> Enter passphrase (empty for no passphrase): </span>
            <span className={styles.line}> Enter same passphrase again: </span>
            <span className={styles.line}> Your identification has been saved in /root/.ssh/id_rsa </span>
            <span className={styles.line}> Your public key has been saved in /root/.ssh/id_rsa.pub </span>
            <span className={styles.line}> The key fingerprint is: </span>
            <span className={styles.line}> SHA256:9iFLvQzXdFlnMzTelKc5XMwUjRy66r2qidpdw root@iZbp1ahynkd9jjipkv6nxpZ </span>
            <span className={styles.line}> The key's randomart image is: </span>
            <span className={styles.line}> +---[RSA 3072]----+ </span>
            <span className={styles.line}> |            .+O@@| </span>
            <span className={styles.line}> |            ..=.X| </span>
            <span className={styles.line}> |            ..=oo| </span>
            <span className={styles.line}> |         . o +.= | </span>
            <span className={styles.line}> |        S + o =  | </span>
            <span className={styles.line}> |       o B o @ . | </span>
            <span className={styles.line}> |        . +.  .  | </span>
            <span className={styles.line}> |        o B  .   | </span>
            <span className={styles.line}> |       @.B.E...  | </span>
            <span className={styles.line}> +----[SHA256]-----+ </span>
        </TerminalResponse>
        
        <TerminalLine dir={dir2}>
          <span className={styles.command}>ll</span>
        </TerminalLine>
        <TerminalResponse dir={dir2}>
            <span className={styles.line}>-rw------- 1 root root    0 Sep  2 14:20 authorized_keys</span>
            <span className={styles.line}>-rw------- 1 root root 2622 Sep  2 14:23 id_rsa</span>
            <span className={styles.line}>-rw-r--r-- 1 root root  582 Sep  2 14:23 id_rsa.pub</span>
        </TerminalResponse>

      </div>
    </div>
  );
}
