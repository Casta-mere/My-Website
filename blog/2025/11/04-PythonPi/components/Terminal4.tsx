import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"python t-string"}>
      <REPLLine>render(template)</REPLLine>
      <REPLLine text="Traceback (most recent call last):" noprompt={true} />
      <REPLLine
        text='  File "<python-input-1>", line 1, in <module>'
        noprompt={true}
      />
      <REPLLine text="    render(template)" noprompt={true} />
      <REPLLine text="    ~~~~~~^^^^^^^^^^" noprompt={true} />
      <REPLLine
        text='  File "<python-input-2>", line 3, in render'
        noprompt={true}
      />
      <REPLLine text="    return ''.join(result)" noprompt={true} />
      <REPLLine text="           ~~~~~~~^^^^^^^^" noprompt={true} />
      <REPLLine
        text="TypeError: sequence item 1: expected str instance, string.templatelib.Interpolation found"
        noprompt={true}
      />
    </TerminalRoot>
  );
}
