import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal2({}) {
  return (
    <TerminalRoot title={"启动停止的容器"}>
      <TerminalLine userName="casta" dir="">
        <Cmd text="docker" />
        <Cmd text="attach" />
        <Args text="8e8b33105f4d" />
      </TerminalLine>
      <TerminalResponse response_style="NEWLINE">
        <Line text="You cannot attach to a stopped container, start it first" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
