import {ContextType, ThemeType} from '../types';
import {dark, light} from '../utils/theme';
import {useCallback, useContext} from 'react';

import {ThemeContext} from '../providers/themeProvider';

function useTheme() {
  const context = useContext<ContextType | undefined>(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const {themeString, setThemeString} = context;
  const toggleTheme = useCallback(() => {
    if (themeString === ThemeType.LIGHT) {
      setThemeString(ThemeType.DARK);
    } else if (themeString === ThemeType.DARK) {
      setThemeString(ThemeType.LIGHT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeString]);
  return {
    theme: themeString === ThemeType.LIGHT ? light : dark,
    toggleTheme,
  };
}

export default useTheme;
