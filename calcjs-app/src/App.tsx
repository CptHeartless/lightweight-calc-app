import type { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { Calculator } from './components/Calculator';
import { useThemeMode } from './providers/ThemeProvider.tsx';
import { useMediaQuery } from './hooks/useMediaQuery/useMediaQuery.ts';
import { useEffect } from 'react';

const useStyles = createUseStyles(({ spacing, palette }) => ({
  app: {
    padding: spacing(1.5),
    color: palette.text.primary,
  },
  '@global body': {
    backgroundColor: palette.background.default,
  },
}));

export const App: FC = () => {
  const classes = useStyles();
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const { setMode } = useThemeMode();

  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  return (
    <div className={classes.app}>
      <Calculator />
    </div>
  );
};
