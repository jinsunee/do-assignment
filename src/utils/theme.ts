const grey: string[] = ['F2F2F2'];

export const colors = {
  light: '#ffffff',
  dark: '#121212',
  black: '#000000',
  grey,
  blueGrey: '#C1C8DD',
  primary: '#4360D7',
  negative: '#F37B7B',
};

export const light = {
  background: colors.light,
  font: colors.black,
};

export const dark = {
  background: colors.dark,
  font: colors.light,
};

export type Theme = typeof light;
