export interface ColorScheme {
  main: string;
  hover: string;
  underScore: string;
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
};

export default colors;
