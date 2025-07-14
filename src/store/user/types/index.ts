import { IVariants, ProductType } from "@/apps/client/features/order/types/orderTypes";

export type CartType = {
  totalPrice: number;
  CartItems: CartItem[];
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
  vendorId: number | null;
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
  lat: string;
  long: string;
  is_active: boolean;
  contacts: string[];
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
  options?: IVariants;
  photo: string;
};

export type RestaurantOrderType = {
  id: number;
  name: string;
  photo: string;
  address: string;
  phone: number;
};

export type CourierType = {
  id: number;
  phone_number: string;
  username: string;
};

export enum OrderStatus {
  new = "new",
  awaiting_courier = "awaiting_courier",
  prepare = "prepare",
  on_the_way = "on_the_way",
}

export type OrdersType = {
  id: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  total_price: string;
  lat: string;
  long: string;
  user_id: number;
  courier: CourierType;
  user_phone_number: string;
  restaurant: RestaurantOrderType;
  products: OrderProduct[];
  status: OrderStatus;
  location: UserLocationType;
  fee: number;
  delivery_price: number;
};

export type ChangeOrderBody = {
  id: number;
  product_id: number;
};

export type OrdersData = {
  data: OrdersType[];
  last_page: number;
  page: number;
  total: number;
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  photo: string;
  options?: IVariants | null;
}

export interface CartData {
  products: CartItem[];
  total_price: number;
  vendor: number;
  user: number;
  id: number;
  cart_id?: number | null;
}

export interface CartBadResponse {
  is_open: boolean;
  message: string;
}

export type UserInfoType = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  avatar?: null;
  user_registered_at: string;
  is_active: boolean;
  is_user: boolean;
  is_vendor: boolean;
  location: UserLocationType;
};

export interface NominatimReverseResponse {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    house_number?: string;
    city: string;
    state?: string;
    country?: string;
    postcode?: string;
    amenity?: string;
    neighbourhood?: string;
    suburb?: string;
    village?: string;
  };
}

export type UserLocationType = {
  lat: string;
  long: string;
  house?: string;
  apartment?: string;
  floor?: string;
  entrance?: string;
  address: string;
  comment?: string;
  name?: string;
  is_active?: boolean;
  street?: string;
  user: number;
};

export type UserLocationResponseType = UserLocationType & {
  id: number;
};

export type ReportsType = {
  orders: OrdersType[];
  sum: number;
  quantity: number;
  canceled: number;
  delivered: number;
  fee_sum: number;
};
export type { ProductType };

export type GroupedOrder = {
  date: string;
  orders: OrdersType[];
};
export type EditorType = UserInfoType & {
  permissions: any[];
  role: string;
  role_label: string;
  role_permissions: string;
};

export type StaffType = {
  id: Number;
  editors: EditorType[];
};

export type CourierTypes = {
  id: Number;
  couriers: EditorType[];
};

export type RoleType = {
  id: number;
  role: string;
  label: string;
};

export type DeliveryRuleType = {
  id: number;
  restaurant: string;
  calculation_type: string;
  name: string;
  description: string;
  price_per_km: number;
  fixed_price: number;
  price_per_percent: number;
  min_distance: number;
  max_distance: number;
  max_order_price_for_free_delivery: number;
  is_active: boolean;
};
