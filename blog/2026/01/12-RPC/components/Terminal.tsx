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
    <TerminalRoot title={"client.py"}>
      <TerminalLine dir="">
        <Cmd text="python" />
        <Line text="client.py" />
      </TerminalLine>

      <TerminalResponse
        userName="casta"
        dir="~"
        response_style="NEWLINE"
        dim={true}
      >
        <Line text="Original list: [5, 2, 9, 1, 5, 6]" />
        <Line text="Sorted list: [1, 2, 5, 5, 6, 9]" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
