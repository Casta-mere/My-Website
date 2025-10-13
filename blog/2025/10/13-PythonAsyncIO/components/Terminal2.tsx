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
    <TerminalRoot title={"chained.py"}>
      <TerminalLine dir="">
        <Cmd text="python" />
        <Line text="chained.py" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text="User coro: fetching user by user_id=1..." />
        <Line text="User coro: fetching user by user_id=2..." />
        <Line text="User coro: fetching user by user_id=3..." />
        <Line text="User coro: fetched user with user_id=2 (done in 0.5s)." />
        <Line text="Post coro: retrieving posts for User2..." />
        <Line text="User coro: fetched user with user_id=1 (done in 1.0s)." />
        <Line text="Post coro: retrieving posts for User1..." />
        <Line text="User coro: fetched user with user_id=3 (done in 1.2s)." />
        <Line text="Post coro: retrieving posts for User3..." />
        <Line text="Post coro: got 2 posts by User2 (done in 1.8s):" />
        <Line text=" - Post 1 by User2" />
        <Line text=" - Post 2 by User2" />
        <Line text="Post coro: got 2 posts by User1 (done in 1.6s):" />
        <Line text=" - Post 1 by User1" />
        <Line text=" - Post 2 by User1" />
        <Line text="Post coro: got 2 posts by User3 (done in 1.5s):" />
        <Line text=" - Post 1 by User3" />
        <Line text=" - Post 2 by User3" />
        <Line text="" />
        <Line text="==> Total time: 2.68 seconds" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
