import {
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"谁动过这家店的权限？"}>
      <TerminalLine dir="">
        <Cmd text="clickhouse-client --queries-file investigate.sql" />
      </TerminalLine>

      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="┌───────────timestamp─┬─userId─┬─action─┬─outcome─┐" />
        <Line text="│ 2026-03-14 21:07:11 │ u_8821 │ manage │ allowed │" />
        <Line text="│ 2026-03-14 20:55:02 │ u_3140 │ update │ denied  │" />
        <Line text="│ 2026-02-19 11:32:40 │ u_3140 │ manage │ denied  │" />
        <Line text="│ 2026-01-08 08:15:22 │ u_8821 │ update │ allowed │" />
        <Line text="└─────────────────────┴────────┴────────┴─────────┘" />
      </TerminalResponse>

      <TerminalResponse dir="" response_style="NEWLINE" dim={true}>
        <Line text="4 rows in set. Elapsed: 0.021 sec. Processed 1.31 million rows, 47.2 MB." />
      </TerminalResponse>
    </TerminalRoot>
  );
}
