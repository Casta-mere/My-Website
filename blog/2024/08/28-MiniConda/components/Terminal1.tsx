import {
  Cmd,
  Comment,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal1({}) {
  return (
    <TerminalRoot title={"找到安装路径"}>
      <TerminalLine dir="">
        <Cmd text="conda -V" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="zsh: command not found: conda" />
      </TerminalResponse>

      <TerminalLine dir="">
        <Cmd text="ll" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="total 143M" />
        <Comment text="即 miniconda3 的路径" />
        <Line text="drwxr-xr-x 19 root root 4.0K Sep 19 16:54 miniconda3" />
        <Line text="-rwxrwxrwx  1 root root 143M Sep 19 16:38 Miniconda3-latest-Linux-x86_64.sh" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
