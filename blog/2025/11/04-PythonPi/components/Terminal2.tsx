import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"f-sting vs t-string"}>
      <REPLLine>user = "castamere"</REPLLine>
      <REPLLine text="greetings_f = f'Hello, {user}!'" />
      <REPLLine text="greetings_f" />
      <REPLLine text="'Hello, castamere!'" noprompt={true} />
      <REPLLine text="greetings_t = t'Hello, {user}!'" />
      <REPLLine text="greetings_t" />
      <REPLLine
        text="Template(strings=('Hello, ', '!'), interpolations=(Interpolation('castamere', 'user', None, ''),))"
        noprompt={true}
      />
    </TerminalRoot>
  );
}
