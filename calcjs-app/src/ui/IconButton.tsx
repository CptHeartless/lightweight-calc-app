import clsx from 'clsx';
import { JSX } from 'react';
import type { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { transparentize } from 'color2k';

const useStyles = createUseStyles(({ spacing, palette }) => ({
  root: {
    cursor: 'pointer',
    padding: spacing(1),
    margin: 0,
    backgroundColor: transparentize(palette.text.primary, 1),
    border: 'none',
    color: palette.text.primary,
    fontSize: '1.5rem',
    borderRadius: '50%',
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s ease-in',
    '&:hover': {
      backgroundColor: transparentize(palette.text.primary, 0.8),
    },
  },
}));

export type TIconButtonProps = {
  className?: string;
} & JSX.IntrinsicElements['button'];

const IconButton: FC<TIconButtonProps> = ({ className, ...props }) => {
  const classes = useStyles();
  return <button {...props} className={clsx(classes.root, className)} />;
};

export default IconButton;
