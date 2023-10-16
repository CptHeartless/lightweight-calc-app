import {
  useState,
  type ReactElement,
  type MouseEvent,
  type JSX,
  type FC,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { ThemeProvider, createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { lightTheme } from '../../styles';
import { Grid } from '../Grid/Grid';
import { type TToggleButtonProps, ToggleButton } from '../ToggleButton/ToggleButton';

export interface IToggleButtonGroupProps<V extends string | undefined> {
  children: Array<ReactElement<TToggleButtonProps<V>>>;
  color?: TToggleButtonProps['color'];
  value: V;
  onChange?: (event: MouseEvent<HTMLButtonElement>, value?: V) => void;
  fullWidth?: boolean;
  className?: string;
}

const useStyles = createUseStyles({
  button: {
    borderRadius: 0,
    '&:after': {
      content: '',
      position: 'relative',
      display: 'block',
      height: '50%',
      width: '1px',
      backgroundColor: '#000',
    },
    '&:first-child': {
      borderRadius: '3px 0 0 3px',
    },
    '&:last-child': {
      borderRadius: '0 3px 3px 0',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export const ToggleButtonGroup = <Value extends string | undefined = string | undefined>({
  children,
  color,
  onChange,
  value,
  fullWidth,
  className,
}: IToggleButtonGroupProps<Value>): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child, {
          className: clsx(child.props?.className, classes.button),
          onClick: onChange,
          selected: child.props?.value && child.props.value === value,
          color,
          fullWidth,
        });
      })}
    </div>
  );
};

export const ToggleButtonGroupPreview: FC = () => {
  const [selected, setSelected] = useState<'Rad' | 'Deg'>('Rad');

  const onChange = (_: unknown, value?: 'Rad' | 'Deg') => {
    setSelected(value ?? 'Rad');
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container gap={1}>
        <ToggleButtonGroup color="default" value={selected} onChange={onChange}>
          <ToggleButton value="Rad">Rad</ToggleButton>
          <ToggleButton value="Deg">Deg</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup color="secondary" value={selected} onChange={onChange}>
          <ToggleButton value="Rad">Rad</ToggleButton>
          <ToggleButton value="Deg">Deg</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup color="primary" value={selected} onChange={onChange}>
          <ToggleButton value="Rad">Rad</ToggleButton>
          <ToggleButton value="Deg">Deg</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </ThemeProvider>
  );
};
