import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../../auth/assets/AuthForm.module.scss";
import Register from "../components/Register";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormValuesType, RegistrationPageType, RequestFormValuesType } from "../types";
import { FC } from "react";
import { useCodeRequestMutation, useRegistrationMutation } from "@store/user/api/userRegistrationApi";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";

const RegistrationPage: FC<RegistrationPageType> = ({ state }) => {
  const { register, handleSubmit } = useForm<FormValuesType>();
  const [registration] = useRegistrationMutation();
  const [codeRequest] = useCodeRequestMutation();
  const { regStep, userId } = useSelector(authState);
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValuesType> = async (data) => {
    await registration(data);
  };

  const codeRequestSubmit: SubmitHandler<RequestFormValuesType> = async (data) => {
    await codeRequest({ id: userId, code: data.code });
  };

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Register
          register={register}
          handleSubmit={handleSubmit}
          state={state}
          onSubmit={submit}
          regStep={regStep}
          codeRequestSubmit={codeRequestSubmit}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
