import type { ReactNode, FC } from 'react';
import { type DefaultTheme, createUseStyles, useTheme } from 'react-jss';

export interface IGridProps {
  templateAreas?: string;
  templateColumns?: string;
  templateRows?: string;
  columnStart?: number | string;
  columnEnd?: number | string;
  inline?: boolean;
  gap?: number;
  area?: string;
  container?: boolean;
  children: ReactNode;
}

type TUseStyleProps = Omit<IGridProps, 'children'>;

const useStyles = createUseStyles((theme) => ({
  grid: (props: TUseStyleProps) => ({
    gridArea: props.area,
    gridColumnStart: props.columnStart,
    gridColumnEnd: props.columnEnd,
    ...(props.container
      ? {
          display: props.inline ? 'inline-grid' : 'grid',
          gridTemplateColumns: props.templateColumns,
          gridTemplateRows: props.templateRows,
          gridTemplateAreas: props.templateAreas,
          gridGap: theme.spacing(props.gap ?? 0),
        }
      : {}),
  }),
}));

export const Grid: FC<IGridProps> = ({
  templateColumns,
  templateRows,
  templateAreas,
  area,
  inline = false,
  gap = 0,
  container = false,
  columnStart,
  columnEnd,
  children,
}) => {
  const theme = useTheme<DefaultTheme>();
  const classes = useStyles({
    container,
    templateColumns,
    templateRows,
    templateAreas,
    columnStart,
    columnEnd,
    area,
    inline,
    gap,
    theme,
  });
  return <div className={classes.grid}>{children}</div>;
};
