import { ChangeEvent, useEffect, useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDeleteProductMutation, useGetImageByIdQuery, useGetProductQuery } from "@store/admin/api/productsApi";
import { useUpdateImageMutation, useUpdateProductMutation } from "@store/admin/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import CropModal from "../components/CropModal";
import { showImage } from "@/Utils/tools";
import { FormValuesType } from "../types";
import { snack } from "@/apps/common/Notistack";


function UpdateProduct() {
  const { id = "" } = useParams();
  const { data: productImage } = useGetImageByIdQuery(id);
  const { data: product, isLoading } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { register, handleSubmit, reset, watch } = useForm<FormValuesType>();
  const [img, setImg] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<Blob | null>(null);
  const [cropData, setCropData] = useState<Cropper.Data | null>(null);
  const [loadImage, { isLoading: ImageIsLoading }] = useUpdateImageMutation();
  const { deleteItem, confirmedId } = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      if (confirmedId) {
        await deleteProduct(confirmedId);
        snack.warning("Продукт успешно удален!")
        navigate(-1);
      }
    };
    handleDelete();
  }, [confirmedId]);

  useEffect(() => {
    reset(product);
  }, [isLoading]);

  const handleDeleteProduct = () => {
    if (product) deleteItem({ id: product.id, message: product.name, type: "create-product" });
  };

  const handleFileChangeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    showImage(e, setFile, setImg);
  };

  const uploadImage = async () => {
    let formData = new FormData();

    formData.append("crop", JSON.stringify(cropData));
    if (file) formData.append("photo", file);

    await loadImage({ body: formData, productId: Number(id) }).unwrap();
  };

  const onSubmit: SubmitHandler<FormValuesType> = async (body) => {
    delete body.photo;
    await updateProduct({ body, id });
    snack.success("Продукт успешно обновлен!")
    navigate(-1);
  };

  return (
    <div className="container">
      <ProductForm
        register={register}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChangeUpdate}
        productImage={productImage}
        onSubmit={onSubmit}
        deleteItem={handleDeleteProduct}
        watch={watch}
        ImageIsLoading={ImageIsLoading}
      />

      <CropModal img={img} setCropData={setCropData} setImg={setImg} cropData={cropData} uploadImage={uploadImage} />
    </div>
  );
}

export default UpdateProduct;
