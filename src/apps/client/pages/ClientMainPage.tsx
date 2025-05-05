import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import Category from "../features/category/Category";
import Loading from "../features/loading/Loading";
import { OutletContextType } from ".";
import { VendorCard } from "../features/intro/VendorCard";

function ClientMainPage() {
  const { search } = useSelector(modals);
  const { data, isLoading } = useOutletContext<OutletContextType>();

  if (isLoading) return <Loading />;

  return (
    <>
      {/* <Intro data={data} /> */}
      <VendorCard data={data} />
      <Category search={search} />
    </>
  );
}

export default ClientMainPage;
