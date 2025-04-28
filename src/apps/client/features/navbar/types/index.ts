import { CategoryType } from "../../category/types";

export type NavbarProps = {
  sectionRefs: React.RefObject<HTMLDivElement[]>;
  category: CategoryType[];
  rootRef: React.RefObject<HTMLDivElement[]>;
};
