import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useActions } from "@/hooks/useActions";
import { IScheduleFormType, SchedulesAddProps } from "../types";
import { dayMap } from "./ScheduleEdit";

export const ScheduleAdd: React.FC<SchedulesAddProps> = ({ vendorData, setOpenAddModal, addSchedule }) => {
  const { snack } = useActions();
  const { control, handleSubmit, reset } = useForm<IScheduleFormType>({
    defaultValues: {
      day: 0,
      open_time: "",
      close_time: "",
      restaurant: vendorData?.id ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    data.restaurant = vendorData.id;
    console.log(data);
    await addSchedule(data).unwrap();
    snack({ open: true, color: "success", message: "Правило успешно добавлена" });
    setOpenAddModal(false);
    reset();
  });

  return (
    <>
      <Box p={2} component="form" onSubmit={onSubmit}>
        <Typography variant="h6" mb={2}>
          Добавить график
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="day"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField {...field} select fullWidth label="День недели" SelectProps={{ native: true }}>
                  {Object.entries(dayMap).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="open_time"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Время открытия" type="time" fullWidth InputLabelProps={{ shrink: true }} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="close_time"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Время закрытия" type="time" fullWidth InputLabelProps={{ shrink: true }} />
              )}
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Box>
      </Box>
    </>
  );
};
