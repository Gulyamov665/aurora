import { CodeRequest, RegistrationMutation } from "@store/user/api/userRegistrationApi";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
  Control,
  UseFormStateReturn,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export type FormValuesType = {
  first_name: string;
  last_name: string;
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
  watch: UseFormWatch<FormValuesType>;
  error: {
    message: string;
    code: number;
  };
  state: { from: string };
  isLoading: boolean;
};
export type RegisterType = {
  state: { from: string };
  regStep: number;
  userId: string;
  botLink: string;
  error: {
    message: string;
    code: number;
  };
  registration: RegistrationMutation[0];
  codeRequest: CodeRequest[0];
  isLoading: boolean;
};

export type RegistrationPageType = {
  state: { from: string };
};
