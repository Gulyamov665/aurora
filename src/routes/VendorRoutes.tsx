import { Route, Routes } from "react-router-dom";
import { MyOrders } from "@/apps/client/features/order/pages/MyOrders";
import Map from "@/apps/client/features/map/pages/Maps";
import Layout from "@/apps/client/pages/Layout.tsx";
import OrdersPage from "@/apps/client/features/order/pages/OrdersPage.js";
import ClientMainPage from "@/apps/client/pages/ClientMainPage";
import OrderConfirmationPage from "@/apps/client/features/order/pages/ConfirmationPage";
import { OrderDetailPage } from "@/apps/client/features/order/pages/OrderDetailPage";

export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClientMainPage />} />
        <Route path="cart" element={<OrdersPage />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="profile" element={<OrdersPage />} />
        <Route path="confirm" element={<OrderConfirmationPage />} />
        <Route path="maps" element={<Map />} />
      </Route>
    </Routes>
  );
}
