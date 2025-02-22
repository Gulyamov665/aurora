import React, { useState, useEffect } from "react";
import PromoForm from "../components/PromoForm";
import { useForm } from "react-hook-form";
import { useLoadQuery } from "../../../../../store/admin/vendorApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPromosMutation } from "../../../../../store/admin/promoApi";
import CropModal from "../../Product/components/CropModal";
import Loading from "../../../../client/features/loading/Loading";

function AddPromo() {
  const { res } = useParams();
  const { data: vendor } = useLoadQuery(res);
  const [addPromos, { isLoading }] = useAddPromosMutation();
  const { register, handleSubmit, reset } = useForm();
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [cropData, setCropData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!img) {
      reset({ photo: null });
    }
  }, [img]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPromo = async (data) => {
    let formData = new FormData();

    formData.append("restaurant", vendor.id);
    Object.entries(data).forEach(([key, value]) => {
      if (key === "photo") {
        return formData.append("photo", file);
      }
      formData.append(key, value);
    });
    formData.append("crop", JSON.stringify(cropData));

    await addPromos(formData).unwrap();
    reset();
    navigate(-1);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="container">
        <button className="btn btn-success mt-3 mb-3" onClick={() => navigate(-1)}>
          вернуться
        </button>
        <PromoForm
          register={register}
          handleSubmit={handleSubmit}
          handle={handleAddPromo}
          handleFile={handleFileChange}
          button={"добавить"}
        />
      </div>

      <CropModal img={img} setImg={setImg} setCropData={setCropData} cropData={cropData} />
    </>
  );
}

export default AddPromo;
