import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormStateReturn,
  UseFormTrigger,
} from "react-hook-form";

export type AuthType = {
  state: { from: string };
};
export type DataType = {
  phone: string;
  password: string;
};

type errorType = {
  message: string;
  code: number;
};

export type AuthData = {
  register: UseFormRegister<DataType>;
  handleSubmit: UseFormHandleSubmit<DataType>;
  submit: SubmitHandler<DataType>;
  formState: UseFormStateReturn<DataType>;
  state: { from: string };
  error?: errorType | undefined;
  isLoading: boolean;
  control: Control<DataType>;
  trigger: UseFormTrigger<DataType>;
};
