import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './Apps/client/components/NotFound'
import Login from './Apps/admin/pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/AdminRoutes'
import VendorRoutes from './routes/VendorRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />

        {/*client and admin routes */}

        <Route path="/admin/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/:table?/*" element={<VendorRoutes />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
