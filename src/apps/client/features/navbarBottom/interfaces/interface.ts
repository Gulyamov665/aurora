import { VendorInfoType } from "@store/user/types";
import { JSX } from "react";

export interface IconItem {
  icon: JSX.Element;
  title: string;
  link: string;
  counter?: number;
  active: boolean;
}

export interface NavbarBottomProps {
  icons: IconItem[];
}

export interface NavbarBottomPageProps {
  data?: VendorInfoType;
}
