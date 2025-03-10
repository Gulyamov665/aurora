import { FC, useEffect } from "react";
import VendorForm from "../components/VendorForm";
import { useParams } from "react-router-dom";
import { useLoadQuery, useUpdateMutation } from "@store/admin/api/vendorApi";
import { useForm } from "react-hook-form";
import { VendorInfoType } from "@store/user/types";

const Vendor: FC = () => {
  const { res = "" } = useParams();
  const { data: load } = useLoadQuery(res);
  const [update, { isLoading }] = useUpdateMutation();
  const { register, handleSubmit, reset } = useForm<VendorInfoType>();

  useEffect(() => {
    if (load) {
      const { logo, background_photo, ...rest } = load;
      reset(rest);
    }
  }, [load, reset]);

  const handleUpdate = async (data: VendorInfoType) => {
    await update({ body: data, vendor: res });
  };

  return (
    <div className="container">
      <VendorForm register={register} handleSubmit={handleSubmit} handleUpdate={handleUpdate} isLoading={isLoading} />
    </div>
  );
};

export default Vendor;
