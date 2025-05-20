import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Termina3({}) {
  return (
    <TerminalRoot title={"查看虚拟机信息"}>
      <TerminalLine userName="casta" dir="ovftool">
        <Cmd text="./ovftool.exe" />
        <Args text="vi://root:Admin123@1192.168.0.1/vm1" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="ovftool" response_style="NEWLINE">
        <Line text="OVF version:   1.0" />
        <Line text="VirtualApp:    false" />
        <Line text="Name:          vm1" />
        <Line text="" />
        <Line text="Download Size:  Unknown" />
        <Line text="" />
        <Line text="Deployment Sizes:" />
        <Line text="  Flat disks:   256.00 GB" />
        <Line text="  Sparse disks: Unknown" />
        <Line text="" />
        <Line text="  (note: Source included files for which the file size is unknown)" />
        <Line text="Networks:" />
        <Line text="  Name:        VM NET3" />
        <Line text="  Description: The VM NET3 network" />
        <Line text="" />
        <Line text="Virtual Machines:" />
        <Line text="  Name:               vm1" />
        <Line text="  Operating System:   centos7_64guest" />
        <Line text="  Virtual Hardware:" />
        <Line text="    Families:         vmx-14" />
        <Line text="    Number of CPUs:   4" />
        <Line text="    Cores per socket: automatic" />
        <Line text="    Memory:           16.00 GB" />
        <Line text="" />
        <Line text="    Disks:" />
        <Line text="      Index:          0" />
        <Line text="      Instance ID:    11" />
        <Line text="      Capacity:       256.00 GB" />
        <Line text="      Disk Types:     SCSI-VirtualSCSI" />
        <Line text="" />
        <Line text="    NICs:" />
        <Line text="      Adapter Type:   VmxNet3" />
        <Line text="      Connection:     VM NET3" />
        <Line text="" />
        <Line text="      Adapter Type:   VmxNet3" />
        <Line text="      Connection:     VM NET3" />
        <Line text="" />
        <Line text="References:" />
        <Line text="  File:  /243/VirtualAHCIController0:0" />
        <Line text="  File:  /243/ParaVirtualSCSIController0:0" />
        <Line text="  File:  /243/nvram" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
