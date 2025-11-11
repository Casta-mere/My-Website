import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"python 3.14 better error messages"}>
      <REPLLine>forr i in range(5):</REPLLine>
      <REPLLine text='  File "<python-input-1>", line 1' noprompt={true} />
      <REPLLine text="    forr i in range(5):" noprompt={true} />
      <REPLLine text="    ^^^^" noprompt={true} />
      <REPLLine
        text="SyntaxError: invalid syntax. Did you mean 'for'?"
        noprompt={true}
      />
      <REPLLine>message = "She said "Hello" to everyone"</REPLLine>
      <REPLLine text='  File "<python-input-2>", line 1' noprompt={true} />
      <REPLLine
        text='    message = "She said "Hello" to everyone"'
        noprompt={true}
      />
      <REPLLine text="                         ^^^^^" noprompt={true} />
      <REPLLine
        text="SyntaxError: invalid syntax. Is this intended to be part of the string?"
        noprompt={true}
      />
      <REPLLine text='text = fb"Binary {text}"' />
      <REPLLine text='  File "<python-input-3>", line 1' noprompt={true} />
      <REPLLine text='    text = fb"Binary {text}"' noprompt={true} />
      <REPLLine text="           ^^" noprompt={true} />
      <REPLLine
        text="SyntaxError: 'b' and 'f' prefixes are incompatible"
        noprompt={true}
      />
      <REPLLine>1 if True else pass</REPLLine>
      <REPLLine text='  File "<python-input-4>", line 1' noprompt={true} />
      <REPLLine text="    1 if True else pass" noprompt={true} />
      <REPLLine text="                   ^^^^" noprompt={true} />
      <REPLLine
        text="SyntaxError: expected expression after 'else', but statement is given"
        noprompt={true}
      />
    </TerminalRoot>
  );
}
