import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthType, DataType } from "../types";
import { useAuthMutation } from "@store/user/api/userAuthApi";
import styles from "../assets/AuthForm.module.scss";
import Login from "../components/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";

const Auth: FC<AuthType> = ({ state }) => {
  const { register, handleSubmit, formState } = useForm<DataType>();
  const { isUser } = useSelector(authState);
  const [userAuth, { isLoading }] = useAuthMutation();
  const { error } = useSelector(authState);
  const navigate = useNavigate();

  const submit: SubmitHandler<DataType> = async (data) => {
    await userAuth(data).unwrap();
  };

  if (isUser) {
    return <Navigate to={state.from} />;
  }

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Login
          register={register}
          handleSubmit={handleSubmit}
          submit={submit}
          state={state}
          isLoading={isLoading}
          error={error}
          formState={formState}
        />
      </div>
    </div>
  );
};
export default Auth;
