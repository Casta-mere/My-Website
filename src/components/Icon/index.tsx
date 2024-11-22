import { Icon as IconifyIcon } from "@iconify/react";
import React from "react";

interface IconProp {
  icon?: string;
  width?: number;
}

const icons = {
  bash: { iconName: "tabler:brand-powershell", size: 28 },
  c: { iconName: "logos:c", size: 20 },
  cpp: { iconName: "logos:c-plusplus", size: 20 },
  css: { iconName: "vscode-icons:file-type-css", size: 28 },
  docusaurus: { iconName: "logos:docusaurus", size: 20 },
  js: { iconName: "skill-icons:javascript", size: 22 },
  json: { iconName: "carbon:json", size: 36 },
  jsx: { iconName: "catppuccin:typescript-react", size: 20 },
  latex: { iconName: "file-icons:latex", size: 36 },
  markdown: { iconName: "skill-icons:markdown-dark", size: 28 },
  npm: { iconName: "logos:npm-icon", size: 20 },
  prisma: { iconName: "vscode-icons:file-type-prisma", size: 24 },
  python: { iconName: "logos:python", size: 20 },
  ts: { iconName: "logos:typescript-icon-round", size: 20 },
  tsx: { iconName: "catppuccin:typescript-react", size: 20 },
  typescript: { iconName: "logos:typescript-icon-round", size: 20 },
  vscode: { iconName: "vscode-icons:file-type-vscode", size: 20 },
};

export function parseIcon(metastring?: string): JSX.Element | null {
  const iconRe = /icon=(?<quote>["'])(?<icon>.*?)\1/;

  const icon = metastring?.match(iconRe)?.groups?.icon ?? "";

  if (!icon) return null;

  const iconName = icons[icon]?.iconName;
  const iconSize = icons[icon]?.size;

  return <IconifyIcon icon={iconName} width={iconSize} />;
}

export function Icon({ icon, width = 20 }: IconProp): JSX.Element | null {
  if (!icon) return null;

  const iconName = icons[icon]?.iconName;
  const iconSize = width == 20 ? icons[icon]?.size : width;
  if (icons[icon]?.color)
    return (
      <IconifyIcon
        icon={iconName}
        width={iconSize}
        color={icons[icon]?.color}
      />
    );

  return <IconifyIcon icon={iconName} width={iconSize} />;
}
