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

export interface UserType {
  email: string;
  exp: number;
  iat: number;
  is_user: boolean;
  is_vendor: boolean;
  jti: string;
  token_type: string;
  user_id: number;
  vendor: null | string;
}

export interface ErrorType {
  message: string;
  code: number;
}

export interface IsUserType {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_user: boolean;
  is_vendor: boolean;
  vendor: string | null;
}
export type AuthState = {
  regStep: number;
  userId: string;
  botLink: string;
  isUser: Partial<IsUserType> | null;
  error: ErrorType;
};

export type { ProductType };
