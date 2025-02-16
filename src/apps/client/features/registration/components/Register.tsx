import { FC } from "react";
import { RegisterType } from "../types";
import RegCodeStep from "./RegCodeStep";
import RegForm from "./RegDataStep";

const Register: FC<RegisterType> = ({ register, handleSubmit, state, onSubmit, regStep, codeRequestSubmit }) => {
  return (
    <>
      {regStep === 0 && <RegForm register={register} handleSubmit={handleSubmit} state={state} onSubmit={onSubmit} />}

      {regStep === 1 && (
        <RegCodeStep register={register} handleSubmit={handleSubmit} codeRequestSubmit={codeRequestSubmit} />
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
