import { Box, FormControlLabel, IconButton, Paper, styled, Table, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";
import { OptionsListProps } from "../types";
import IOSSwitch from "@/apps/client/components/MuiSwitch";
import { Delete } from "@mui/icons-material";

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isPending",
})<{ isPending: boolean }>(({ isPending }) => ({
  ...(isPending && {
    animation: "blink 1s linear infinite",
    "@keyframes blink": {
      "50%": {
        backgroundColor: "#fce4ec", // мягкий розовый, можно заменить
      },
    },
  }),
}));

export const OptionsList: React.FC<OptionsListProps> = ({ data, onDelete, pendingId, deleteResult }) => {
  return (
    <Box mt={3} maxWidth={800} mx="auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { label: "ID" },
                { label: "Название" },
                { label: "Цена" },
                { label: "Активность" },
                { label: "Действие" },
              ].map((column) => (
                <TableCell key={column.label}>
                  <TableSortLabel>{column.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.variants.map((variant) => {
              const isPending = variant.id === pendingId && deleteResult.isLoading;
              return (
                <StyledTableRow key={variant.id} isPending={isPending}>
                  <TableCell sx={{ width: 60 }}>{variant.id}</TableCell>
                  <TableCell sx={{ width: 400 }}>{variant.name}</TableCell>
                  <TableCell sx={{ width: 200 }}>{variant.price}</TableCell>
                  <TableCell sx={{ width: 60 }} align="center">
                    <FormControlLabel
                      label=""
                      control={<IOSSwitch checked={variant.is_active} onChange={() => {}} />}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onDelete({ id: variant.id, message: `удалить ${variant.name}`, type: "variants" })}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
