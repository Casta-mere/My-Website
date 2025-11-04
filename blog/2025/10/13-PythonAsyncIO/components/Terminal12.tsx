import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"asyncio.as_completed()"}>
      <REPLLine text="async def main():" />
      <REPLLine text="    task1 = asyncio.create_task(coro([10, 5, 2]))" />
      <REPLLine text="    task2 = asyncio.create_task(coro([3, 2, 1]))" />
      <REPLLine text='    print("Start:", time.strftime("%X"))' />
      <REPLLine text="    for task in asyncio.as_completed([task1, task2]):" />
      <REPLLine text="        result = await task" />
      <REPLLine text="        print(f'result: {result} completed at {time.strftime('%X')}')" />
      <REPLLine text='    print("End:", time.strftime("%X"))' />
      <REPLLine text='    print(f"Both tasks done: {all((task1.done(), task2.done()))}")' />
      <REPLLine text="    " />
      <REPLLine>asyncio.run(main())</REPLLine>
      <REPLLine text="Start: 14:36:36" noprompt={true} />
      <REPLLine
        text="result: [1, 2, 3] completed at 14:36:37"
        noprompt={true}
      />
      <REPLLine
        text="result: [2, 5, 10] completed at 14:36:38"
        noprompt={true}
      />
      <REPLLine text="End: 14:36:38" noprompt={true} />
      <REPLLine text="Both tasks done: True" noprompt={true} />
    </TerminalRoot>
  );
}
