import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal4({}) {
  return (
    <TerminalRoot title={""}>
      <TerminalLine dir="">
        <Cmd text="cat" />
        <Line text="script2.txt" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="{" />
        <Line text="    score[$1] = $3 + $4 + $5" />
        <Line text="}" />
        <Line text="END{" />
        <Line text="    for(j in score) " />
        <Line text='        printf("%s score is %d\n", j, score[j]) ' />
        <Line text="}" />
      </TerminalResponse>
      <TerminalLine dir="">
        <Cmd text="awk" />
        <Args text="-f script2.awk" />
        <Line text="score.txt" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="Tom score is 196" />
        <Line text="TodayRed score is 205" />
        <Line text="Bob score is 159" />
        <Line text="Mike score is 279" />
        <Line text="Castamere score is 239" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
