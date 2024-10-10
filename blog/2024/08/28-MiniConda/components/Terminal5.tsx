import {
  Cmd,
  Line,
  TerminalLine,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal5({}) {
  return (
    <TerminalRoot title={"激活/退出环境"}>
      <TerminalLine dir="">
        <Cmd text="conda" />
        <Line text="activate demoenv" />
      </TerminalLine>
      <TerminalLine dir="" conda="demoenv">
        <Line text="conda deactivate" />
      </TerminalLine>
      <TerminalLine dir=""> </TerminalLine>
    </TerminalRoot>
  );
}
