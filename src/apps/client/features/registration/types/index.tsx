import {
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
  Control,
  UseFormStateReturn,
  UseFormTrigger,
} from "react-hook-form";

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
  botLink: string;
};

export type RegDataType = {
  register: UseFormRegister<FormValuesType>;
  handleSubmit: UseFormHandleSubmit<FormValuesType>;
  onSubmit: SubmitHandler<FormValuesType>;
  control: Control<FormValuesType>;
  formState: UseFormStateReturn<FormValuesType>;
  trigger: UseFormTrigger<FormValuesType>;
  state: { from: string };
};
export type RegisterType = {
  state: { from: string };
};

export type RegistrationPageType = {
  state: { from: string };
};
