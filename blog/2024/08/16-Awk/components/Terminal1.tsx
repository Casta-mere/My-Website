import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal1({}) {
  return (
    <TerminalRoot title={""}>
      <TerminalLine dir="">
        <Cmd text="cat script1.awk" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="{" />
        <Line text='    print "----------------------------" ;' />
        <Line text='    print "Name: " $1 ", ID: " $2 ;' />
        <Line text="}" />
      </TerminalResponse>

      <TerminalLine dir="">
        <Cmd text="awk" />
        <Args text="-f script1.awk" />
        <Line text="script1.txt" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="----------------------------" />
        <Line text="Name: Castamere, ID: 21074" />
        <Line text="----------------------------" />
        <Line text="Name: TodayRed, ID: 21199" />
        <Line text="----------------------------" />
        <Line text="Name: Tom, ID: 21222" />
        <Line text="----------------------------" />
        <Line text="Name: Mike, ID: 25373" />
        <Line text="----------------------------" />
        <Line text="Name: Bob, ID: 24154" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
