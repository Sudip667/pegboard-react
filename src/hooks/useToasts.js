import { useCallback, useEffect, useRef, useState } from "react";
import { uid } from "../utils/helpers.js";

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const pushToast = useCallback((message) => {
    const id = uid();
    setToasts((t) => [...t, { id, message }]);
    timers.current[id] = setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
      delete timers.current[id];
    }, 2600);
  }, []);

  useEffect(() => {
    const currentTimers = timers.current;
    return () => Object.values(currentTimers).forEach(clearTimeout);
  }, []);

  return [toasts, pushToast];
}
