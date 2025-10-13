import {
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"synchronous.py"}>
      <TerminalLine dir="">
        <Cmd text="python" />
        <Line text="countsync.py" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text="One" />
        <Line text="Two" />
        <Line text="One" />
        <Line text="Two" />
        <Line text="One" />
        <Line text="Two" />
        <Line text="countsync.py executed in 6.03 seconds." />
      </TerminalResponse>
    </TerminalRoot>
  );
}
