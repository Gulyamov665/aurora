import { ProductType } from "@/apps/client/features/order/types/orderTypes";

export type CartType = {
  totalPrice: number;
  items: ProductType[];
};

export type RegistrationRequestType = {
  username: string;
  email: string;
  phone: string;
  password_1: string;
  password_2: string;
};

export type RegistrationResponseType = {
  id: number;
  username: string;
  email: string;
  phone: string;
  bot_link: string;
};

export type { ProductType };
