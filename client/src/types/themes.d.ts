import { IColorToken, IThemeMode } from "./theme";

interface IPalettePrimary extends IColorToken {
  main: string;
  light: string;
}

interface IPaletteNonPrimary extends IColorToken {
  main: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      mode: IThemeMode;
      primary: IPalettePrimary;
      secondary: IPaletteNonPrimary;
      neutral: IPaletteNonPrimary;
      background: {
        default: string;
        alt: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette: {
      mode: IThemeMode;
      primary: IPalettePrimary;
      secondary: IPaletteNonPrimary;
      neutral: IPaletteNonPrimary;
      background: {
        default: string;
        alt: string;
      };
    };
  }
}
