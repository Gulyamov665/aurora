import { FC, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { TableSortLabel, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Person, MonetizationOn, Receipt } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import { OrderKey, OrdersTableProps } from "../types";
import { getStatusChip } from "./Statuses";
import { LoadingScreen } from "../../loading/LoadingScreen";

const OrdersTable: FC<OrdersTableProps> = ({ data, isLoading }) => {
  const [sortBy, setSortBy] = useState<OrderKey>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: OrderKey) => {
    const isAsc = sortBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(key);
  };

  if (!data?.data) return <LoadingScreen loading={isLoading} />;

  const sortedOrders = [...data?.data].sort((a, b) => {
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
    <Card elevation={6} sx={{ mt: 3, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Заказы
        </Typography>
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
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.created_by}</TableCell>
                <TableCell>{row.total_price} ₽</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
