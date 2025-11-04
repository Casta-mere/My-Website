import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"asynchronous generator"}>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine text="async def powers_of_two(stop=10):" />
      <REPLLine text="    exponent = 0" />
      <REPLLine text="    while exponent < stop:" />
      <REPLLine text="        yield 2**exponent" />
      <REPLLine text="        exponent += 1" />
      <REPLLine text="        await asyncio.sleep(0.2)  # Simulate some asynchronous work" />
      <REPLLine text="" />
      <REPLLine text="async def main():" />
      <REPLLine text="    g = []" />
      <REPLLine text="    async for i in powers_of_two(5):" />
      <REPLLine text="        g.append(i)" />
      <REPLLine text="    print(g)" />
      <REPLLine text="    f = [j async for j in powers_of_two(5) if not (j // 3 % 5)]" />
      <REPLLine text="    print(f)" />
      <REPLLine>asyncio.run(main())</REPLLine>
      <TerminalResponse
        userName="casta"
        dir="~"
        response_style="NEWLINE"
        dim={true}
      >
        <Line text="[1, 2, 4, 8, 16]" />
        <Line text="[1, 2, 16]" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
