export type CardType = {
  id: number;
  photo: string;
  name: string;
  price: number;
  is_active: boolean;
  restaurant: number;
  availability: boolean;
  category: number;
};

export interface CartItem extends CardType {
  count: number;
}
