import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"python t-string"}>
      <REPLLine>from string.templatelib import Template</REPLLine>
      <REPLLine text="for i in dir(Template):" />
      <REPLLine text="    if not i.startswith('_'):" />
      <REPLLine text="        print(i)" />
      <TerminalResponse response_style="NEWLINE" dim={true}>
        <Line text="interpolations" />
        <Line text="strings" />
        <Line text="values" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
