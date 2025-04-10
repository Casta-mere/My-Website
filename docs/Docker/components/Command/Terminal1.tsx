import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal1({}) {
  return (
    <TerminalRoot title={"启动容器"}>
      <TerminalLine userName="casta" dir="">
        <Cmd text="docker" />
        <Cmd text="run" />
        <Args text="-it" />
        <Line text="ubuntu" />
      </TerminalLine>

      <TerminalLine userName="root" dir="8e8b33105f4d">
        <Cmd text="exit" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="">
        <Cmd text="docker" />
        <Cmd text="ps" />
        <Args text="-a" />
      </TerminalLine>

      <TerminalResponse response_style="NEWLINE">
        <Line text="CONTAINER ID  IMAGE   COMMAND      CREATED         STATUS                   " />
        <Line text='8e8b33105f4d  ubuntu  "/bin/bash"  18 seconds ago  Exited (0) 8 seconds ago ' />
      </TerminalResponse>
    </TerminalRoot>
  );
}
