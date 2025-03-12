export type Promo = {
  id: number;
  name: string;
  photo: string;
  is_active: boolean;
  price: number;
  description: string;
  restaurant: number;
};
export type DeletePromoPayload = {
  id: number;
  message: string;
  type: string;
};

export type PromoCardProps = Promo & {
  updatePromo: (promo: Promo) => void;
  deletePromo: (id: number) => void;
  deletePromoUnit: (payload: DeletePromoPayload) => void;
};

export type PromoListType = {
  promos: Promo[];
  updatePromo: (promo: Promo) => void;
  deletePromo: (id: number) => void;
};
