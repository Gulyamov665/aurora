import { Box, Button, CircularProgress, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
import { styles } from "./styles/styles";

type CustomSwipeableDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  title: string;
  buttonText: string;
  onSubmit: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const CustomSwipeableDrawer: React.FC<CustomSwipeableDrawerProps> = ({
  open,
  onClose,
  // onOpen,
  children,
  title,
  buttonText,
  onSubmit,
  loading,
  disabled = false,
}) => {
  return (
    <Box>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        // onOpen={onOpen}
        PaperProps={{
          sx: styles.swipeAbleDrawerStyle,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={styles.childrenBox}>{children}</Box>
        <Box sx={styles.onSubmit}>
          <Box onClick={onSubmit}>
            <Button sx={{ color: "black", fontWeight: 500 }} disabled={disabled}>
              {loading ? <CircularProgress size={20} color="warning" /> : <span>{buttonText}</span>}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
