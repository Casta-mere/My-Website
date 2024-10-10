import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal4({}) {
  return (
    <TerminalRoot title={"创建环境"}>
      <TerminalLine dir="">
        <Cmd text="conda" />
        <Line text="create" />
        <Args text="-n demoenv" />
        <Line text="python=2.7" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="Downloading and Extracting Packages:" />
        <Line text=" " />
        <Line text="Preparing transaction: done" />
        <Line text="Verifying transaction: done" />
        <Line text="Executing transaction: done" />
        <Line text="#" />
        <Line text="# To activate this environment, use" />
        <Line text="#" />
        <Line text="#     $ conda activate demoenv" />
        <Line text="#" />
        <Line text="# To deactivate an active environment, use" />
        <Line text="#" />
        <Line text="#     $ conda deactivate" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
