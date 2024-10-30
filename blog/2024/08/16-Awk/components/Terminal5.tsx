import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal5({}) {
  return (
    <TerminalRoot title={""}>
      <TerminalLine dir="">
        <Cmd text="cat" />
        <Line text="script3.txt" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="BEGIN {" />
        <Line text="    math = 0" />
        <Line text="    english = 0" />
        <Line text="    computer = 0" />
        <Line text=" " />
        <Line text='    printf "NAME       NO.    MATH  ENGLISH  COMPUTER   TOTAL\n"' />
        <Line text='    printf "-------------------------------------------------\n"' />
        <Line text="}" />
        <Line text="{" />
        <Line text="    math+=$3" />
        <Line text="    english+=$4" />
        <Line text="    computer+=$5" />
        <Line text='    printf "%-10s %-6s %4d %8d %8d %8d\n", $1, $2, $3,$4,$5, $3+$4+$5' />
        <Line text="}" />
        <Line text="END {" />
        <Line text='    printf "-------------------------------------------------\n"' />
        <Line text='    printf "  TOTAL:    %10d %8d %8d \n", math, english, computer' />
        <Line text='    printf "AVERAGE:    %10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR' />
        <Line text="}" />
      </TerminalResponse>
      <TerminalLine dir="">
        <Cmd text="awk" />
        <Args text="-f script3.awk" />
        <Line text="score.txt" />
      </TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="NAME       NO.    MATH  ENGLISH  COMPUTER   TOTAL" />
        <Line text="-------------------------------------------------" />
        <Line text="Castamere  21074    78       84       77      239" />
        <Line text="TodayRed   21199    78       45       82      205" />
        <Line text="Tom        21222    48       77       71      196" />
        <Line text="Mike       25373    87       97       95      279" />
        <Line text="Bob        24154    40       57       62      159" />
        <Line text="-------------------------------------------------" />
        <Line text="  TOTAL:           331      360      387 " />
        <Line text="AVERAGE:         66.20    72.00    77.40" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
