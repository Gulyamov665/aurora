import { CalcType } from "./types";

export const calcTotalPrice = (items: CalcType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.quantity + sum, 0);
};
