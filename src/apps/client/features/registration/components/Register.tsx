import { FC } from "react";
import { FormValuesType, RegisterType } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegStepSuccess } from "./RegStepSuccess";

import RegForm from "./RegDataStep";

const Register: FC<RegisterType> = ({ state, regStep, error, registration, isLoading }) => {
  const { register, handleSubmit, control, formState, trigger, watch } = useForm<FormValuesType>({ mode: "onTouched" });

  const submit: SubmitHandler<FormValuesType> = async (data) => {
    await registration({ ...data });
  };

  return (
    <>
      {regStep === 0 && (
        <RegForm
          register={register}
          handleSubmit={handleSubmit}
          state={state}
          onSubmit={submit}
          control={control}
          formState={formState}
          trigger={trigger}
          watch={watch}
          error={error}
          isLoading={isLoading}
        />
      )}

      {regStep === 1 && <RegStepSuccess />}
    </>
  );
};

export default Register;
