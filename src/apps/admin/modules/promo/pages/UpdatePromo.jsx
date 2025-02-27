import React, { useEffect, useState } from "react";
import PromoForm from "../components/PromoForm";
import CropModal from "../../Product/components/CropModal";
import { useForm } from "react-hook-form";
import {
  useDeletePromoMutation,
  useGetPromoQuery,
  useUpdatePromoMutation,
} from "../../../../../store/admin/api/promoApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../client/features/loading/Loading";

function UpdatePromo() {
  const { id } = useParams();
  const { data: promo, isLoading: dataLoading } = useGetPromoQuery(id);
  const [updatePromo, { isLoading }] = useUpdatePromoMutation();
  const [deletePromo, { isLoading: deleteLoading }] = useDeletePromoMutation();
  const { register, handleSubmit, reset } = useForm();
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [cropData, setCropData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!img) {
      reset({ photo: null });
    }
  }, [img]);

  useEffect(() => {
    if (promo) {
      const { photo, ...rest } = promo;
      reset(rest);
    }
  }, [promo, reset]);

  const loadingData = isLoading || deleteLoading || dataLoading;

  const handleFileChangeUpdate = (e) => {
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

  const updatePromoHandler = async (data) => {
    const { photo, ...rest } = data;

    let formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append("photo", file);
    }
    formData.append("crop", JSON.stringify(cropData));
    await updatePromo({ body: formData, id: Number(id) });
    navigate(-1);
  };

  const handleDelete = async () => {
    if (window.confirm("вы действительно хотите удалить позицию")) {
      await deletePromo(Number(id)).unwrap();
      navigate(-1);
    }
  };

  return (
    <div className="container">
      {loadingData && <Loading />}
      <div className="d-flex justify-content-between ">
        <button className="btn btn-success mt-3 mb-3" onClick={() => navigate(-1)}>
          вернуться
        </button>

        <button
          className={loadingData ? "btn btn-danger mt-3 mb-3 disabled" : "btn btn-danger mt-3 mb-3"}
          onClick={handleDelete}
        >
          удалить
        </button>
      </div>

      <PromoForm
        register={register}
        handleSubmit={handleSubmit}
        handle={updatePromoHandler}
        handleFile={handleFileChangeUpdate}
        button={"изменить"}
      />

      <CropModal img={img} setCropData={setCropData} cropData={cropData} setImg={setImg} />
      {promo && (
        <div className="mt-5 mb-5">
          <img src={promo.photo} style={{ width: "100%", borderRadius: "20px" }} alt="" />
        </div>
      )}
    </div>
  );
}

export default UpdatePromo;
