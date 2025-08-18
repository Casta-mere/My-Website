interface ColorScheme {
  main: string;
  hover: string;
  underScore: string;
}

interface BadgeColorScheme {
  badgeColor: string;
  arrowColor: string;
}

const colors: Record<string, ColorScheme> = {
  light: {
    main: "text-blue-500",
    hover: "hover:text-orange-500",
    underScore: "bg-orange-500",
  },
  dark: {
    main: "text-blue-400",
    hover: "hover:text-violet-500",
    underScore: "bg-violet-500",
  },
  homepage: {
    main: "text-gray-300",
    hover: "hover:text-violet-500",
    underScore: "bg-violet-500",
  },
};

export const badgeColors: Record<string, BadgeColorScheme> = {
  external: {
    badgeColor: "bg-orange-500",
    arrowColor: "border-t-orange-500",
  },
  internal: {
    badgeColor: "bg-blue-500",
    arrowColor: "border-t-blue-500",
  },
  inPage: {
    badgeColor: "bg-violet-500",
    arrowColor: "border-t-violet-500",
  },
  resource: {
    badgeColor: "bg-amber-800",
    arrowColor: "border-t-amber-800",
  },
};

export default colors;
