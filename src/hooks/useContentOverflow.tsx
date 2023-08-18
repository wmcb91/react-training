import { useEffect, useRef, useState } from 'react';

/**
 * Detects if the content of a given element is overflowing.
 */
export const useContentOverflow = <E extends HTMLElement>(
  dependency: unknown
): [boolean, React.RefObject<E>] => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<E>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const { clientHeight, scrollHeight } = element;

    setIsOverflowing(scrollHeight > clientHeight + 10);
  }, [dependency]);

  return [isOverflowing, ref];
};
