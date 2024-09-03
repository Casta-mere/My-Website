import {
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  const dir2 = ".ssh";
  return (
    <TerminalRoot title="生成公钥和私钥">
      <TerminalLine>
        <Cmd text="cd" />
        <Line text="~/.ssh" />
      </TerminalLine>

      <TerminalLine dir={dir2}>
        <Cmd text="ll" />
      </TerminalLine>
      <TerminalResponse dir={dir2}>
        <Line text="-rw------- 1 root root 0 Sep 2 14:20 authorized_keys" />
      </TerminalResponse>

      <TerminalLine dir={dir2}>
        <Cmd text="ssh-keygen" />
      </TerminalLine>

      <TerminalResponse dir={dir2}>
        <Line text="Generating public/private rsa key pair." />
        <Line text="Enter file in which to save the key (/root/.ssh/id_rsa):" />
        <Line text="Enter passphrase (empty for no passphrase):" />
        <Line text="Enter same passphrase again:" />
        <Line text="Your identification has been saved in /root/.ssh/id_rsa." />
        <Line text="Your public key has been saved in /root/.ssh/id_rsa.pub." />
        <Line text="The key fingerprint is:" />
        <Line text="SHA256:VqQqYQ9KZ4ZjwY6z6YQqYQ9KZ4ZjwY6z6YQqYQ9KZ4ZjwY6z6YQqYQ9K root@localhost.localdomain" />
        <Line text="The key's randomart image is:" />
        <Line text="+---[RSA 3072]----+" />
        <Line text="|            .+O@@|" />
        <Line text="|            ..=.X|" />
        <Line text="|            ..=oo|" />
        <Line text="|         . o +.= |" />
        <Line text="|        S + o =  |" />
        <Line text="|       o B o @ . |" />
        <Line text="|        . +.  .  |" />
        <Line text="|        o B  .   |" />
        <Line text="|       @.B.E...  |" />
        <Line text="+----[SHA256]-----+" />
      </TerminalResponse>

      <TerminalLine dir={dir2}>
        <Cmd text="ll" />
      </TerminalLine>
      <TerminalResponse dir={dir2}>
        <Line text="-rw------- 1 root root    0 Sep  2 14:20 authorized_keys" />
        <Line text="-rw------- 1 root root 2622 Sep  2 14:23 id_rsa" />
        <Line text="-rw-r--r-- 1 root root  582 Sep  2 14:23 id_rsa.pub" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
