import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { VendorCard } from "../features/intro/VendorCard";
import { OutletContextType } from ".";
import { GuestBox } from "../features/products/components/GuestBox";
import { MaterialModal } from "@/apps/common/Modal";
import Category from "../features/category/Category";
import Loading from "../features/loading/Loading";

function ClientMainPage() {
  const { search } = useSelector(modals);
  const { data, isLoading } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  if (data && !data?.is_active)
    return (
      <MaterialModal open={!data?.is_active} onClose={() => {}}>
        <GuestBox setToRegPage={() => navigate("/")} singleBtn title="Ресторан временно недоступен" />
      </MaterialModal>
    );

  return (
    <>
      <VendorCard data={data} />
      <Category search={search} />
    </>
  );
}

export default ClientMainPage;
