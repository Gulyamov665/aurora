import { ChangeEvent, useEffect, useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDeleteProductMutation, useGetImageByIdQuery, useVariantDeleteMutation } from "@store/admin/api/productsApi";
import { useGetProductQuery, useVariantMutation } from "@store/admin/api/productsApi";
import { useUpdateImageMutation, useUpdateProductMutation } from "@store/admin/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import { showImage } from "@/Utils/tools";
import { FormValuesType } from "../types";
import { Box, Tab, Tabs } from "@mui/material";
import { styles } from "@/apps/common/styles/styles";
import { ProductVariants } from "./ProductVariants";
import CropModal from "../components/CropModal";

function UpdateProduct() {
  const { id = "" } = useParams();
  const { data: productImage } = useGetImageByIdQuery(id);
  const { data: product, isLoading } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addVariant] = useVariantMutation();
  const [deleteVariant, deleteResult] = useVariantDeleteMutation();
  const { register, handleSubmit, reset, watch } = useForm<FormValuesType>();
  const [img, setImg] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<Blob | null>(null);
  const [cropData, setCropData] = useState<Cropper.Data | null>(null);
  const [loadImage, { isLoading: ImageIsLoading }] = useUpdateImageMutation();
  const { deleteItem, confirmedId, type } = useDelete();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const handleDelete = async () => {
      if (confirmedId && type === "create-product") {
        await deleteProduct(confirmedId);
        navigate(-1);
      }
    };
    handleDelete();
  }, [confirmedId]);

  useEffect(() => {
    reset({
      availability: product?.availability,
      description: product?.description,
      id: product?.id,
      is_active: product?.is_active,
      name: product?.name,
      price: product?.price,
    });
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
    await updateProduct({ body, id });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="container">
      <Box sx={{ maxWidth: 1200, width: "100%", mt: 2 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: { backgroundColor: "#210648" },
          }}
        >
          <Tab iconPosition="start" label="Основное" sx={styles.tabStyle} />
          <Tab iconPosition="start" label="Опции" sx={styles.tabStyle} />
        </Tabs>
      </Box>
      {tab === 0 && (
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
      )}

      {tab === 1 && product?.options && (
        <ProductVariants
          data={product.options}
          addVariant={addVariant}
          deleteVariant={deleteVariant}
          deleteResult={deleteResult}
          variantGroup={product?.options.id}
        />
      )}

      <CropModal img={img} setCropData={setCropData} setImg={setImg} cropData={cropData} uploadImage={uploadImage} />
    </div>
  );
}

export default UpdateProduct;
