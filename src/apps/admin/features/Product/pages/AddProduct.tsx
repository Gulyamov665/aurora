// import { useState, useEffect, ChangeEvent } from "react";
// import { useForm } from "react-hook-form";
// import { ProductForm } from "../components/ProductForm";
// import { useAddProductMutation, useUpdateImageMutation } from "@store/admin/api/productsApi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { modals } from "@store/appSlice";
// import CropModal from "../components/CropModal";

// function AddProduct() {
//   const { register, handleSubmit, reset } = useForm();
//   const [addProduct] = useAddProductMutation();
//   const [loadImage] = useUpdateImageMutation();
//   const { selectedCategory: category } = useSelector(modals);
//   const [img, setImg] = useState<string | ArrayBuffer | null>(null);
//   const [file, setFile] = useState<Blob | null>(null);
//   const [cropData, setCropData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!category) {
//       navigate(-1);
//     }
//   }, [category]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImg(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addProductHandler = async (data) => {
//     const data2 = {
//       ...data,
//       restaurant: 3,
//       category: 8,
//     };

//     await addProduct(data2).unwrap();
//     reset();
//     toast.success("Позиция добавлена");
//     navigate(-1);
//   };

//   const uploadImage = async () => {
//     let formData = new FormData();

//     formData.append("crop", JSON.stringify(cropData));
//     if (file) formData.append("photo", file);
//     await loadImage({ body: formData, productId: 423 });

//     navigate(-1);
//   };
//   return (
//     <div className="container">
//       <button className="btn btn-success mt-3 mb-3" onClick={() => navigate(-1)}>
//         вернуться
//       </button>
//       <ProductForm
//         register={register}
//         handleSubmit={handleSubmit}
//         product={addProductHandler}
//         handleFileChange={handleFileChange}
//         button={"добавить"}
//       />
//       {/* <CropModal cropData={cropData} img={img} setImg={setImg} setCropData={setCropData} uploadImage={uploadImage} /> */}
//     </div>
//   );
// }

// export default AddProduct;
