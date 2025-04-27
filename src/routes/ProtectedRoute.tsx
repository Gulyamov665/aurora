import { JSX, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authState, setUser } from "@store/user/slices/authSlice";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { res } = useParams();
  const { isUser, error } = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token") || isUser?.vendor !== res) {
        dispatch(setUser(null));
        setRedirect(true);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate, error]);

  if (!isUser || redirect || isUser?.vendor !== res) {
    return (
      <div style={{ height: "100dvh", width: "100%", background: "#210638" }}>
        <Navigate to="/dashboard" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
