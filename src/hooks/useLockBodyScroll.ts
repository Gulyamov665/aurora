import { useEffect } from "react";

export const useLockBodyScroll = (open: boolean, classname: string) => {
  useEffect(() => {
    if (open) {
      document.body.classList.toggle(classname);
    }

    return () => {
      document.body.classList.remove(classname);
    };
  }, [open]);
};
