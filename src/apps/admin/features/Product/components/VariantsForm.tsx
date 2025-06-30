import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { VariantsFormProps } from "../types";

export const VariantsForm: React.FC<VariantsFormProps> = ({
  append,
  fields,
  handleSubmit,
  onSubmit,
  register,
  remove,
}) => {
  return (
    <Box>
      <Box textAlign={"center"} alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Опции
        </Typography>
      </Box>
      <Box>
        {fields.map((field, index) => {
          const keyName = `name`;
          const valueName = `price`;

          return (
            <Box key={field.id} display="flex" alignItems="center" gap={2} mb={2}>
              <TextField
                defaultValue={field.name}
                label="Название"
                {...register(`variants.${index}.${keyName}`)}
                fullWidth
              />
              <TextField
                defaultValue={field.price}
                label="Цена"
                type="number"
                {...register(`variants.${index}.${valueName}`)}
                fullWidth
              />
              <IconButton onClick={() => remove(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}

        <Button
          onClick={() => append({ [`name`]: "", [`price`]: "" })}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mt: 2, borderColor: "#210648", color: "#000" }}
        >
          Добавить опцию
        </Button>
      </Box>

      <Box mt={4}>
        {fields.length > 0 && (
          <Button
            sx={{ padding: 1.5, backgroundColor: "#210648", ":hover": { backgroundColor: "#210660" } }}
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<Save />}
            onClick={handleSubmit(onSubmit)}
          >
            Сохранить
          </Button>
        )}
      </Box>
    </Box>
  );
};
