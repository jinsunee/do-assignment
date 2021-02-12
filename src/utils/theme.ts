const gray: string[] = ['#F2F2F2', '#E5E5E5'];
const black: string[] = ['#121212', '#353535'];

export const colors = {
  light: '#ffffff',
  dark: '#121212',
  black,
  gray,
  blueGrey: '#C1C8DD',
  primary: '#4360D7',
  negative: '#F37B7B',
};

export const light = {
  background: colors.light,
  font: colors.black[0],
  primary: colors.primary,
  negative: colors.negative,
};

export const dark = {
  background: colors.dark,
  font: colors.light,
  primary: colors.primary,
  negative: colors.negative,
};

export type Theme = typeof light;
