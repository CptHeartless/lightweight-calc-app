import {
  createContext,
  type FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  memo,
} from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import { darkTheme, lightTheme } from '../styles';
export interface IThemeModeContextValue {
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<IThemeModeContextValue>({
  setMode: () => {},
  toggleMode: () => {},
  mode: 'light',
});

export const useThemeMode = () => useContext(ThemeModeContext);

export interface IThemeProvider {
  mode?: 'dark' | 'light';
  children: ReactNode;
}
export const ThemeProvider: FC<IThemeProvider> = memo(
  ({ children, mode: defaultMode = 'light' }) => {
    const [mode, setMode] = useState(defaultMode);

    const toggleMode = useCallback(() => {
      setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
    }, []);

    const contextValue = useMemo(
      () => ({
        mode,
        setMode,
        toggleMode,
      }),
      [mode, toggleMode],
    );

    return (
      <ThemeModeContext.Provider value={contextValue}>
        <JssThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
          {children}
        </JssThemeProvider>
      </ThemeModeContext.Provider>
    );
  },
);
