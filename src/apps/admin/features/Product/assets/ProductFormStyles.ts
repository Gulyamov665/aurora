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
  width: "440px",
  height: "247px",
  // maxHeight: "364px",
  "@media (max-width: 1000px)": {
    width: "100% !important",
    height: "100% !important",
  },
};

export const imgStyle = {
  height: "auto",
  width: "100%",
  cursor: "pointer",
};
