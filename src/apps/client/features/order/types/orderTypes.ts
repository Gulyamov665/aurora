export type ProductType = {
  id: number;
  name: string;
  photo: string;
  price: number;
  count: number;
  description?: string;
  is_active: boolean;
  restaurant: number;
  availability: boolean;
  category: number;
};

export type OrderProductsProps = {
  product: ProductType;
  increase: () => void;
  decrease: () => void;
};
