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
    <TerminalRoot title={"countasync.py"}>
      <TerminalLine dir="">
        <Cmd text="python" />
        <Line text="countasync.py" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text="One" />
        <Line text="One" />
        <Line text="One" />
        <Line text="Two" />
        <Line text="Two" />
        <Line text="Two" />
        <Line text="countasync.py executed in 2.00 seconds." />
      </TerminalResponse>
    </TerminalRoot>
  );
}
