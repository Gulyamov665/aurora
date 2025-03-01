import { FC } from "react";
import { FormValuesType, RegisterType, RequestFormValuesType } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import RegCodeStep from "./RegCodeStep";
import RegForm from "./RegDataStep";
import { RegStepSuccess } from "./RegStepSuccess";

const Register: FC<RegisterType> = ({ state, regStep, userId, botLink, error, registration, codeRequest }) => {
  const { register, handleSubmit, control, formState, trigger, watch } = useForm<FormValuesType>({ mode: "onTouched" });
  const { register: codeRegister, handleSubmit: codeSubmit } = useForm<RequestFormValuesType>();

  const submit: SubmitHandler<FormValuesType> = async (data) => {
    const username = data.username.toLowerCase();
    await registration({ ...data, username });
  };

  const codeRequestSubmit: SubmitHandler<RequestFormValuesType> = async (data) => {
    await codeRequest({ id: userId, code: data });
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
        />
      )}

      {regStep === 1 && (
        <RegCodeStep
          register={codeRegister}
          handleSubmit={codeSubmit}
          codeRequestSubmit={codeRequestSubmit}
          botLink={botLink}
        />
      )}

      {regStep === 2 && <RegStepSuccess />}
    </>
  );
};

export default Register;
