export const styles = {
  address: {
    // dark
    position: "absolute",
    top: "40%",
    left: "50%",
    zIndex: 999,
    transform: "translate(-50%, -100%)",
    bgcolor: "#2c2c2c",
    color: "white",
    p: 2,
    px: 3,
    borderRadius: "16px",

    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontWeight: 500,
    textAlign: "center",
    fontSize: "16px",
    // opacity: 0.6,
    maxWidth: "200px",

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
  mapContainer: { height: "500px", width: "100%", position: "relative" },
};
