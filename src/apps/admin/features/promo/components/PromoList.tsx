import { FC, useEffect } from "react";
import { Box } from "@mui/material";
import { PromoCard } from "./PromoCard";
import { Promo, PromoListType } from "../types";
import { useDelete } from "@/hooks/useDelete";
import { PromoListStyle } from "../assets/PromoListStyle";

import { CircularProgress, Typography, styled } from "@mui/material";

const LoaderWrapper = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#f5f5f5",
  zIndex: 9999,
});

const DotsContainer = styled(Box)({
  display: "flex",
  gap: 8,
});

const Dot = styled(Box)({
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: "#1976d2",
  animation: "wave 1.5s infinite ease-in-out",
  "@keyframes wave": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
  "&:nth-of-type(2)": { animationDelay: "0.2s" },
  "&:nth-of-type(3)": { animationDelay: "0.4s" },
});

export const LoadingScreen: FC = () => {
  return (
    <LoaderWrapper>
      <DotsContainer>
        <Dot />
        <Dot />
        <Dot />
      </DotsContainer>
      <Typography variant="h6" fontWeight="bold" mt={2} color="primary">
        Загружаем...
      </Typography>
    </LoaderWrapper>
  );
};

const PromoList: FC<PromoListType> = ({ promos, updatePromo, deletePromo }) => {
  const { deleteItem, confirmedId } = useDelete();

  useEffect(() => {
    if (confirmedId) {
      deletePromo(confirmedId);
    }
  }, [confirmedId]);

  return (
    <Box sx={PromoListStyle}>
      {promos.map((promo: Promo) => (
        <PromoCard
          key={promo.id}
          {...promo}
          updatePromo={updatePromo}
          deletePromo={deletePromo}
          deletePromoUnit={deleteItem}
        />
      ))}
    </Box>
  );
};

export default PromoList;
