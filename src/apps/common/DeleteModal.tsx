import { Box, Button, Typography } from "@mui/material";
import { MaterialModal } from "./Modal";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { useEffect } from "react";

export const DeleteModal = () => {
  const { deleteModal, deleteConfirmed } = useSelector(modals);
  const { closeDeleteModal, confirmDeletion } = useActions();

  useEffect(() => {
    if (deleteConfirmed) closeDeleteModal();
  }, [deleteConfirmed]);

  return (
    <MaterialModal open={deleteModal.open} onClose={closeDeleteModal}>
      <Typography variant="h6" textAlign="center" sx={{ padding: 2, lineHeight: "24px" }}>
        Вы уверене что хотите {deleteModal.message}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button
          variant="contained"
          color="error"
          onClick={() => confirmDeletion()}
          sx={{
            minWidth: "120px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
        >
          Удалить
        </Button>
        <Button
          variant="outlined"
          onClick={() => closeDeleteModal()}
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
      </Box>
    </MaterialModal>
  );
};
