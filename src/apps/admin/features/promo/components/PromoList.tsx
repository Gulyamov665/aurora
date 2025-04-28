import { FC, useEffect } from "react";
import { Box } from "@mui/material";
import { PromoCard } from "./PromoCard";
import { Promo, PromoListType } from "../types";
import { useDelete } from "@/hooks/useDelete";
import { PromoListStyle } from "../assets/PromoListStyle";



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
