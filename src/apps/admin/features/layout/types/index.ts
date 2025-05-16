import { ReactElement } from "react";


export type SidebarButtonProps = {
  text: string;
  icon: ReactElement;
  link: string;
}

export type SidebarGroupProps = {
  title: string;
  icon: ReactElement;
  nested?: boolean; // опционально, потому что не у всех групп есть
  buttons: SidebarButtonProps[];
}

export type SidebarSectionProps = {
  buttonGroups: SidebarGroupProps[];
  openGroup: string | null;
  handleGroupToggle: (title: string) => void;
  handleSidebar: () => void;
};

export type SidebarFooterProps = {
  logout: () => void
}


export type SideBarProps = {
  handleSidebar: () => void;
  logout: () => void;
  open: boolean;
};