import {
  Args,
  Cmd,
  Comment,
  Emph,
  Line,
  TerminalLine,
  TerminalResponse,
  TerminalRoot,
} from "@site/src/components/CommandLine";
import React from "react";

export default function Termina3({}) {
  return (
    <TerminalRoot title={"样例"}>
      <TerminalLine userName="casta" dir="">
        <Comment text="# 为 docusaurus 创建一个 mysql，3306 端口 映射到外部 3307" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="">
        <Cmd text="docker" />
        <Cmd text="run" />
        <Args text="--name docu-mysql" />
        <Args text="-p 3307:3306" />
        <Args text="-d -e MYSQL_ROOT_PASSWORD=my-secret-pw" />
        <Line text="mysql" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="" response_style="NEWLINE">
        <Line text="8f081125197a565100624ee652dd6c28d7f315fe7a2419a29e84172b8acbfd55" />
      </TerminalResponse>

      <TerminalLine userName="casta" dir="">
        <Comment text="# 使用如下命令查看 mysql 服务是否起来了" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="">
        <Cmd text="docker" />
        <Cmd text="logs" />
        <Line text="8f0" />
      </TerminalLine>

      <TerminalResponse userName="casta" dir="" response_style="NEWLINE">
        <Line text="Entrypoint script for MySQL Server 9.2.0-1.el9 started." />
        <Line text="..." />
        <Line text="InnoDB initialization has started." />
        <Line text="..." />
        <Line text="MySQL init process done. Ready for start up." />
        <Line text="..." />
        <Emph text="/usr/sbin/mysqld: ready for connections. Version: '9.2.0'" />
      </TerminalResponse>

      <TerminalLine userName="casta" dir="">
        <Comment text="# 如果出现 ready for connections 就是起来了，可能需要五分钟左右" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="">
        <Comment text="# 在主机用如下命令尝试连接" />
      </TerminalLine>

      <TerminalLine userName="casta" dir="">
        <Cmd text="mysql" />
        <Args text="-uroot" />
        <Args text="-pmy-secret-pw" />
        <Args text="-P3307" />
      </TerminalLine>
    </TerminalRoot>
  );
}
