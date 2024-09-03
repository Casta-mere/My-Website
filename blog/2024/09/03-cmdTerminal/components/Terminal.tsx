import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"终端模拟器"}>
      <TerminalLine userName="casta" dir="">
        <Cmd text="conda init" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="" conda="base">
        <Cmd text="ps" />
        <Args text="-a" />
      </TerminalLine>
      <TerminalResponse
        userName="casta"
        dir=""
        conda="base"
        response_style="NEWLINE"
      >
        <Line text="PID TTY          TIME CMD" />
        <Line text=" 12 tty1     00:00:00 sh" />
        <Line text=" 13 tty1     00:00:00 sh" />
        <Line text=" 18 tty1     00:00:00 sh" />
        <Line text=" 22 tty1     00:00:08 node" />
      </TerminalResponse>

      <TerminalLine userName="casta" dir="" conda="base">
        <Cmd text="conda activate" />
        <Line text="torch" />
      </TerminalLine>
      <TerminalLine userName="casta" dir="" conda="torch">
        <Cmd text="ll" />
      </TerminalLine>
      <TerminalResponse
        userName="casta"
        dir=""
        conda="torch"
        response_style="NEWLINE"
      >
        <Line text="total 1" />
        <Line text="drwxr-xr-x 2 root root 4096 Sep  3 10:00 ./" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
