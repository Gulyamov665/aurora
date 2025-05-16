import { Box, Button } from "@mui/material";
import { SidebarFooterProps } from "../types";
import { FC } from "react";


export const SidebarFooter: FC<SidebarFooterProps> = ({logout}) => {
  return (
    <Box textAlign="center" p={2}>
      <Button variant="contained" color="error" onClick={logout} fullWidth>
        <strong>ВЫХОД</strong>
      </Button>
    </Box>
  );
};
