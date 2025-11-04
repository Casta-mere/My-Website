import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"Python REPL"}>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine text="async def main():" />
      <REPLLine text='    print("Hello...")' />
      <REPLLine text="    await asyncio.sleep(1)" />
      <REPLLine text='    print("World!")' />
      <REPLLine text="" />
      <REPLLine>routine = main()</REPLLine>
      <REPLLine>routine</REPLLine>
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
