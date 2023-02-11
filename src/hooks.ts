import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };