export type CalcType = {
  price: number;
  count: number;
};

export type SpyType = (
  entries: IntersectionObserverEntry[],
  navLinks: React.RefObject<HTMLAnchorElement[]>,
  setActiveIndex: (index: number) => void
) => void;
