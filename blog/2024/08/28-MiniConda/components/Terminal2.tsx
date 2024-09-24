import {
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal2({}) {
  return (
    <TerminalRoot title={"初始化"}>
      <TerminalLine dir="">
        <Cmd text="/root/miniconda3/bin/conda init" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="no change     /root/miniconda3/condabin/conda" />
        <Line text="no change     ..." />
        <Line text="no change     /root/miniconda3/etc/profile.d/conda.csh" />
        <Line text="modified      /root/.bashrc" />
        <Line text="    " />
        <Line text="==> For changes to take effect, close and re-open your current shell. <==" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
