import clsx from 'clsx';
import type { JSX, FC } from 'react';
import { createUseStyles, DefaultTheme, useTheme } from 'react-jss';

export type TButtonProps = {
  color?: 'default' | 'primary' | 'secondary';
  variant?: 'contained' | 'outlined';
  className?: string;
  fullWidth?: boolean;
} & JSX.IntrinsicElements['button'];

type TButtonStylesProps = Pick<Required<TButtonProps>, 'color' | 'fullWidth'>;

const useStyles = createUseStyles(({ palette, spacing, mode }) => ({
  button: ({ fullWidth }: TButtonStylesProps) => ({
    cursor: 'pointer',
    fontFamily: 'Roboto',
    margin: 0,
    padding: spacing(1),
    borderRadius: 3,
    fontWeight: 500,
    fontSize: '1em',
    width: fullWidth ? '100%' : undefined,
    transition: '0.15s ease-out',
    transitionProperty: 'background-color, color, border-color',
  }),
  containedVariantButton: ({ color }: TButtonStylesProps) => ({
    background: palette[color].main,
    color: palette[color].contrastText,
    border: `1px solid ${palette[color].main}`,
    '&:hover': {
      backgroundColor: palette[color][mode === 'dark' ? 'light' : 'dark'],
      borderColor: palette[color][mode === 'dark' ? 'light' : 'dark'],
    },
  }),
  outlinedVariantButton: ({ color }: TButtonStylesProps) => ({
    background: 'transparent',
    color: palette[color].main,
    border: `1px solid ${palette[color].main}`,
    '&:hover': {
      borderColor: palette[color][mode === 'dark' ? 'light' : 'dark'],
      color: palette[color][mode === 'dark' ? 'light' : 'dark'],
    },
  }),
}));

export const Button: FC<TButtonProps> = ({
  className,
  color = 'default',
  fullWidth = false,
  variant = 'contained',
  ...props
}) => {
  const theme = useTheme<DefaultTheme>();
  const classes = useStyles({ color, fullWidth, theme });
  return (
    <button
      type="button"
      {...props}
      className={clsx(classes.button, classes[`${variant}VariantButton`], className)}
    />
  );
};
