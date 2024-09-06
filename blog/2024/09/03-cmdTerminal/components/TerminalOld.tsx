import React from "react";
import {
  Args,
  Cmd,
  Dbkey,
  Emph,
  Line,
  MysqlLine,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "./CommandLine/CommandLine";

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
        <Emph text=" 22 tty1     00:00:08 node" />
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

      <TerminalLine userName="casta" dir="" conda="torch">
        <Cmd text="mysql" />
        <Args text="-uroot -p" />
      </TerminalLine>

      <MysqlLine linebreak="MANUAL">
        <Dbkey text="use" />
        <Line text="my_db;" />
        <br />
        <Dbkey text="select" />
        <Line text="*" />
        <br />
        <Dbkey text="from" />
        <Line text="user" />
        <br />
        <Dbkey text="orderby" />
        <Line text="id" />
        <Dbkey text="desc" />
        <Line text=";" />
      </MysqlLine>

      <TerminalResponse response_style="NEWLINE">
        <Line text="+--------+-------------+-----------------------+" />
        <Line text="| id     | name        | email                 |" />
        <Line text="+--------+-------------+-----------------------+" />
        <Line text="| cltaau | Castamere   | castamerego@gmail.com |" />
        <Line text="| cltx76 | Achinoise   | 981193371@qq.com      |" />
        <Line text="| cltzwk | flamingo952 | 1719538377@qq.com     |" />
        <Line text="+--------+-------------+-----------------------+" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
