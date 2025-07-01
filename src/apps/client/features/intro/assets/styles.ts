import { Theme } from "@mui/material";

export const vendorCardContentSx = (theme: Theme) => ({
  position: "absolute",
  zIndex: 3,
  bottom: 10,
  left: 10,
  width: {
    xs: "170px", // <600px
    sm: "200px", // ≥600px
    md: "240px", // ≥900px
  },
  color: "black",
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: 4,
  [theme.breakpoints.down(350)]: {
    width: "130px", // только для <=320px
  },
});

export const vendorCardContentsSx = {
  position: "absolute",
  zIndex: 3,
  bottom: 10,
  right: 20,
  color: "black",
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: 4,
  padding: 0,
};

export const vendorCardSx = {
  borderRadius: 4,
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(12px)",
  color: "#000",
  boxShadow: "0 2px 24px rgba(0,0,0,0.5)",
  mb: 4,
  padding: 0,
};
