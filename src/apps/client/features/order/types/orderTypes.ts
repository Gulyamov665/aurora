export type ProductType = {
  id: number;
  name: string;
  photo: string;
  price: number;
  count: number;
  description: string;
};

export type OrderProductsProps = {
  product: ProductType;
  increase: () => void;
  decrease: () => void;
};
