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
};

export type ProductFormType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  onSubmit: SubmitHandler<FormValuesType>;
  watch: UseFormWatch<FormValuesType>;
  productImage: ProductImageType;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteItem: () => void;
};
