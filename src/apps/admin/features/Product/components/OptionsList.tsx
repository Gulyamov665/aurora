import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import { OptionsListProps } from "../types";
import IOSSwitch from "@/apps/client/components/MuiSwitch";
import { Delete } from "@mui/icons-material";

export const OptionsList: React.FC<OptionsListProps> = ({ data, onDelete }) => {
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
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell sx={{ width: 60 }}>{variant.id}</TableCell>
                <TableCell sx={{ width: 200 }}>{variant.name}</TableCell>
                <TableCell sx={{ width: 200 }}>{variant.price}</TableCell>
                <TableCell sx={{ width: 60 }} align="center">
                  <FormControlLabel label="" control={<IOSSwitch checked={variant.is_active} onChange={() => {}} />} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(variant.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
