import React from "react";
import { Box, Button, TextField, MenuItem, Tooltip, OutlinedInput, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DeliveryRuleFormValues, DeliveryRulesAddProps } from "../types";
import { useActions } from "@/hooks/useActions";

export const DeliveryRulesAdd: React.FC<DeliveryRulesAddProps> = ({ setOpenAddModal, addDeliveryRule, vendorData }) => {
  const { snack } = useActions();
  const { control, handleSubmit, watch, reset } = useForm<DeliveryRuleFormValues>({
    defaultValues: {
      name: "",
      calculation_type: "",
      price_per_km: 0,
      price_per_percent: 0,
      max_order_price_for_free_delivery: 0,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    data.restaurant = vendorData.id;
    await addDeliveryRule(data).unwrap();
    setOpenAddModal(false);
    snack({ open: true, color: "success", message: "Правило успешно добавлена" });

    reset();
  });

  const calculationType = watch("calculation_type");
  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}
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
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="Тип расчета"
              fullWidth
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
            >
              <MenuItem value="percent">Процент от суммы заказа</MenuItem>
              <MenuItem value="per_km">По километражу</MenuItem>
            </TextField>
          )}
        />

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

        <Controller
          name="max_order_price_for_free_delivery"
          control={control}
          render={({ field }) => (
            <Tooltip
              title={
                "Минимальная сумма заказа, при которой доставка будет бесплатной. Если не указать, то доставка всегда платная."
              }
            >
              <TextField {...field} label="Мин. сумма заказа для бесплатной доставки" type="number" fullWidth />
            </Tooltip>
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Создать
        </Button>
      </Box>
    </>
  );
};
