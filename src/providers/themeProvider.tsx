import {ContextType, ThemeType} from '../types';
import React, {ReactChild, createContext, useState} from 'react';
import {dark, light} from '../utils/theme';

import {ThemeProvider as BaseThemeProvider} from '@emotion/react';

export const ThemeContext = createContext<ContextType | undefined>(undefined);

interface Props {
  children: ReactChild;
}

const ThemeProvider = (props: Props) => {
  const [themeString, setThemeString] = useState<ThemeType>(ThemeType.LIGHT);
  const themeObject = themeString === ThemeType.DARK ? dark : light;
  return (
    <ThemeContext.Provider value={{themeString, setThemeString}}>
      <BaseThemeProvider theme={themeObject}>
        {props.children}
      </BaseThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
