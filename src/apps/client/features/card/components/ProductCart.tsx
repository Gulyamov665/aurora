import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyFormat from "react-currency-format";
import { FC } from "react";
import { CardViewContentProps } from "../types";
import { RadioGroupCustom } from "@/apps/common/RadioGroup";

export const ProductCart: FC<CardViewContentProps> = ({
  item,
  count,
  setCount,
  setIsOpen,
  onAdd,
  selectedVariant,
  setSelectedVariant,
  option,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        maxHeight: "90vh",
        overflowY: "scroll",
        p: 2,
      }}
    >
      {/* Левая часть – изображение */}
      <Box sx={{ flex: 1, pr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
        <img
          src={item.photo}
          alt={item.name}
          style={{
            width: "100%",
            height: 350,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Правая часть – контент */}
      <Box sx={{ flex: 1.2, position: "relative" }}>
        {/* Кнопка закрытия */}
        <IconButton onClick={() => setIsOpen(false)} sx={{ position: "absolute", top: 0, right: 0 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
          {item.name}
        </Typography>

        <Divider />

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mt={4} flexWrap="wrap">
          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{ flex: 1, borderRadius: 2, py: 1.5 }}
            onClick={onAdd}
          >
            <Typography fontWeight="bold" color="#333">
              <CurrencyFormat
                value={(option?.price ?? item.price) * count}
                displayType={"text"}
                thousandSeparator={" "}
                suffix={" Сум"}
              />
            </Typography>
          </Button>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: "auto", mt: { xs: 2, md: 0 } }}>
            <IconButton color="inherit" onClick={() => setCount(count - 1)} disabled={count <= 1}>
              <RemoveIcon />
            </IconButton>
            <Typography>{count}</Typography>
            <IconButton color="inherit" onClick={() => setCount(count + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
        {/* Описание */}
        <Typography variant="body2" sx={{ mt: 2, whiteSpace: "break-spaces", color: "text.secondary" }}>
          {item.description}
        </Typography>

        {/* Варианты */}
        <Box sx={{ mt: 3 }}>
          <RadioGroupCustom
            data={item.options}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </Box>

        {/* Цена и счётчик */}
      </Box>
    </Box>
  );
};
