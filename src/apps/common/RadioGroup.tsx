import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { IOptions } from "../client/features/order/types/orderTypes";

interface RadioGroupCustomProps {
  data: IOptions;
  selectedVariant: number | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number | null>>;
}

export const RadioGroupCustom: React.FC<RadioGroupCustomProps> = ({ data, selectedVariant, setSelectedVariant }) => {
  if (!data?.variants || data.variants.length === 0) {
    return null;
  }
  return (
    <FormControl>
      <FormLabel>На выбор</FormLabel>
      <RadioGroup value={selectedVariant} onChange={(e) => setSelectedVariant(parseInt(e.target.value))}>
        {data?.variants
          ?.filter((variant) => variant.is_active)
          .map((variant) => (
            <FormControlLabel
              key={variant.id}
              value={variant.id}
              control={<Radio />}
              label={
                <div>
                  <b>{variant.name}: </b>
                  {variant.price} Сум
                </div>
              }
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};
