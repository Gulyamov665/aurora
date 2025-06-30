import { SxProps, Theme } from "@mui/material/styles";

interface StyleTypes {
  drawerStyles: SxProps<Theme>;
}

export const styles: StyleTypes = {
  drawerStyles: {
    width: 500,
    flexShrink: 0,

    "& .MuiDrawer-paper": {
      width: 500,
      boxSizing: "border-box",
      pt: 2,
      mt: 10,
      borderRadius: "20px",
    },
  },
};
