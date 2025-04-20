export const styles = {
  address: {
    bgcolor: "#2c2c2c",
    color: "white",
    px: 3,
    py: 1.5,
    borderRadius: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontWeight: 500,
    textAlign: "center",
    fontSize: "16px",
    maxWidth: "200px",
    mb: 1.5,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: "50%",
      transform: "translateX(-50%)",
      width: 0,
      height: 0,
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderTop: "8px solid #2c2c2c",
    },
  },
  marker: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -100%)",
    zIndex: 999,
    pointerEvents: "none",
  },
  mapContainer: { height: "100dvh", width: "100%", position: "relative" },

  nearMe: {
    position: "absolute",
    bottom: 200,
    right: 16,
    zIndex: 1000,
    backgroundColor: "white",
    boxShadow: 2,
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },

  markerAnimation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -100%)", // по центру и вверх
    zIndex: 1000,
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submitButton: {
    position: "fixed",
    bottom: 80,
    left: "50%",
    borderRadius: "8px",
    transform: "translateX(-50%)",
    zIndex: 1000,
    backgroundColor: "#4CAF50",
    "&:hover": { backgroundColor: "#45A049" },
  },

  locationButton: {
    boxShadow: "0px 0px 10px 0px rgb(182, 182, 182)",
    width: "100%",
    minWidth: "400px",
    maxWidth: "400px",
    borderRadius: "4px",
    backgroundColor: "#F5F5F5",
    textTransform: "none",
    color: "#000",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    transition: "transform 0.3s",
    padding: "8px 16px", // Отступы внутри кнопки
    "& .MuiButton-startIcon": {
      // Стили для иконки если она есть
      marginRight: 2,
    },
    "&:hover": {
      backgroundColor: "#E0E0E0",
      transform: "translateY(-1px)",
      transition: "transform 0.2s",
    },
    "@media (min-width: 320px) and (max-width: 425px)": {
      minWidth: "auto",
      width: "250px",
      fontSize: "14px",
      maxWidth: "300px",
    },
  },
  addressSelectorButtonBox: {
    p: 1,
    borderRadius: "16px",
    backgroundColor: "#f5f4f2",
    mb: 2,
    textAlign: "center",
    cursor: "pointer",
  },

  addressSelectorBox: {
    p: 2,
    borderRadius: "16px",
    backgroundColor: "white",
    boxShadow: 2,
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
