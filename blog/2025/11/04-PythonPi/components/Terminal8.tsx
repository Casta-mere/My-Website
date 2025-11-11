import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"python 3.14 try...finally block"}>
      <REPLLine text="def risky_operation():" />
      <REPLLine text="    try:" />
      <REPLLine text='        raise ValueError("Something went wrong!")' />
      <REPLLine text="    finally:" />
      <REPLLine text='        return "Suppressed"' />
      <REPLLine text="" />
      <REPLLine
        text="<stdin-0>:5: SyntaxWarning: 'return' in a 'finally' block"
        noprompt={true}
      />
      <REPLLine> risky_operation()</REPLLine>
      <TerminalResponse response_style="NEWLINE" dim={true}>
        <Line text="'Suppressed'" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
