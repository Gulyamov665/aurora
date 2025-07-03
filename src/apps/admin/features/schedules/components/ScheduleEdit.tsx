import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { ScheduleEditProps } from "../types";
import { useActions } from "@/hooks/useActions";
import React from "react";

export const dayMap: { [key: string]: string } = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресенье",
};

export const ScheduleEdit: React.FC<ScheduleEditProps> = ({
  updateSchedule,
  setOpenUpdateModal,
  scheduleData
}) => {
  const { snack } = useActions();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      day: 0,
      open_time: "",
      close_time: "",
    },
  });

  React.useEffect(() => {
    if (scheduleData) {
      reset({
        day: scheduleData.day,
        open_time: scheduleData.open_time,
        close_time: scheduleData.close_time,
      });
    }
  }, [scheduleData]);

  const onSubmit = handleSubmit(async (formData: any) => {
    try {
      console.log(formData);
      await updateSchedule({
        id: scheduleData.id,
        body: formData,
      }).unwrap();
      setOpenUpdateModal(false);
      snack({ open: true, color: "success", message: "График работы успешно обновлена" });
      reset();
    } catch (err) {
      console.error(err);
      snack({ open: true, color: "error", message: "Ошибка при обновление графика работы обновления" });
    }
  });

  return (
    <Box p={2} component="form" onSubmit={onSubmit}>
      <Typography variant="h6" mb={2}>
        Изменить запись графика
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
  );
};
