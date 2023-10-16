import { useRef, useCallback, useState, type FC } from 'react';
import { renderOptionsForParser } from 'lw-math';
import { Buttons } from '../Buttons';
import { Display } from '../Display';
import { useCalculatorInput, useStorageValue } from '../../hooks';
import { History, IHistoryItem } from '../History';

export const Calculator: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDegree, setIsDegree] = useState(false);
  const [history, setHistory] = useStorageValue<IHistoryItem[]>('local', 'calculator.history', []);

  const { push, evaluate, pop, reset, render, setValue, state } = useCalculatorInput();

  const handleClick = useCallback(
    (action: string | number) => {
      if (state.isError || state.isEvaluated) {
        reset();
      }

      push(action);
      inputRef.current?.focus();
    },
    [push, reset, state.isError, state.isEvaluated],
  );

  const handleEval = useCallback(() => {
    const answer = evaluate({ isDegree });
    if (!Number.isNaN(answer)) {
      setHistory((currentHistory: IHistoryItem[]): IHistoryItem[] => [
        {
          displayValue: state.value,
          value: render(renderOptionsForParser),
          answer: String(answer),
        },
        ...currentHistory.slice(0, 9),
      ]);
    }
  }, [evaluate, isDegree, render, setHistory, state.value]);

  return (
    <>
      <Display
        ref={inputRef}
        value={state.value}
        answer={state.answer}
        isError={state.isError}
        isEvaluated={state.isEvaluated}
      />
      <Buttons
        onAllClear={reset}
        onClear={pop}
        onEval={handleEval}
        onClick={handleClick}
        isDegree={isDegree}
        onMeasureChange={setIsDegree}
      />
      <History items={history} onValueClick={setValue} />
    </>
  );
};
