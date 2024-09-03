import {
  Cmd,
  Comment,
  Emph,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
  Tunnel,
} from "@site/src/components/CommandLine";
import React from "react";
export default function Terminal({}) {
  const dir2 = ".ssh";
  return (
    <TerminalRoot title="公钥处理(服务器端)">
      <TerminalLine dir={dir2}>
        <Cmd text="cat" />
        <Line text="./id_rsa.pub" />
        <Tunnel text="&gt;&gt;" />
        <Line text="authorized_keys" />
      </TerminalLine>

      <TerminalLine dir={dir2}>
        <Cmd text="vi" />
        <Line text="/etc/ssh/sshd_config" />
      </TerminalLine>

      <TerminalLine dir={dir2}>
        <Cmd text="cat" />
        <Line text="/etc/ssh/sshd_config" />
        <Tunnel text="|" />
        <Cmd text="grep" />
        <Line text="-v '^#'" />
        <Tunnel text="|" />
        <Cmd text="grep" />
        <Line text="-v '^$'" />
      </TerminalLine>

      <TerminalResponse dir={dir2}>
        <Line text="Include /etc/ssh/sshd_config.d/*.conf" />
        <Comment text="# 把下面这行取消注释即可" />
        <Emph text="PubkeyAuthentication yes" />
        <Line text="KbdInteractiveAuthentication no" />
        <Line text="UsePAM yes" />
        <Line text="..." />
        <Line text="AuthorizedKeysCommandUser ecs-instance-connect" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
