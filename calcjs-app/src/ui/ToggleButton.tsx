import { transparentize } from 'color2k';
import { ThemeProvider, createUseStyles, useTheme, DefaultTheme } from 'react-jss';
import { useState, type FC, type MouseEvent } from 'react';
import clsx from 'clsx';
import { lightTheme } from '../styles';
import { Button, type TButtonProps } from './Button';

export type TToggleButtonProps<Value extends string | undefined = string | undefined> = {
  selected?: boolean;
  value?: Value;
  onClick?: (event: MouseEvent<HTMLButtonElement>, value?: Value) => void;
} & TButtonProps;

const useStyles = createUseStyles(({ palette, mode }) => ({
  toggleButton: ({ color }: Pick<Required<TButtonProps>, 'color'>) => ({
    backgroundColor: palette[color][mode],
    borderColor: palette[color][mode],
    color: transparentize(palette[color].contrastText, 0.6),
    '&:hover': {
      backgroundColor: palette[color].main,
      borderColor: palette[color].main,
      color: transparentize(palette[color].contrastText, 0.4),
    },
  }),
  toggleButtonActive: ({ color }: Pick<Required<TButtonProps>, 'color'>) => ({
    '&:hover': {
      borderColor: palette[color][mode],
      backgroundColor: palette[color][mode],
    },
  }),
}));

export const ToggleButton = <Value extends string | undefined = string | undefined>({
  selected = false,
  className,
  color = 'default',
  value,
  onClick,
  ...buttonProps
}: TToggleButtonProps<Value>) => {
  const theme = useTheme<DefaultTheme>();
  const classes = useStyles({ color, theme });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event, value);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      color={color}
      className={clsx(className, selected ? classes.toggleButtonActive : classes.toggleButton)}
    />
  );
};

export const ToggleButtonPreview: FC = () => {
  const [{ secondary, primary, default_ }, setIsSelected] = useState<Record<string, boolean>>({
    primary: false,
    default_: false,
    secondary: false,
  });

  const handleClick = (color: string) => () => {
    setIsSelected((current) => ({
      ...current,
      [color]: !current[color],
    }));
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <ToggleButton color="default" selected={default_} onClick={handleClick('default_')}>
        Inv
      </ToggleButton>
      <ToggleButton color="secondary" selected={secondary} onClick={handleClick('secondary')}>
        Inv
      </ToggleButton>
      <ToggleButton color="primary" selected={primary} onClick={handleClick('primary')}>
        Inv
      </ToggleButton>
    </ThemeProvider>
  );
};
