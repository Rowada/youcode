import { useRef } from "react";

export const useDebounceFn = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 500
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const returnFn = (...args: T) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      timeout.current = undefined;
      fn(...args);
    }, delay);
  };

  return returnFn;
};
