import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test from './Apps/client/pages/Test'
import Admin from './Apps/admin/pages/Admin'
import AdminCategory from './Apps/admin/pages/AdminCategory'
import NotFound from './Apps/client/components/NotFound'
import Login from './Apps/admin/pages/Login'
import AdminMain from './Apps/admin/pages/AdminMain'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/HomePage'
import Navbar from './Apps/client/components/Navbar'
import AdminPromo from './Apps/admin/modules/promo/pages/AdminPromo'
import UpdateProduct from './Apps/admin/modules/Product/pages/UpdateProduct'
import AddProduct from './Apps/admin/modules/Product/pages/AddProduct'
import AddPromo from './Apps/admin/modules/promo/pages/AddPromo'
import UpdatePromo from './Apps/admin/modules/promo/pages/UpdatePromo'

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/:res" element={<Admin />}>
          <Route path="main" element={<AdminMain />} />
          <Route path="menu" element={<AdminCategory />} />
          <Route path="menu/:id" element={<UpdateProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="promo" element={<AdminPromo />} />
          <Route path="promo/:id" element={<UpdatePromo />} />
          <Route path="add-promo" element={<AddPromo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="vendor/:res" element={<Test />}></Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
