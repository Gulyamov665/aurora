import React from "react";
import { Modal, Box, IconButton, Fade } from "@mui/material";
import { Close } from "@mui/icons-material";

interface PromoModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  minHeight?: number;
}

export const MaterialModal: React.FC<PromoModalProps> = ({ open, onClose, children, minHeight = 200 }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open} mountOnEnter unmountOnExit timeout={{ enter: 400, exit: 300 }}>
        <Box
          sx={{
            position: "absolute",
            minHeight: minHeight,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "600px" },
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Кнопка закрытия */}
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <Close />
          </IconButton>

          <Box>{children}</Box>
          {/* Контент, передаваемый через `children` */}
        </Box>
      </Fade>
    </Modal>
  );
};
