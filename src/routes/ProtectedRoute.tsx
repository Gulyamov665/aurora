import { JSX, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authState, setUser } from "@store/user/slices/authSlice";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
    return (
      <div style={{ height: "100dvh", width: "100%", background: "#210638" }}>
        <Navigate to="/" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
