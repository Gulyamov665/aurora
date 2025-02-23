import { useLoadQuery } from "../../../store/admin/vendorApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import Intro from "../features/intro/Intro";
import Category from "../features/category/Category";
import Loading from "../features/loading/Loading";

function ClientMainPage() {
  const { res = "" } = useParams();
  const { data, isLoading } = useLoadQuery(res);
  const { search } = useSelector(modals);

  if (isLoading) return <Loading />;

  if (!data) return <div className="text-center">Ничего не найдено</div>;
  return (
    <>
      <Intro data={data} />
      <Category search={search} />
    </>
  );
}

export default ClientMainPage;
