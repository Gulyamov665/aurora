import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../assets/AuthForm.module.scss";
import Login from "../components/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthType, DataType } from "../types";

const Auth: FC<AuthType> = ({ state }) => {
  const { register, handleSubmit } = useForm<DataType>();

  const navigate = useNavigate();

  const submit = (data: DataType): void => {
    console.log(data);
  };
  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Login register={register} handleSubmit={handleSubmit(submit)} state={state} />
      </div>
    </div>
  );
};
export default Auth;
