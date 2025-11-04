import {
  Line,
  REPLLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"async with"}>
      <REPLLine>import asyncio</REPLLine>
      <REPLLine>import aiohttp</REPLLine>
      <REPLLine text="async def check(url):" />
      <REPLLine text="    async with aiohttp.ClientSession() as session:" />
      <REPLLine text="        async with session.get(url) as response:" />
      <REPLLine text='            print(f"{url}: status -> {response.status}")' />
      <REPLLine text="    " />
      <REPLLine text="async def main():" />
      <REPLLine text="    websites = [" />
      <REPLLine text='        "https://realpython.com",' />
      <REPLLine text='        "https://pycoders.com",' />
      <REPLLine text='        "https://www.python.org",' />
      <REPLLine text="    ]" />
      <REPLLine text="    await asyncio.gather(*(check(url) for url in websites))" />
      <REPLLine text="    " />
      <REPLLine>asyncio.run(main())</REPLLine>
      <TerminalResponse
        userName="casta"
        dir="~"
        response_style="NEWLINE"
        dim={true}
      >
        <Line text="https://www.python.org: status -> 200" />
        <Line text="https://pycoders.com: status -> 200" />
        <Line text="https://realpython.com: status -> 200" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
