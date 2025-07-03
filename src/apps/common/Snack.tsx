import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";

export const Snack: React.FC = () => {
  const {snackState} = useSelector(modals)
  const {snack} = useActions()

  return (
    <Snackbar
      open={snackState.open}
      onClose={() => snack({open:false})}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={snackState.color} onClose={() => snack({open:false})}>
        {snackState.message}
      </Alert>
    </Snackbar>
  );
};
