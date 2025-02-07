import { CalcType } from "./types";

export const calcTotalPrice = (items: CalcType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
