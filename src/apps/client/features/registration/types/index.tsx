import { UseFormRegister, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

export type FormValuesType = {
  username: string;
  email: string;
  phone: string;
  password_1: string;
  password_2: string;
};
export type RequestFormValuesType = {
  code: string;
};

export type RequestType = {
  register: UseFormRegister<RequestFormValuesType>;
  handleSubmit: UseFormHandleSubmit<RequestFormValuesType>;
  codeRequestSubmit: SubmitHandler<RequestFormValuesType>;
};

export type RegDataType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  onSubmit: SubmitHandler<FormValuesType>;
  state: { from: string };
};
export type RegisterType = {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<FormValuesType>;
  codeRequestSubmit: SubmitHandler<RequestFormValuesType>;
  state: { from: string };
  regStep: number;
};

export type RegistrationPageType = {
  state: { from: string };
};
