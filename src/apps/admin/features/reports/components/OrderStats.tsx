import React, { ReactNode } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value = 0, icon, color }) => (
  <Card elevation={3} sx={{ borderRadius: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <Box color={color} fontSize={32}>
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {value && value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

interface OrdersStatsProps {
  totalSum?: number;
  totalCount?: number;
  delivered: number;
  cancelled?: number;
}

const OrdersStats: React.FC<OrdersStatsProps> = ({ totalSum = 0, totalCount, delivered, cancelled }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Общая сумма" value={totalSum?.toLocaleString()} icon={<AttachMoneyIcon />} color="green" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Кол-во заказов" value={totalCount as number} icon={<ShoppingCartIcon />} color="blue" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Доставленные" value={delivered} icon={<CheckCircleIcon />} color="green" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Отмененные" value={cancelled as number} icon={<CancelIcon />} color="red" />
      </Grid>
    </Grid>
  );
};

export default OrdersStats;
