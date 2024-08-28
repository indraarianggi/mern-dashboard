export type IThemeMode = "light" | "dark";

export interface IColorShade {
  [shade: number | string]: string;
}

export type IColorToken = Record<string, IColorShade>;
