import {
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal3({}) {
  return (
    <TerminalRoot title={"列出现有环境"}>
      <TerminalLine dir="">
        <Cmd text="conda" />
        <Line text="env list" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="# conda environments:" />
        <Line text="#" />
        <Line text="base                     /home/casta/miniconda3" />
        <Line text="myenv                    /home/casta/miniconda3/envs/myenv" />
        <Line text="testenv                  /home/casta/miniconda3/envs/testenv" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
