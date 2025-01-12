import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test from './apps/client/pages/ClientContainer'
import Admin from './apps/admin/pages/Admin'
import AdminCategory from './apps/admin/pages/AdminCategory'
import NotFound from './apps/client/components/NotFound'
import Login from './apps/admin/pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/HomePage'
import Navbar from './apps/client/components/Navbar'
import AdminPromo from './apps/admin/modules/promo/pages/AdminPromo'
import UpdateProduct from './apps/admin/modules/Product/pages/UpdateProduct'
import AddProduct from './apps/admin/modules/Product/pages/AddProduct'
import AddPromo from './apps/admin/modules/promo/pages/AddPromo'
import UpdatePromo from './apps/admin/modules/promo/pages/UpdatePromo'
import Vendor from './apps/admin/modules/vendor/pages/Vendor'
import Orders from './apps/admin/modules/orders/pages/Orders'
import OrdersPage from './apps/client/modules/pages/OrdersPage'
import ClientMainPage from './apps/client/pages/ClientMainPage'
import AdminRoutes from './routes/AdminRoutes'
import VendorRoutes from './routes/VendorRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/admin/:res/*" element={<AdminRoutes />} />
        <Route path="vendor/:res/:table?/*" element={<VendorRoutes />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
