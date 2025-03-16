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

export type VendorInfoType = {
  id: number;
  waiter_chat_id: number;
  background_photo: string;
  name: string;
  address: string;
  instagram_link: string;
  telegram_link: string;
  logo: string;
  orders_chat_id: number;
  availability_orders: boolean;
};

export type initialDataType = Omit<VendorInfoType, "background_photo" | "logo">;

export type UpdateMutationType = {
  body: Partial<VendorInfoType>;
  vendor: string;
};

type OrderProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrdersType = {
  id: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  total_price: string;
  lat: string;
  long: string;
  user_id: number;
  restaurant: number;
  products: OrderProduct[];
  status: string;
};

export type OrdersData = {
  data: OrdersType[];
  last_page: number;
  page: number;
  total: number;
};

export type { ProductType };
