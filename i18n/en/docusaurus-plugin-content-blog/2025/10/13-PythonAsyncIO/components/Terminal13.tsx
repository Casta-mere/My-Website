import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"Python 3.11+"}>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine text="async def coro_a():" />
      <REPLLine text="    await asyncio.sleep(1)" />
      <REPLLine text='    raise ValueError("Error in coro A")' />
      <REPLLine text="    " />
      <REPLLine text="async def coro_b():" />
      <REPLLine text="    await asyncio.sleep(2)" />
      <REPLLine text='    raise TypeError("Error in coro B")' />
      <REPLLine text="    " />
      <REPLLine text="async def coro_c():" />
      <REPLLine text="    await asyncio.sleep(0.5)" />
      <REPLLine text='    raise IndexError("Error in coro C")' />
      <REPLLine text="    " />
      <REPLLine text="async def main():" />
      <REPLLine text="    results = await asyncio.gather(" />
      <REPLLine text="        coro_a()," />
      <REPLLine text="        coro_b()," />
      <REPLLine text="        coro_c()," />
      <REPLLine text="        return_exceptions=True" />
      <REPLLine text="    )" />
      <REPLLine text="    exceptions = [e for e in results if isinstance(e," />
      <REPLLine text="    if exceptions:" />
      <REPLLine text='        raise ExceptionGroup("Errors", exceptions)' />
      <REPLLine text="    " />
    </TerminalRoot>
  );
}
