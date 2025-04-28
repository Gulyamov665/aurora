export const CardStyle = {
  display: "flex",
  height: 130,
  alignItems: "center",
  mb: 2,
  p: 2,
  borderRadius: 3,
  boxShadow: 3,
  transition: "0.3s",
  "&:hover": { boxShadow: 6 },
};

export const CardMediaStyle = {
  width: 120,
  borderRadius: 2,
  "@media (max-width: 600px)": {
    width: 60,
    height: 50,
  },
};


export const  TypographyStyle= {
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  }