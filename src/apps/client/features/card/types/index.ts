export type CardType = {
  id: number;
  photo: string;
  name: string;
  price: number;
};

export interface CartItem extends CardType {
  count: number;
}
