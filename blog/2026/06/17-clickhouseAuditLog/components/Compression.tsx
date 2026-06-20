import {
  Cmd,
  Emph,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Compression({}) {
  return (
    <TerminalRoot title={"列存的红利：逐列压缩比"}>
      <TerminalLine dir="">
        <Cmd text="clickhouse-client --queries-file compression-by-column.sql" />
      </TerminalLine>

      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="┌─name──────────────────┬─compressed_size─┬─uncompressed_size─┬───ratio────┐" />
        <Line text="│ Body                  │ 46.14 GiB       │ 127.31 GiB        │ 2.76       │" />
        <Line text="│ Title                 │ 1.20 GiB        │ 2.63 GiB          │ 2.19       │" />
        <Line text="│ ...                   │ ...             │...                │ ...        │" />
        <Line text="│ ...                   │ ...             │...                │ ...        │" />
        <Line text="│ AnswerCount           │ 21.82 MiB       │ 622.35 MiB        │ 28.53      │" />
        <Emph text="│ FavoriteCount         │ 280.95 KiB      │ 508.40 MiB        │ 1853.02    │" />
        <Line text="│ ViewCount             │ 95.77 MiB       │ 736.45 MiB        │ 7.69       │" />
        <Line text="│ LastEditorUserId      │ 179.47 MiB      │ 736.45 MiB        │ 4.1        │" />
        <Line text="│ ContentLicense        │ 5.45 MiB        │ 847.92 MiB        │ 155.5      │" />
        <Line text="│ OwnerDisplayName      │ 14.30 MiB       │ 142.58 MiB        │ 9.97       │" />
        <Emph text="│ PostTypeId            │ 20.93 MiB       │ 565.30 MiB        │ 27         │" />
        <Line text="│ CreationDate          │ 314.17 MiB      │ 964.64 MiB        │ 3.07       │" />
        <Line text="│ LastEditDate          │ 346.32 MiB      │ 964.64 MiB        │ 2.79       │" />
        <Line text="│ LastEditorDisplayName │ 5.46 MiB        │ 124.25 MiB        │ 22.75      │" />
        <Line text="│ CommunityOwnedDate    │ 2.21 MiB        │ 509.60 MiB        │ 230.94     │" />
        <Line text="└───────────────────────┴─────────────────┴───────────────────┴────────────┘" />
      </TerminalResponse>

      <TerminalResponse dir="" response_style="NEWLINE" dim={true}>
        <Line text="22 rows in set. Elapsed: 0.008 sec." />
      </TerminalResponse>
    </TerminalRoot>
  );
}
