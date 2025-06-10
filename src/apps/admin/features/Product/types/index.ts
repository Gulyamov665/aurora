import { IOptions } from "@/apps/client/features/order/types/orderTypes";
import { VariantDeleteMutationType, VariantMutationType } from "@store/admin/api/productsApi";
import { ChangeEvent } from "react";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

export type ProductImageType = {
  photo: string;
  thumb: string;
};

export type FormValuesType = {
  availability?: boolean;
  description: string;
  id: number;
  is_active: boolean;
  name: string;
  price: number;
  photo?: string;
  thumb?: string;
};

export type ProductFormType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  onSubmit: SubmitHandler<FormValuesType>;
  watch: UseFormWatch<FormValuesType>;
  productImage: ProductImageType;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteItem: () => void;
  ImageIsLoading: boolean;
};

export interface ProductVariantsProps {
  data: IOptions;
  addVariant: VariantMutationType[0];
  deleteVariant: VariantDeleteMutationType[0];
  deleteResult: VariantDeleteMutationType[1];
  variantGroup: number;
}

export type Variant = Record<string, string>;

export type ProductFormValues = {
  variants: Variant[];
};
export interface OptionsListProps {
  data: IOptions;
  onDelete: ({ message, type, id }: { message: string; type: string; id: number }) => void;
  pendingId: number | null;
  deleteResult: VariantDeleteMutationType[1];
}

export interface VariantsFormProps {
  register: UseFormRegister<ProductFormValues>;
  handleSubmit: UseFormHandleSubmit<ProductFormValues>;
  onSubmit: SubmitHandler<ProductFormValues>;
  remove: (index: number) => void;
  append: (value: Variant) => void;
  fields: Variant[];
}
