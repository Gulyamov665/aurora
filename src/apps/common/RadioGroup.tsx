import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { IOptions } from "../client/features/order/types/orderTypes";

const BoxIcon = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 6,
  transition: "background-color 200ms ease, border 200ms ease, box-shadow 200ms ease, transform 150ms ease",
  boxSizing: "border-box",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
});

// Пустой (невыбранный) вариант
const UncheckedIcon = styled(BoxIcon)({
  backgroundColor: "#ffffff", // очень светло-желтый
  margin: 3,
  border: "2px solid #f5f5f5", // ярко-желтая рамка
  "&:hover": {
    backgroundColor: "#FFEE58",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
});

// Выбранный вариант
const CheckedIcon = styled(BoxIcon)({
  backgroundColor: "#FF9800", // ярко-желтый фон
  margin: 3,

  border: "2px solid #FFD600",
  "& svg": {
    color: "#ffffff", // белая галочка
    fontSize: 16,
  },
  "&:hover": {
    backgroundColor: "#FFCA28",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },
});

export const RadioGroupCustom: React.FC<{
  data: IOptions;
  selectedVariant: number | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ data, selectedVariant, setSelectedVariant }) => {
  if (!data?.variants?.length) return null;

  return (
    <FormControl>
      <FormLabel>На выбор</FormLabel>
      <RadioGroup value={selectedVariant} onChange={(e) => setSelectedVariant(+e.target.value)}>
        {data.variants
          .filter((v) => v.is_active)
          .map((variant) => (
            <FormControlLabel
              key={variant.id}
              value={variant.id}
              control={
                <Radio
                  disableRipple
                  icon={<UncheckedIcon />}
                  checkedIcon={
                    <CheckedIcon>
                      <CheckIcon />
                    </CheckedIcon>
                  }
                  sx={{
                    padding: 0, // убираем лишние отступы
                    marginRight: 1.5, // чтобы label чуть подвинуть
                  }}
                />
              }
              label={
                <span style={{ userSelect: "none" }}>
                  <b>{variant.name}:</b> {variant.price} Сум
                </span>
              }
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};
