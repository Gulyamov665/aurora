import { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { UploadFile, Save, Delete, ArrowBack } from "@mui/icons-material";

const PromoEdit = ({ register, handleSubmit, handle, handleFile, button }) => {
  const [formData, setFormData] = useState({
    name: "promo.name",
    description: "promo.description",
    price: "promo.price",
    image: "promo.image",
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <IconButton onClick={() => {}} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Редактирование акции
        </Typography>
        <IconButton onClick={() => {}} color="error">
          <Delete />
        </IconButton>
      </Box>

      <TextField fullWidth label="Название" name="name" value={formData.name} {...register("name")} sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Информация"
        name="description"
        multiline
        rows={3}
        value={formData.description}
        {...register("description")}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Цена"
        name="price"
        type="number"
        // value={formData.price}
        {...register("price")}
        sx={{ mb: 2 }}
      />

      <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
        <CardMedia component="img" height="200" image={formData.image} {...register("photo")} alt="Изображение акции" />
        <CardContent>
          <Button variant="contained" component="label" startIcon={<UploadFile />}>
            Загрузить новое
            <input type="file" hidden />
          </Button>
        </CardContent>
      </Card>

      <Button fullWidth variant="contained" color="primary" startIcon={<Save />}>
        Сохранить изменения
      </Button>
    </Box>
  );
};

export default PromoEdit;
