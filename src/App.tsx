import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./apps/client/components/NotFound";
import Login from "./apps/admin/pages/Login";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./routes/AdminRoutes";
import VendorRoutes from "./routes/VendorRoutes";
import RegistrationPage from "./apps/client/features/registration/pages/RegistrationPage";
import Auth from "./apps/client/features/auth/pages/Auth";
import { DeleteModal } from "./apps/common/DeleteModal";
import { Main } from "./apps/client/features/main/Main";
// import { useRefreshMutation } from "@store/user/api/userAuthApi";
// import { useEffect } from "react";
// import { isTokenExpired, getToken } from "./Utils/getToken";
// import { StaffSettings } from "./apps/admin/features/staff/Staff";
// import { InstallPrompt } from "./InstallPrompt";

function App() {
  const { state } = useLocation();
  // const [refresh] = useRefreshMutation();
  // const token = getToken();
  // useEffect(() => {
  //   const refreshToken = async () => {
  //     if (token && isTokenExpired(token)) {
  //       await refresh({});
  //     }
  //   };

  //   refreshToken();
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Login />} />

        {/* client auth */}
        <Route path="/register" element={<RegistrationPage state={state} />} />
        <Route path="/login" element={<Auth state={state} />} />

        {/*client and admin routes */}
        <Route path="dashboard/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/*" element={<VendorRoutes />} />

        <Route path="*" element={<NotFound />} />
        {/* <Route path="/staff" element={<StaffSettings />} /> */}
      </Routes>

      {/* global elements */}
      {/* <InstallPrompt /> */}
      <ToastContainer />
      <DeleteModal />
    </>
  );
}

export default App;
