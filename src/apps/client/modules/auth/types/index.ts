import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type AuthType = {
  state: { from: string };
};
export type DataType = {
  login: string;
  password: string;
};

export type AuthData = {
  register: UseFormRegister<DataType>;
  handleSubmit: UseFormHandleSubmit<DataType>;
  submit: SubmitHandler<DataType>;
  state: { from: string };
};
