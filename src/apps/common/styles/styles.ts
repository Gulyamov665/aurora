import { SxProps, Theme } from "@mui/material";

type StylesType = {
  onSubmit: SxProps<Theme>;
  childrenBox: SxProps<Theme>;
  swipeAbleDrawerStyle: SxProps<Theme>;
};

export const styles: StylesType = {
  onSubmit: {
    p: 1,
    borderRadius: "16px",
    backgroundColor: "#f5f4f2",
    mb: 2,
    textAlign: "center",
    cursor: "pointer",
  },

  childrenBox: {
    p: 2,
    borderRadius: "16px",
    backgroundColor: "white",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    mb: 2,
    maxHeight: "400px",
    overflowY: "auto",
  },

  swipeAbleDrawerStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    p: 2,
    zIndex: 1500,
    maxHeight: "600px",
  },
};


