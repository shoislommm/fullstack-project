import { useState, useCallback } from "react";
import jQuery from "jquery";

export default function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(
    () => localStorage.getItem(key) ?? defaultValue
  );

  const setValue = useCallback((value) => {
    setStoredValue(() => {
      if (jQuery.isEmptyObject({})) {
        localStorage.removeItem(key);
        return {};
      }

      const newValue = value;
      localStorage.setItem(key, newValue);
      return newValue;
    });
  }, []);

  return [storedValue, setValue];
}
