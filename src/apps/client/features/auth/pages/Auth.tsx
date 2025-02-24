import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthType, DataType } from "../types";
import { useAuthMutation } from "@store/user/api/userAuthApi";
import styles from "../assets/AuthForm.module.scss";
import Login from "../components/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Auth: FC<AuthType> = ({ state }) => {
  const { register, handleSubmit } = useForm<DataType>();
  const [userAuth] = useAuthMutation();

  const navigate = useNavigate();

  const submit: SubmitHandler<DataType> = async (data) => {
    await userAuth(data).unwrap(); // Дожидаемся ответа
    navigate(state.from); // ✅ Редирект только если запрос успешен
  };

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Login register={register} handleSubmit={handleSubmit} submit={submit} state={state} />
      </div>
    </div>
  );
};
export default Auth;
