import React from "react";
import { Box, TextField, Typography, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocationFormType } from "../types";

export const LocationForm: React.FC<LocationFormType> = ({
  register,
  address,
  back,
  remove,
  navbox = true,
  p = 2,
  disabled = false,
  // watch,
}) => {
  return (
    <Box p={p}>
      {navbox && (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={back}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" ml={1}>
              {address}
            </Typography>
          </Box>
          <IconButton onClick={remove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Divider />

      {/* Form fields */}
      <Box mt={2} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Название"
          defaultValue=""
          // value={watch?.("name") || ""}
          {...register("name")}
          disabled={disabled}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Box display="flex" gap={2}>
          <TextField
            type="number"
            label="Кв./офис"
            defaultValue=""
            // value={watch?.("apartment")}
            {...register("apartment")}
            disabled={disabled}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label="Подъезд"
            defaultValue=""
            // value={watch?.("entrance")}
            {...register("entrance")}
            disabled={disabled}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label="Этаж"
            defaultValue=""
            // value={watch?.("floor")}
            {...register("floor")}
            disabled={disabled}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          label="Комментарий к заказу"
          defaultValue=""
          // value={watch?.("comment")}
          {...register("comment")}
          multiline
          rows={2}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Box>
  );
};
