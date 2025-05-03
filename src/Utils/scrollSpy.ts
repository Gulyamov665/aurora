import { SpyType } from "./types";

export const intersectionScrollSpyFunc: SpyType = (entries, navLinks, setActiveIndex) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!navLinks.current) return;
      let activeId = parseInt(entry.target.id);
      setActiveIndex(activeId);
    }
  });
};
