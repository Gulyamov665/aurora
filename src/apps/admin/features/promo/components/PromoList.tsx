import { FC, useEffect } from "react";
import { Box } from "@mui/material";
import { PromoCard } from "./PromoCard";
import { Promo, PromoListType } from "../types";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";

const PromoList: FC<PromoListType> = ({ promos, updatePromo, deletePromo }) => {
  const { showDeleteModal } = useActions();
  const { deleteConfirmed, deleteModal } = useSelector(modals);

  const deletePromoUnit = async ({ message, type, id }: { id: number; message: string; type: string }) => {
    showDeleteModal({ message: message, type: type, id: id });
  };

  useEffect(() => {
    if (deleteModal.id && deleteConfirmed) {
      deletePromo(deleteModal.id);
    }
  }, [deleteConfirmed, deleteModal.id]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        padding: "16px",
        "@media (max-width: 375px)": {
          gridAutoFlow: "row",
        },
      }}
    >
      {promos.map((promo: Promo) => (
        <PromoCard
          key={promo.id}
          {...promo}
          updatePromo={updatePromo}
          deletePromo={deletePromo}
          deletePromoUnit={deletePromoUnit}
        />
      ))}
    </Box>
  );
};

export default PromoList;
