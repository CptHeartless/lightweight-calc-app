import { useEffect } from 'react';

export const useKeyboardEvent = (onKeyPress: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keypress', onKeyPress);

    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, [onKeyPress]);
};
