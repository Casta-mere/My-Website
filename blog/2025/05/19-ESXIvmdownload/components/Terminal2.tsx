import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Termina2({}) {
  return (
    <TerminalRoot title={"查看虚拟机信息"}>
      <TerminalLine userName="casta" dir="ovftool">
        <Cmd text="./ovftool.exe" />
        <Args text="vi://root:Admin123@1192.168.0.1/vm1" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="ovftool" response_style="NEWLINE">
        <Line text="Error: Message is: Received SOAP response fault from [<SSL(<io_obj p:0x000002586b26c6a8, h:840, <TCP '192.168.0.1 : 65459'>, <TCP '192.168.0.2 : 443'>>), /sdk>]: exportVm" />
        <Line text="Another task is already in progress.," />
        <Line text="Fault cause: vim.fault.TaskInProgress" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
