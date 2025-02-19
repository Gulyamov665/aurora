import { SpyType } from "./types";

export const intersectionScrollSpyFunc: SpyType = (entries, navLinks, setActiveIndex) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!navLinks.current) return;

      navLinks.current.forEach((link) => link.classList.remove("active"));
      let activeId = parseInt(entry.target.id);

      const activeLink = navLinks.current[activeId];
      setActiveIndex(activeId);

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};
