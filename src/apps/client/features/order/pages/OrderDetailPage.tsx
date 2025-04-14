import React from "react";
import { OrderDetail } from "../components/OrderDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@store/admin/api/orders";
import { Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Loading from "../../loading/Loading";

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery(id, { skip: !id });
  const navigate = useNavigate();

  if (!order) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <ArrowBack sx={{ mb: 3, mt: 3 }} />
      </div>

      <OrderDetail order={order} />
    </Box>
  );
};
