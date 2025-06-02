import React from "react";
import { Box } from "@mui/material";
import { VariantsForm } from "../components/VariantsForm";
import { ProductFormValues, ProductVariantsProps } from "../types";
import { mainBox } from "../assets/ProductFormStyles";
import { OptionsList } from "../components/OptionsList";
import { useFieldArray, useForm } from "react-hook-form";

export const ProductVariants: React.FC<ProductVariantsProps> = ({ data, addVariant, deleteVariant }) => {
  const { control, handleSubmit, register, reset } = useForm<ProductFormValues>({ defaultValues: { variants: [] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data: ProductFormValues) => {
    const body = {
      option_group: 1,
      ...data,
    };
    await addVariant(body).unwrap();
    reset();
  };

  const handleDeleteVariant = async (id: number) => {
    await deleteVariant(id).unwrap();
  };

  return (
    <Box sx={mainBox}>
      <VariantsForm
        append={append}
        fields={fields}
        handleSubmit={handleSubmit}
        register={register}
        remove={remove}
        onSubmit={onSubmit}
      />
      <OptionsList data={data} onDelete={handleDeleteVariant} />
    </Box>
  );
};
