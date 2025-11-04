import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"python 3.11+"}>
      <REPLLine text="try:" />
      <REPLLine text="    asyncio.run(main())" />
      <REPLLine text="except* ValueError as ve_group:" />
      <REPLLine text='    print(f"[ValueError handled] {ve_group.exceptions}")' />
      <REPLLine text="except* TypeError as te_group:" />
      <REPLLine text='    print(f"[TypeError handled] {te_group.exceptions}")' />
      <REPLLine text="except* IndexError as ie_group:" />
      <REPLLine text='    print(f"[IndexError handled] {ie_group.exceptions}")' />
      <REPLLine text="    " />
      <REPLLine
        text="[ValueError handled] (ValueError('Error in coro A'),)"
        noprompt={true}
      />
      <REPLLine
        text="[TypeError handled] (TypeError('Error in coro B'),)"
        noprompt={true}
      />
      <REPLLine
        text="[IndexError handled] (IndexError('Error in coro C'),)"
        noprompt={true}
      />
    </TerminalRoot>
  );
}
