import { FC } from "react";
import { FormValuesType, RegisterType, RequestFormValuesType } from "../types";
import { useCodeRequestMutation, useRegistrationMutation } from "@store/user/api/userRegistrationApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import RegCodeStep from "./RegCodeStep";
import RegForm from "./RegDataStep";

const Register: FC<RegisterType> = ({ state }) => {
  const { register, handleSubmit, control, formState, trigger, watch } = useForm<FormValuesType>({ mode: "onTouched" });
  const { register: codeRegister, handleSubmit: codeSubmit } = useForm<RequestFormValuesType>();
  const [registration] = useRegistrationMutation();
  const [codeRequest] = useCodeRequestMutation();
  const { regStep, userId, botLink, error } = useSelector(authState);

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

      {regStep === 2 && (
        <div className="text-center">
          <h2>Вы успешно зарегистрировались</h2>
        </div>
      )}
    </>
  );
};

export default Register;
