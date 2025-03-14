import { VendorInfoType } from "@store/user/types";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type VendorFormType = {
  register: UseFormRegister<VendorInfoType>;
  handleSubmit: UseFormHandleSubmit<VendorInfoType>;
  handleUpdate: SubmitHandler<VendorInfoType>;
  isLoading: boolean;
  isChanged: boolean;
};
