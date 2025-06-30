import { FC, useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetMyOrdersQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { OrderHistory } from "../components/OrderHistory";
import { Link, useNavigate } from "react-router-dom";
import { GoToLogin } from "../components/GoToLogin";
import Loading from "../../loading/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const OrderCard = styled(Card)({
  marginBottom: 16,
  padding: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

export const MyOrders: FC = () => {
  const { isUser } = useSelector(authState);
  const skip = { skip: !isUser?.user_id };
  const { data, isLoading } = useGetMyOrdersQuery({ userId: isUser?.user_id }, skip);
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login", { state: { from: location.pathname } });
  const goToRegister = () => navigate("/register", { state: { from: location.pathname } });

  const ordersList = useMemo(() => {
    return data?.map((group) => (
      <Box key={group.date}>
        <Typography variant="h6">{group.date}</Typography>
        {group.orders.map((order) => (
          <Link to={`${order.id}`} key={order.id} className="link-reset">
            <OrderHistory order={order} key={order.id} />
          </Link>
        ))}
      </Box>
    ));
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div onClick={() => navigate("..")} style={{ padding: "16px 0" }}>
        <ArrowBackIcon className="mx-3" sx={{ fontSize: "30px", mb: 2, cursor: "pointer" }} />
      </div>
      <Box sx={{ maxWidth: 800, mx: "auto", pl: 2, pr: 2 }}>
        {isUser ? (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
              Мои заказы
            </Typography>
            <Box sx={{ mb: 4 }}>{ordersList}</Box>
          </Box>
        ) : (
          <GoToLogin
            goToLogin={goToLogin}
            goToRegister={goToRegister}
            text="Для просмотра истории заказов необходимо войти в систему или зарегистрироваться."
          />
        )}
      </Box>
    </div>
  );
};
