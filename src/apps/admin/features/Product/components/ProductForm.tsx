import { FC } from "react";
import { ProductFormType } from "../types";
import { Box, TextField, Button, Typography, Card, CardContent, IconButton } from "@mui/material";
import { Save, Delete, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { card, formBox, header, imgStyle, inputsBox, mainBox } from "../assets/ProductFormStyles";
import img from "@/assets/nophoto.jpg";

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
                  <img src={productImage?.photo || img} style={imgStyle} />
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
            sx={{ padding: 1.5, backgroundColor: "#210648", ":hover": { backgroundColor: "#210660" } }}
          >
            Сохранить
          </Button>
        </Box>
      </form>
    </>
  );
};
