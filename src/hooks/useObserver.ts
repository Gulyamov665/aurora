import { useState, useEffect } from "react";

type ObserverRefs = React.RefObject<HTMLDivElement[]>;

export const useObserver = (refs: ObserverRefs, options: IntersectionObserverInit): IntersectionObserverEntry[] => {
  const [observerTarget, setObserverTarget] = useState<IntersectionObserverEntry[]>([]);
  useEffect(() => {
    const cb: IntersectionObserverCallback = (entries) => {
      setObserverTarget(entries);
    };
    const observer = new IntersectionObserver(cb, options);
    refs.current.forEach((sec) => {
      observer.observe(sec);
    });

    return () => {
      observer.disconnect(); // Очистка при размонтировании
    };
  }, [refs.current]);

  return observerTarget;
};
