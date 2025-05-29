export const mainBox = {
  maxWidth: "auto",
  marginBottom: 5,
  marginTop: 2,
  padding: 3,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 3,
};

export const header = { display: "flex", justifyContent: "space-between" };

export const inputsBox = {
  display: "flex",
  justifyContent: "space-around",
  "@media (max-width: 1000px)": {
    display: "block",
  },
};

export const formBox = {
  marginRight: 5,
  "@media (max-width: 1000px)": {
    marginRight: 0,
  },
};

export const card = {
  mb: 2,
  borderRadius: 2,
  boxShadow: 2,
  position: "relative",
  width: "440px",
  height: "247px",
  // maxHeight: "364px",
  "@media (max-width: 1000px)": {
    width: "100% !important",
    height: "100% !important",
  },
};

export const circlerProgress = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
};

export const imgStyle = {
  height: "auto",
  width: "100%",
  cursor: "pointer",
};

export const onImageLoad = {
  height: "auto",
  width: "100%",
  backgroundColor: "#f0f0f0",
  filter: "blur(2px)", // заменили blur на filter
  transition: "filter 0.3s ease-in-out",
};
