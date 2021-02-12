export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ContextType {
  themeString: ThemeType;
  setThemeString: React.Dispatch<React.SetStateAction<ThemeType>>;
}
