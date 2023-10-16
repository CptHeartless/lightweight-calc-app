import { FC } from 'react';
import { Button, Grid } from '../../ui';
import { createUseStyles } from 'react-jss';

export interface IHistoryItem {
  displayValue: string;
  value: string;
  answer: string;
}

export interface IHistoryProps {
  items: IHistoryItem[];
  onValueClick: (value: string) => void;
}

const useStyles = createUseStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(1.5),
  },
  title: {
    fontSize: '1.5rem',
  },
}));

export const History: FC<IHistoryProps> = ({ items, onValueClick }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container gap={1.5}>
      <div className={classes.title}>History</div>
      {items.map((historyItem, idx) => (
        <Grid key={`${historyItem.value}.${idx}`}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onValueClick(historyItem.value)}
            dangerouslySetInnerHTML={{ __html: historyItem.displayValue }}
          />{' '}
          ={' '}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onValueClick(historyItem.answer)}
          >
            {historyItem.answer}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
