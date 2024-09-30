import { useLatestRef } from "@chakra-ui/react";
import { useEffect } from "react";

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  listener: (entry: ResizeObserverEntry) => void
) => {
  const callback = useLatestRef(listener);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      callback.current?.(entries[0]);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
};
