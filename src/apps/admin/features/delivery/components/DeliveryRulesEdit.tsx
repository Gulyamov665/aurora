import React from "react";
import { Box, Button, TextField, Tooltip, MenuItem } from "@mui/material";
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
            <Tooltip title={"Сумма доставки будет рассчитываться на указанный процент от суммы заказа"}>
              <TextField {...field} label="Цена за процент" type="number" fullWidth value={field.value ?? ""} />
            </Tooltip>
          )}
        />
      )}

      {calculationType === "per_km" && (
        <Controller
          name="price_per_km"
          control={control}
          render={({ field }) => (
            <Tooltip title={"Сумма доставки будет рассчитываться по расстоянию до клиента"}>
              <TextField {...field} label="Цена за км" type="number" fullWidth value={field.value ?? ""} />
            </Tooltip>
          )}
        />
      )}

      <Controller
        name="max_order_price_for_free_delivery"
        control={control}
        render={({ field }) => (
            <Tooltip title={"Сумма доставки будет рассчитываться на указанный процент от суммы заказа"}>
          <TextField {...field} label="Макс. сумма заказа для бесплатной доставки" type="number" fullWidth />
          </Tooltip>
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </Box>
  );
};
