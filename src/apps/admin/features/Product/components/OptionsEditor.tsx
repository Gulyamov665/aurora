import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

interface OptionValue {
  id: string;
  value: string;
}

interface Option {
  id: string;
  name: string;
  values: OptionValue[];
}

interface Variant {
  id: string;
  values: string[];
  price: string;
  sku: string;
}

export const OptionsEditor: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newValue, setNewValue] = useState<string>("");

  const addNewOption = () => {
    const newOption: Option = {
      id: crypto.randomUUID(),
      name: "",
      values: [],
    };
    setOptions([...options, newOption]);
  };

  const updateOptionName = (index: number, name: string) => {
    const newOptions = [...options];
    newOptions[index].name = name;
    setOptions(newOptions);
  };

  const addOptionValue = (index: number) => {
    if (!newValue.trim()) return;
    const updatedOptions = [...options];
    updatedOptions[index].values.push({ id: crypto.randomUUID(), value: newValue });
    setOptions(updatedOptions);
    setNewValue("");
  };

  const removeOptionValue = (optIndex: number, valIndex: number) => {
    const updatedOptions = [...options];
    updatedOptions[optIndex].values.splice(valIndex, 1);
    setOptions(updatedOptions);
  };

  const generateVariants = () => {
    const optionValues = options.map((opt) => opt.values.map((val) => val.value));
    const combinations = cartesianProduct(optionValues);
    const newVariants: Variant[] = combinations.map((combination) => ({
      id: crypto.randomUUID(),
      values: combination,
      price: "",
      sku: "",
    }));
    setVariants(newVariants);
  };

  const updateVariantPrice = (index: number, price: string) => {
    const newVariants = [...variants];
    newVariants[index].price = price;
    setVariants(newVariants);
  };

  const updateVariantSku = (index: number, sku: string) => {
    const newVariants = [...variants];
    newVariants[index].sku = sku;
    setVariants(newVariants);
  };

  const cartesianProduct = (arrays: string[][]): string[][] => {
    return arrays.reduce<string[][]>(
      (acc, curr) => acc.map((x) => curr.map((y) => x.concat([y]))).reduce((a, b) => a.concat(b), []),
      [[]]
    );
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Опции
      </Typography>
      {options.map((option, index) => (
        <Box key={option.id} sx={{ mb: 2 }}>
          <TextField
            label={`Опция ${index + 1}`}
            value={option.name}
            onChange={(e) => updateOptionName(index, e.target.value)}
            fullWidth
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {option.values.map((val, valIdx) => (
              <Chip key={val.id} label={val.value} onDelete={() => removeOptionValue(index, valIdx)} />
            ))}
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Новое значение"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addOptionValue(index);
              }}
            />
            <Button onClick={() => addOptionValue(index)}>Добавить</Button>
          </Box>
        </Box>
      ))}

      <Button variant="outlined" onClick={addNewOption} sx={{ mb: 4 }}>
        Добавить опцию
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Варианты
      </Typography>
      <Button variant="contained" onClick={generateVariants} sx={{ mb: 2 }}>
        Сгенерировать варианты
      </Button>

      {variants.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              {options.map((opt) => (
                <TableCell key={opt.id}>{opt.name}</TableCell>
              ))}
              <TableCell>Цена</TableCell>
              <TableCell>SKU</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((variant, idx) => (
              <TableRow key={variant.id}>
                {variant.values.map((val, i) => (
                  <TableCell key={i}>{val}</TableCell>
                ))}
                <TableCell>
                  <TextField value={variant.price} onChange={(e) => updateVariantPrice(idx, e.target.value)} />
                </TableCell>
                <TableCell>
                  <TextField value={variant.sku} onChange={(e) => updateVariantSku(idx, e.target.value)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};
