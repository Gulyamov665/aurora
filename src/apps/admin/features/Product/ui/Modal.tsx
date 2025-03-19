import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

export interface CropModalProps {
  children: React.ReactNode;
  title: string;
  trigger: string | ArrayBuffer | null;
  setImg: (img: string | ArrayBuffer | null) => void;
  cropData: Cropper.Data | null;
  fetch: () => Promise<void>;
}

const CropModalMaterial: React.FC<CropModalProps> = ({ children, title, trigger, setImg, cropData, fetch }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger) {
      setOpen(true);
    }
  }, [trigger]);

  const handleClose = () => {
    if (!cropData) {
      toast.error("Не указан размер изображения");
      return;
    }
    setOpen(false);
    setImg(trigger);
    fetch();
  };

  const handleCancel = () => {
    setImg(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={handleCancel} sx={{ background: "#E0E0E0", width: 32, height: 32 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        {/* <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            background: "#D32F2F",
            color: "#FFF",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "8px 16px",
            ":hover": { background: "#B71C1C" },
          }}
        >
          Coхранить
        </Button> */}

        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            borderColor: "#B0BEC5",
            color: "#37474F",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "8px 16px",
            ":hover": { background: "#ECEFF1" },
          }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleClose}
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
      </DialogActions>
    </Dialog>
  );
};

export { CropModalMaterial };
