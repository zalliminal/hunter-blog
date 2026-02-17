"use client";

import { useEffect, useState } from "react";

/**
 * Returns a debounced version of `value`.
 * Useful for delaying Fuse.js searches until the user stops typing.
 */
export function useDebounce<T>(value: T, delay = 150): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}