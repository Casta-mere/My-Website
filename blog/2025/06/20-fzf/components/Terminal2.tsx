import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
  Tunnel,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"列出虚拟机"}>
      <TerminalLine userName="casta" dir="~">
        <Cmd text="docker ps" />
        <Args text="-a" />
        <Tunnel text="|" />
        <Cmd text="fzf" />
        <Args text="--accept-nth 1" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text="0ddf7081e89f" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
