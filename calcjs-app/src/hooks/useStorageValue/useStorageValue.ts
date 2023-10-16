import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeStorage } from '../../services/SafeStorage';

export const useStorageValue = <
  Value extends Record<any, any> | number | string | null | undefined = string,
>(
  type: 'session' | 'local',
  key: string,
  initialValue: Value,
): [Value, (value: Value | ((currentValue: Value) => Value)) => void] => {
  const storage = useRef(new SafeStorage(type));

  const getInitialValue = (): Value => {
    const storageValue = storage.current.get(key);

    return storageValue ? JSON.parse(storageValue) : initialValue;
  };

  const [value, setValue] = useState<Value>(getInitialValue());

  useEffect(() => {
    if (storage.current.get(key) === null) {
      storage.current.set(key, JSON.stringify(initialValue));
    }
  }, [key, initialValue]);

  const handleSetValue = useCallback(
    (nextValue: Value | ((currentValue: Value) => Value)) => {
      setValue((currentValue: Value) => {
        const result = typeof nextValue === 'function' ? nextValue(currentValue) : nextValue;
        storage.current.set(key, JSON.stringify(result));

        return result;
      });
    },
    [key],
  );

  return [value, handleSetValue];
};
