import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"asyncio.run()"}>
      <REPLLine>asyncio.run(routine)</REPLLine>
      <TerminalResponse
        userName="casta"
        dir="~"
        response_style="NEWLINE"
        dim={true}
      >
        <Line text="Hello..." />
        <Line text="World!" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
