import React from "react";
import { Box, TextField, Typography, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocationFormType } from "../types";

export const LocationForm: React.FC<LocationFormType> = ({ register, handleSubmit, onSubmit, address }) => {
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" ml={1}>
            {address}
          </Typography>
        </Box>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Form fields */}
      <Box mt={2} display="flex" flexDirection="column" gap={2}>
        <TextField label="Название" {...register("name")} fullWidth />
        <Box display="flex" gap={2}>
          <TextField label="Кв./офис" {...register("apartment")} fullWidth />
          <TextField label="Подъезд" {...register("entrance")} fullWidth />
          <TextField label="Этаж" {...register("floor")} fullWidth />
        </Box>
        <TextField label="Комментарий курьеру" {...register("comment")} multiline rows={2} fullWidth />
      </Box>
    </Box>
    // </form>
  );
};
