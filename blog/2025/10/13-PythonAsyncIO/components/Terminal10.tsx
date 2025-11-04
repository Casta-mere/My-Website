import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"asyncio"}>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine text="async def coro(numbers):" />
      <REPLLine text="    await asyncio.sleep(min(numbers))" />
      <REPLLine text="    return list(reversed(numbers))" />
      <REPLLine text="    " />
      <REPLLine text="async def main():" />
      <REPLLine text="    task = asyncio.create_task(coro([3, 2, 1]))" />
      <REPLLine text='    print(f"{type(task) = }")' />
      <REPLLine text='    print(f"{task.done() = }")' />
      <REPLLine text="    return await task" />
      <REPLLine text="    " />
      <REPLLine>result = asyncio.run(main())</REPLLine>
      <REPLLine text="type(task) = <class '_asyncio.Task'>" noprompt={true} />
      <REPLLine text="task.done() = False" noprompt={true} />
      <REPLLine text='print(f"result: {result}")' />
      <REPLLine text="result: [1, 2, 3]" noprompt={true} />
    </TerminalRoot>
  );
}
