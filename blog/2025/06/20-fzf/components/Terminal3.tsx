import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"列出虚拟机"}>
      <TerminalLine userName="casta" dir="~">
        <Cmd text="grep" />
        <Args text="-rnI" />
        <Args text="--color=always" />
        <Args text="-E" />
        <Line text="docker" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text='2024/09/03-cmdTerminal/index.mdx:335:    <Cmd text="docker ps" />' />
        <Line text='2024/09/03-cmdTerminal/index.mdx:367:    <Cmd text="docker ps" />' />
        <Line text="2025/06/20-fzf/index.md:21:- [选择并进入 Docker 容器](/blog/fzf#docker)" />
        <Line text="2025/06/20-fzf/index.md:183:docker ps | fzf \" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
