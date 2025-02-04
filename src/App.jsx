import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NotFound from './apps/client/components/NotFound'
import Login from './apps/admin/pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/AdminRoutes'
import VendorRoutes from './routes/VendorRoutes'
import RegistrationPage from './apps/client/modules/registration/pages/RegistrationPage'
import Auth from './apps/client/modules/auth/pages/Auth'

function App() {
  const { state } = useLocation()

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />

        {/* client auth */}

        <Route path="/register" element={<RegistrationPage state={state} />} />
        <Route path="/login" element={<Auth state={state} />} />

        {/*client and admin routes 2 */}

        <Route path="admin/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/*" element={<VendorRoutes />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
