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

export const card = { mb: 2, borderRadius: 2, boxShadow: 2 };
