import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { VariantsForm } from "../components/VariantsForm";
import { ProductFormValues, ProductVariantsProps } from "../types";
import { mainBox } from "../assets/ProductFormStyles";
import { OptionsList } from "../components/OptionsList";
import { useFieldArray, useForm } from "react-hook-form";
import { useDelete } from "@/hooks/useDelete";

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  data,
  addVariant,
  deleteVariant,
  deleteResult,
  variantGroup,
  toggleActive,
}) => {
  const { control, handleSubmit, register, reset } = useForm<ProductFormValues>({ defaultValues: { variants: [] } });
  const { confirmedId, deleteItem, id } = useDelete();
  const [pendingId, setPendingId] = React.useState<number | null>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    const handleDeleteVariant = async () => {
      if (confirmedId) {
        await deleteVariant(id).unwrap();
        setPendingId(null);
      }
    };
    handleDeleteVariant();
  }, [confirmedId]);

  const onSubmit = async (data: ProductFormValues) => {
    const body = {
      option_group: variantGroup,
      ...data,
    };
    await addVariant(body).unwrap();
    reset();
  };

  const onDelete = ({ message, type, id }: { message: string; type: string; id: number }) => {
    setPendingId(id);
    deleteItem({ message, type, id });
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

      <OptionsList
        data={data}
        onDelete={onDelete}
        pendingId={pendingId}
        deleteResult={deleteResult}
        toggleActive={toggleActive}
      />
    </Box>
  );
};
