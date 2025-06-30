import { useEffect } from "react";

export const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    const body = document.body;
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

    if (!locked) {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      return;
    }

    // if (isIOS) {
    //   const scrollY = window.scrollY;
    //   body.dataset.scrollY = scrollY.toString();
    //   body.style.position = "fixed";
    //   body.style.top = `-${scrollY}px`;
    //   body.style.width = "100%";
    //   body.classList.add("lock-ios-scroll");
    // } else {
    //   body.style.overflow = "hidden";
    // }

    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      if (isIOS) {
        window.scrollTo(0, parseInt(body.dataset.scrollY || "0", 10));
        body.classList.remove("lock-ios-scroll");
      }
    };
  }, [locked]);
};
