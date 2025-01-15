import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './apps/client/components/NotFound'
import Login from './apps/admin/pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/HomePage'
import AdminRoutes from './routes/AdminRoutes'
import VendorRoutes from './routes/VendorRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="navbar" element={<Navbar />} /> */}
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

         {/*client and admin routes  */}
        <Route path="/admin/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/:table?/*" element={<VendorRoutes />} />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
