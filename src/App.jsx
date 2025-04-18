import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './apps/client/components/NotFound'
import Login from './apps/admin/pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/AdminRoutes'
import VendorRoutes from './routes/VendorRoutes'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />

        {/*client and admin routes 2 */}

        <Route path="/admin/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/:table?/*" element={<VendorRoutes />} />
      </Routes>
      <Analytics />
      <ToastContainer />
    </>
  )
}

export default App
