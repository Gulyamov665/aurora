import { FC, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Grow } from "@mui/material";
import { TableSortLabel, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Person, MonetizationOn, Receipt } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import { OrderKey, OrdersTableProps } from "../types";
import { getStatusChip } from "./Statuses";
import { LoadingScreen } from "../../loading/LoadingScreen";
import { Box, CircularProgress, Fade } from "@mui/material";
import EnableSoundButton from "./EnableSoundButton";

const OrdersTable: FC<OrdersTableProps> = (props) => {
  const { data, isLoading, isFetching, onEyeClick, audioRef, setSoundAllowed, soundAllowed, sound = false } = props;

  const [sortBy, setSortBy] = useState<OrderKey>("id");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: OrderKey) => {
    const isAsc = sortBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(key);
  };

  if (!data) return <LoadingScreen loading={isLoading} />;

  const sortedOrders = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue == null || bValue == null) {
      return 0;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <Card elevation={6} sx={{ mt: 3, mb: 4, width: "100%", overflow: "scroll", borderRadius: "20px" }}>
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h6" gutterBottom>
            Заказы
          </Typography>
          {sound && (
            <EnableSoundButton
              audioRef={audioRef}
              setSoundAllowed={setSoundAllowed ?? (() => {})}
              soundAllowed={soundAllowed ?? false}
            />
          )}
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "id"}
                  direction={sortBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  <Receipt sx={{ verticalAlign: "middle", mr: 1 }} /> ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "created_by"}
                  direction={sortBy === "created_by" ? order : "asc"}
                  onClick={() => handleSort("created_by")}
                >
                  <Person sx={{ verticalAlign: "middle", mr: 1 }} /> Клиент
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "total_price"}
                  direction={sortBy === "total_price" ? order : "asc"}
                  onClick={() => handleSort("total_price")}
                >
                  <MonetizationOn sx={{ verticalAlign: "middle", mr: 1 }} /> Сумма
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "restaurant"}
                  direction={sortBy === "restaurant" ? order : "asc"}
                  onClick={() => handleSort("restaurant")}
                >
                  Статус
                </TableSortLabel>
              </TableCell>
              <TableCell>Курьер</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.map((row) => (
              <Grow in key={row.id} timeout={500}>
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.created_by}</TableCell>
                  <TableCell>{parseInt(row.total_price).toLocaleString()} UZS</TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>{row.courier ? row.courier.username : "Не назначен"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEyeClick && onEyeClick(row.id)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </Grow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "center", height: 60, alignItems: "center" }}>
        <Fade in={isFetching} unmountOnExit timeout={300}>
          <CircularProgress size={20} />
        </Fade>
      </Box>
    </Card>
  );
};

export default OrdersTable;
