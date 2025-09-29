import {
  Args,
  Cmd,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
  Tunnel,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"列出日志"}>
      <TerminalLine dir="">
        <Cmd text="sudo zgrep" />
        <Args text="-hE '^(2025-09-24 0[6-9]:|2025-09-24 1[0-4]:)'" />
        <Line text="/var/log/unattended-upgrades/unattended-upgrades.log*" />
        <Tunnel text="|" />
        <Cmd text="egrep" />
        <Args text="-i 'start|install|dpkg|download|finish|took|error|warn'" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="~" response_style="NEWLINE">
        <Line text="2025-09-24 06:21:19,900 WARNING Could not figure out development release: Distribution data outdated. Please check for an update for distro-info-data. See /usr/share/doc/distro-info-data/README.Debian for details." />
        <Line text="2025-09-24 06:21:19,902 INFO Starting unattended upgrades script" />
        <Line text="2025-09-24 06:21:24,856 INFO Writing dpkg log to /var/log/unattended-upgrades/unattended-upgrades-dpkg.log" />
        <Line text="2025-09-24 14:48:41,863 INFO All upgrades installed" />
        <Line text="2025-09-24 14:48:55,647 WARNING Could not figure out development release: Distribution data outdated. Please check for an update for distro-info-data. See /usr/share/doc/distro-info-data/README.Debian for details." />
        <Line text="2025-09-24 14:48:55,650 INFO Starting unattended upgrades script" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
