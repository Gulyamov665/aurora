import { FC } from "react";
import { ProductFormType } from "../types";
import { Box, TextField, Button, Typography, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { Save, Delete, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { card, formBox, header, inputsBox, mainBox } from "../assets/ProductFormStyles";

export const ProductForm: FC<ProductFormType> = ({
  register,
  handleSubmit,
  handleFileChange,
  productImage,
  onSubmit,
  deleteItem,
  watch,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={mainBox}>
          <Box sx={header} alignItems="center" mb={2}>
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
              color="primary"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              Добавление продукта
            </Typography>
            <IconButton onClick={deleteItem} color="error">
              <Delete />
            </IconButton>
          </Box>

          <Box sx={inputsBox}>
            <Box sx={formBox}>
              <TextField fullWidth label="Название" value={watch("name") || ""} {...register("name")} sx={{ mb: 2 }} />

              <TextField
                fullWidth
                label="Описание"
                multiline
                rows={3}
                value={watch("description") || ""}
                {...register("description")}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Цена"
                type="number"
                value={watch("price") || ""}
                {...register("price")}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box>
              <Card sx={card}>
                <label htmlFor="upload-image">
                  <CardMedia
                    component="img"
                    width="300"
                    height="300"
                    image={productImage?.photo}
                    sx={{ objectFit: "cover", cursor: "pointer" }}
                  />
                </label>
                <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
                  <input
                    id="upload-image"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/png, image/jpg"
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            sx={{ padding: 1.5 }}
          >
            Сохранить изменения
          </Button>
        </Box>
      </form>
    </>
  );
};
