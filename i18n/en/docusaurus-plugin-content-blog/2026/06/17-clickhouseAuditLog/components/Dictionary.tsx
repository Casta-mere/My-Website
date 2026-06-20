import {
  Cmd,
  Emph,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Dictionary({}) {
  return (
    <TerminalRoot title={"字典编码：裸 String vs LowCardinality"}>
      <TerminalLine dir="">
        <Cmd text="# 裸 String：每一行都把整个字符串原样存一遍" />
      </TerminalLine>

      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="business::hrm::teamMember" />
        <Line text="business::menu::item" />
        <Line text="business::hrm::teamMember" />
        <Line text="business::hrm::auditLog" />
        <Line text="business::menu::item" />
        <Line text="business::hrm::teamMember" />
      </TerminalResponse>

      <TerminalResponse dir="" response_style="NEWLINE" dim={true}>
        <Line text="6 行 × ~22 B ≈ 132 B" />
      </TerminalResponse>

      <TerminalLine dir="">
        <Cmd text="# LowCardinality(String)：字典只存一次 + 整数下标" />
      </TerminalLine>

      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="dict:  0 = ...::teamMember   1 = ...::item   2 = ...::auditLog" />
        <Emph text="data:  [0, 1, 0, 2, 1, 0]   ← 每行仅 1 字节" />
      </TerminalResponse>

      <TerminalResponse dir="" response_style="NEWLINE" dim={true}>
        <Line text="dict ~40 B + 6 B ≈ 46 B   (~3× 更小, 之上还能再叠 ZSTD)" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
