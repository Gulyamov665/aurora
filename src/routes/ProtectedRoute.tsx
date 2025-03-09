import { JSX, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authState, setUser } from "@store/user/slices/authSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isUser } = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        dispatch(setUser(null));
        setRedirect(true);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate]);

  if (!isUser || redirect) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
