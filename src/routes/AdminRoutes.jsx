import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '../Apps/admin/pages/Admin'
import Vendor from '../Apps/admin/modules/vendor/pages/Vendor'
import Orders from '../Apps/admin/modules/orders/pages/Orders'
import AdminCategory from '../Apps/admin/pages/AdminCategory'
import UpdateProduct from '../Apps/admin/modules/Product/pages/UpdateProduct'
import AddProduct from '../Apps/admin/modules/Product/pages/AddProduct'
import AdminPromo from '../Apps/admin/modules/promo/pages/AdminPromo'
import UpdatePromo from '../Apps/admin/modules/promo/pages/UpdatePromo'
import AddPromo from '../Apps/admin/modules/promo/pages/AddPromo'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route path="main" element={<Vendor />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<AdminCategory />} />
        <Route path="menu/:id" element={<UpdateProduct />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="promo" element={<AdminPromo />} />
        <Route path="promo/:id" element={<UpdatePromo />} />
        <Route path="add-promo" element={<AddPromo />} />
      </Route>
    </Routes>
  )
}
