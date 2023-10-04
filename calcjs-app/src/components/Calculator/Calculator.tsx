import { useRef, useCallback, useState, type FC } from 'react';
import { Buttons } from '../Buttons';
import { Display } from '../Display';
import { useCalculatorInput } from '../../hooks/useCalculatorInput/useCalculatorInput';

export const Calculator: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDegree, setIsDegree] = useState(false);

  const { push, evaluate, pop, reset, state } = useCalculatorInput();

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
    evaluate({ isDegree });
  }, [evaluate, isDegree]);

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
    </>
  );
};
