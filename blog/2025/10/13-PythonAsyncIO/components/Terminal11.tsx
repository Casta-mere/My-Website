import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"gather"}>
      <REPLLine>import time</REPLLine>
      <REPLLine text="async def main():" />
      <REPLLine text="    task1 = asyncio.create_task(coro([10, 5, 2]))" />
      <REPLLine text="    task2 = asyncio.create_task(coro([3, 2, 1]))" />
      <REPLLine text='    print("Start:", time.strftime("%X"))' />
      <REPLLine text="    result = await asyncio.gather(task1, task2)" />
      <REPLLine text='    print("End:", time.strftime("%X"))' />
      <REPLLine text='    print(f"Both tasks done: {all((task1.done(), task2.done()))}")' />
      <REPLLine text="    return result" />
      <REPLLine text="    " />
      <REPLLine>result = asyncio.run(main())</REPLLine>
      <REPLLine text="Start: 14:38:49" noprompt={true} />
      <REPLLine text="End: 14:38:51" noprompt={true} />
      <REPLLine text="Both tasks done: True" noprompt={true} />
      <REPLLine text='print(f"result: {result}")' />
      <REPLLine text="result: [[2, 5, 10], [1, 2, 3]]" noprompt={true} />
    </TerminalRoot>
  );
}
