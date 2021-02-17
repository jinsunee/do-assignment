const gray: string[] = ['#F2F2F2', '#E5E5E5', '#999999'];
const black: string[] = ['#121212', '#353535'];
const blueGray: string[] = ['#C1C8DD', '#F0F2F8', '#EEF1FA'];
const navy: string[] = ['#334476'];

export const colors = {
  light: '#ffffff',
  dark: '#121212',
  black,
  gray,
  blueGray,
  navy,
  primary: '#4360D7',
  negative: '#F37B7B',
};

export const light = {
  background: colors.light,
  backgroundGray: gray[1],
  font: colors.black[0],
  primary: colors.primary,
  negative: colors.negative,
};

export const dark = {
  background: colors.dark,
  backgroundGray: colors.dark,
  font: colors.light,
  primary: colors.primary,
  negative: colors.negative,
};

export type Theme = typeof light;
