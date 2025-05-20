import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Termina4({}) {
  return (
    <TerminalRoot title={"导出虚拟机"}>
      <TerminalLine userName="casta" dir="ovftool">
        <Cmd text="./ovftool.exe" />
        <Args text="vi://root:Admin123@1192.168.0.1/vm1" />
        <Args text="./export" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="ovftool" response_style="NEWLINE">
        <Line text="Opening VI source: vi://root@10.136.48.111:443/vm1" />
        <Line text="Opening OVF target: ./export" />
        <Line text="Writing OVF package: ./export\vm1\vm1.ovf" />
        <Line text="Transfer Completed" />
        <Line text="Completed successfully" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
