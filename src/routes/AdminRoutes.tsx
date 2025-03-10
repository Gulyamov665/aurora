import { Route, Routes } from "react-router-dom";
import Admin from "../apps/admin/modules/layout/pages/Admin";
import Vendor from "../apps/admin/modules/vendor/pages/Vendor";
import Orders from "../apps/admin/modules/orders/pages/Orders";
import AdminCategory from "../apps/admin/pages/AdminCategory";
import UpdateProduct from "../apps/admin/modules/Product/pages/UpdateProduct";
import AddProduct from "../apps/admin/modules/Product/pages/AddProduct";
import AdminPromo from "../apps/admin/modules/promo/pages/AdminPromo";
import UpdatePromo from "../apps/admin/modules/promo/pages/UpdatePromo";
import AddPromo from "../apps/admin/modules/promo/pages/AddPromo";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
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
  );
}
