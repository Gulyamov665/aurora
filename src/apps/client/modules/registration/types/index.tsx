import { UseFormRegister, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

export type FormValuesType = {
  name: string;
  last_name: string;
  phone_number: string;
};

export type RegistrationPageType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  state: { from: string };
  onSubmit: SubmitHandler<FormValuesType>;
};
