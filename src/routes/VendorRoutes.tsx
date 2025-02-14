import { Route, Routes } from "react-router-dom";
import ClientMainPage from "../apps/client/pages/ClientMainPage.jsx";
import OrdersPage from "../apps/client/features/order/pages/OrdersPage.tsx";
import Layout from "../apps/client/pages/Layout.jsx";

export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClientMainPage />} />
        <Route path="cart" element={<OrdersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="profile" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}
