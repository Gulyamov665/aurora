import { Box, Button, TextField, Typography } from "@mui/material";
import { MaterialModal } from "../../../../common/Modal";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ProductType } from "@store/user/types";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { AddProductMutationType } from "@store/admin/api/productsApi";

interface FormData {
  name: string;
}
interface CreateModalType {
  fetch: AddProductMutationType[0];
  title: string;
}

export const CreateModal: FC<CreateModalType> = ({ fetch, title }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { addModalState } = useSelector(modals);
  const { onCloseAddModal } = useActions();

  useEffect(() => {
    reset();
  }, [addModalState.open]);

  const submit: SubmitHandler<Partial<ProductType>> = async (data) => {
    await fetch({ ...data, restaurant: addModalState.vendorId, category: addModalState.categoryId }).unwrap();
    reset();
    onCloseAddModal();
  };

  return (
    <MaterialModal open={addModalState.open} onClose={onCloseAddModal}>
      <Box>
        <Typography sx={{ mb: 1 }}>{title}</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <TextField label="Название" variant="outlined" fullWidth {...register("name")} />
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            {/* <Button
              variant="outlined"
              onClick={() => onCloseAddModal()}
              sx={{
                minWidth: "120px",
                fontWeight: "bold",
                borderRadius: "8px",
                borderColor: "#b0bec5",
                color: "#455a64",
                backgroundColor: "#eceff1",
                "&:hover": {
                  backgroundColor: "#cfd8dc",
                },
              }}
            >
              Отмена
            </Button> */}
            <Button
              variant="outlined"
              onClick={() => onCloseAddModal()}
              sx={{
                minWidth: "120px",
                fontWeight: "bold",
                borderRadius: "8px",
                borderColor: "#90a4ae", // Чуть более глубокий серо-голубой
                color: "#37474f", // Темнее для лучшего контраста
                backgroundColor: "#f5f5f5", // Светло-серый с тёплым оттенком
                boxShadow: "0px 4px 8px rgba(69, 90, 100, 0.3)", // Тень в цвет текста
                "&:hover": {
                  backgroundColor: "#dbe2e5", // Чуть затемнённый фон при ховере
                  boxShadow: "0px 6px 12px rgba(69, 90, 100, 0.4)", // Более выраженная тень
                },
              }}
            >
              Закрыть
            </Button>

            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{
                minWidth: "120px",
                fontWeight: "bold",
                borderRadius: "8px",
                // boxShadow: "0px 4px 10px rgba(0, 128, 0, 0.4)",
                boxShadow: "0px 6px 15px rgba(0, 100, 0, 0.5)", // более тёмный зелёный

                "&:hover": { backgroundColor: "#1b5e20" },
              }}
            >
              Сохранить
            </Button>
          </Box>
        </form>
      </Box>
    </MaterialModal>
  );
};
