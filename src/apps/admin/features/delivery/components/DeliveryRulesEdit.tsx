import React from "react";
import { Box, Button, TextField, Tooltip, MenuItem, OutlinedInput, InputAdornment } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DeliveryRuleFormValues, DeliveryRulesEditProps } from "../types";

export const DeliveryRulesEdit: React.FC<DeliveryRulesEditProps> = ({ onSubmit }) => {
  const { control, handleSubmit, watch } = useFormContext<DeliveryRuleFormValues>();
  const calculationType = watch("calculation_type");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1.5rem" }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Tooltip title={"Заполняется опционально"}>
            <TextField {...field} label="Название" fullWidth />
          </Tooltip>
        )}
      />

      <Controller
        name="calculation_type"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Тип расчета"
            fullWidth
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
          >
            <MenuItem value="percent">Процент от суммы заказа</MenuItem>
            <MenuItem value="per_km">По километражу</MenuItem>
          </TextField>
        )}
      />

      {calculationType === "percent" && (
        <Controller
          name="price_per_percent"
          control={control}
          render={({ field }) => (
            <Tooltip title={`Сумма доставки будет рассчитываться на ${field?.value ?? ""} % от суммы заказа`}>
              <OutlinedInput
                {...field}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">% (от суммы заказа)</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Tooltip>
          )}
        />
      )}

      {calculationType === "per_km" && (
        <Controller
          name="price_per_km"
          control={control}
          render={({ field }) => (
            <Tooltip title={`Сумма доставки будет рассчитываться по расстоянию от ресторана до клиента`}>
              <OutlinedInput
                {...field}
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">UZS (за 1 км)</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Tooltip>
          )}
        />
      )}

      <Controller
        name="max_order_price_for_free_delivery"
        control={control}
        render={({ field }) => (
          <Tooltip
            title={
              "Минимальная сумма заказа, при которой доставка будет бесплатной. Если не указать, то доставка всегда платная."
            }
          >
            <OutlinedInput
              {...field}
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">UZS</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </Tooltip>
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </Box>
  );
};
