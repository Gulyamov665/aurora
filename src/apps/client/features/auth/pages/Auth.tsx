import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthType, DataType } from "../types";
import { useAuthMutation } from "@store/user/api/userAuthApi";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { parseError } from "@/Utils/parseError";
import styles from "../assets/AuthForm.module.scss";
import Login from "../components/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Auth: FC<AuthType> = ({ state }) => {
  const { register, handleSubmit, formState, control, trigger } = useForm<DataType>({ mode: "onChange" });
  const { isUser } = useSelector(authState);
  const [userAuth, { isLoading, error }] = useAuthMutation();
  const linkToVendor = localStorage.getItem("from") || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.from) {
      localStorage.setItem("from", state.from);
    }
  }, [state]);

  const submit: SubmitHandler<DataType> = async (data) => {
    await userAuth(data).unwrap();
  };

  if (isUser && linkToVendor) {
    return <Navigate to={linkToVendor} />;
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
          error={parseError(error)}
          formState={formState}
          control={control}
          trigger={trigger}
        />
      </div>
    </div>
  );
};
export default Auth;
