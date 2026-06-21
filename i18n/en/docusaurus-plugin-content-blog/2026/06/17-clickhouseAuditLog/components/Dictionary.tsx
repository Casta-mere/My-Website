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
    <TerminalRoot title={"Dictionary: Bare String vs LowCardinality"}>
      <TerminalLine dir="">
        <Cmd text="# Bare String: each row stores the entire string as-is" />
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
        <Cmd text="# LowCardinality(String): dictionary stores each unique string once + integer indices" />
      </TerminalLine>

      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="dict:  0 = ...::teamMember   1 = ...::item   2 = ...::auditLog" />
        <Emph text="data:  [0, 1, 0, 2, 1, 0]   ← each row only 1 byte" />
      </TerminalResponse>

      <TerminalResponse dir="" response_style="NEWLINE" dim={true}>
        <Line text="dict ~40 B + 6 B ≈ 46 B   (~3× smaller, can further apply ZSTD on top)" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
