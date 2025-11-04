import {
  Args,
  Cmd,
  Line,
  REPLLine,
  TerminalLine,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"asyncio REPL"}>
      <TerminalLine dir="">
        <Cmd text="python" />
        <Line text="-m" />
        <Args text="asyncio" />
      </TerminalLine>
      <REPLLine noprompt={true}>
        asyncio REPL 3.13.3 (main, Jun 25 2025, 17:27:59) ... on darwin
      </REPLLine>
      <REPLLine noprompt={true}>
        Use "await" directly instead of "asyncio.run()".
      </REPLLine>
      <REPLLine noprompt={true}>
        Type "help", "copyright", "credits" or "license" for more information.
      </REPLLine>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine></REPLLine>
    </TerminalRoot>
  );
}
