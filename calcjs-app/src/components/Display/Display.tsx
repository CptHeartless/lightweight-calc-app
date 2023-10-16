import { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useThemeMode } from '../../providers/ThemeProvider';
import { IconButton } from '../../ui';

export interface IDisplayProps {
  value: string;
  answer: string | number;
  isError: boolean;
  isEvaluated: boolean;
}

const useStyles = createUseStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: spacing(1, 0),
    width: '100%',
    borderRadius: 3,
    padding: spacing(1, 2),
    boxSizing: 'border-box',
    border: `2px solid ${palette.divider}`,
    '&:focus': {
      borderColor: palette.primary.main,
    },
  },
  adornment: {
    display: 'flex',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    overflow: 'hidden',
  },
  answer: {
    color: palette.text.secondary,
    paddingBottom: spacing(0.5),
    fontSize: '0.875em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  input: {
    whiteSpace: 'nowrap',
    color: palette.text.primary,
    fontSize: '1.5em',
    '@global .bracket-placeholder': {
      opacity: 0.5,
    },
  },
  themeModeButton: {
    '& circle, & path': {
      transition: 'fill 0.15s ease-in',
      fill: 'transparent',
    },
    '&:hover': {
      '& circle, & path': {
        fill: 'currentcolor',
      },
    },
  },
}));

export const Display = forwardRef<HTMLInputElement, IDisplayProps>(
  ({ value, answer, isError, isEvaluated }, ref) => {
    const classes = useStyles();
    const { mode, toggleMode } = useThemeMode();

    const visibleValue = isEvaluated ? answer : value;

    return (
      <div tabIndex={0} className={classes.root} ref={ref}>
        <div className={classes.adornment}>
          <IconButton onClick={toggleMode} className={classes.themeModeButton}>
            {mode === 'light' ? <IoMoonOutline /> : <IoSunnyOutline />}
          </IconButton>
        </div>
        <div className={classes.content}>
          <div
            className={classes.answer}
            dangerouslySetInnerHTML={{
              __html:
                isEvaluated && !isError
                  ? `${value} =`
                  : Number.isNaN(answer)
                  ? '&nbsp'
                  : `Ans = ${answer}`,
            }}
          />
          <div
            className={classes.input}
            dangerouslySetInnerHTML={{ __html: isError ? 'Error!' : visibleValue }}
          />
        </div>
      </div>
    );
  },
);
