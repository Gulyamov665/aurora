import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../../auth/assets/AuthForm.module.scss";
import Register from "../components/Register";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormValuesType, RegistrationPageType } from "../types";
import { FC } from "react";

const RegistrationPage: FC<RegistrationPageType> = ({ state }) => {
  const { register, handleSubmit } = useForm<FormValuesType>();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValuesType> = (data) => {
    console.log(data);
  };

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Register register={register} handleSubmit={handleSubmit} state={state} onSubmit={submit} />
      </div>
    </div>
  );
};

export default RegistrationPage;
