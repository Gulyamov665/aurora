import React from "react";
import { Controller } from "react-hook-form";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";

const dayMap: { [key: string]: string } = {
  MONDAY: "Понедельник",
  TUESDAY: "Вторник",
  WEDNESDAY: "Среда",
  THURSDAY: "Четверг",
  FRIDAY: "Пятница",
  SATURDAY: "Суббота",
  SUNDAY: "Воскресенье",
};

export const ScheduleEdit = ({ control }) => {
  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Изменить запись графика
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="День недели"
                SelectProps={{ native: true }}
              >
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
              <TextField
                {...field}
                label="Время открытия"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="close_time"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Время закрытия"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
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
