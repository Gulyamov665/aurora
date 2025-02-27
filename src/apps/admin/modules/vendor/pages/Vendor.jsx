import React, { useEffect } from "react";
import VendorForm from "../components/VendorForm";
import { useParams } from "react-router-dom";
import { useLoadQuery, useUpdateMutation } from "../../../../../store/admin/api/vendorApi";
import { useForm } from "react-hook-form";

function Vendor() {
  const { res } = useParams();
  const { data: load } = useLoadQuery(res);
  const [update] = useUpdateMutation();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (load) {
      const { logo, photo, ...rest } = load;
      reset(rest);
    }
  }, [load, reset]);

  const handleUpdate = async (data) => {
    await update({ body: data, vendor: res });
  };

  return (
    <div className="container">
      <VendorForm register={register} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </div>
  );
}

export default Vendor;
