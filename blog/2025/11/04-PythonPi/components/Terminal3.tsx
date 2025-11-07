import { REPLLine, TerminalRoot } from "@site/src/components/CommandLine";
import React from "react";

export default function Terminal({}) {
  return (
    <TerminalRoot title={"f-sting vs t-string"}>
      <REPLLine text="attributes = {'src': 'castamere.jpg', 'alt': 'casatamere'}" />
      <REPLLine text="template = t'<img {attributes} />'" />

      <REPLLine text="template.strings" />
      <REPLLine text="('<img ', ' />')" noprompt={true} />
      <REPLLine text="template.interpolations" />
      <REPLLine
        text="(Interpolation({'src': 'castamere.jpg', 'alt': 'casatamere'}, 'attributes', None, ''),)"
        noprompt={true}
      />
      <REPLLine text="type(template.interpolations[0])" />
      <REPLLine
        text="<class 'string.templatelib.Interpolation'>"
        noprompt={true}
      />
      <REPLLine text="template.values" />
      <REPLLine
        text="({'src': 'castamere.jpg', 'alt': 'casatamere'},)"
        noprompt={true}
      />
      <REPLLine text="type(template.values[0])" />
      <REPLLine text="<class 'dict'>" noprompt={true} />
    </TerminalRoot>
  );
}
