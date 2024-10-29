import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
  Tunnel,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal1({}) {
  return (
    <TerminalRoot title={""}>
      <TerminalLine dir="">
        <Cmd text="echo" />
        <Line text="'DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE'" />
        <Tunnel text="|" />
        <Cmd text="awk" />
        <Args text="-F/" />
        <Line text="'{print $3}'" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="USER:PASSWORD@HOST:PORT" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
