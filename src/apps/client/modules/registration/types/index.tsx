import { UseFormRegister, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

export type FormValuesType = {
  name: string;
  last_name: string;
  phone_number: string;
};

export type RegisterType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  onSubmit: SubmitHandler<FormValuesType>;
  state: { from: string };
};

export type RegistrationPageType = {
  state: { from: string };
};
