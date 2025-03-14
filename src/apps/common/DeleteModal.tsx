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
      <Typography variant="h6" textAlign="center" sx={{padding:2}}>
        Вы уверене что хотите удалить {deleteModal.message}
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
            borderColor: "#b0bec5",
            color: "#455a64",
            backgroundColor: "#eceff1",
            "&:hover": {
              backgroundColor: "#cfd8dc",
            },
          }}
        >
          Отмена
        </Button>
      </Box>
    </MaterialModal>
  );
};
