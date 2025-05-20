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
    <TerminalRoot title={"列出虚拟机"}>
      <TerminalLine userName="casta" dir="ovftool">
        <Cmd text="./ovftool.exe" />
        <Args text="vi://root:Admin123@192.168.0.1" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="ovftool" response_style="NEWLINE">
        <Line text="Error: Found wrong kind of object (ResourcePool). Possible completions are:" />
        <Line text="135" />
        <Line text="Test_CentOS8" />
        <Line text="VMware vCenter Server" />
        <Line text="bcec" />
        <Line text="PE1" />
        <Line text="CE2" />
        <Line text="PC2" />
        <Line text="k8s_master" />
        <Line text="c05945-win10" />
        <Line text="j02769-win10" />
        <Line text="z05350" />
        <Line text="52-S7-FWNFV" />
        <Line text="FWNFVS7" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
