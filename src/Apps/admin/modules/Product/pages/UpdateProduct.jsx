import React, { useEffect, useState } from 'react'
import { ProductForm } from '../components/ProductForm'
import { useForm } from 'react-hook-form'
import {
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../../../../store/admin/productsApi'
import { useNavigate, useParams } from 'react-router-dom'
import CropModal from '../components/CropModal'
import Loading from '../../../../client/components/Loading'

function UpdateProduct() {
  const params = useParams()
  const { data: product, isLoading: dLoading } = useGetProductQuery(params.id)
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const { register, handleSubmit, reset } = useForm()
  const [img, setImg] = useState(null)
  const [cropData, setCropData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!img) {
      reset({ photo: null })
    }
  }, [img])

  useEffect(() => {
    if (product) {
      const { photo, ...rest } = product
      reset(rest)
    }
  }, [product, reset])

  const isLoading = dLoading || updateLoading

  const handleFileChangeUpdate = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateProductHandler = async (data) => {
    let formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        return [...value].forEach((item) => formData.append(key, item))
      }
      formData.append(key, value)
    })
    formData.append('crop', JSON.stringify(cropData))
    await updateProduct({ body: formData, updatedItem: Number(params.id) })
    navigate(-1)
  }

  const handledelete = async () => {
    if (window.confirm('вы действительно хотите удалить позицию')) {
      await deleteProduct(params.id)
      navigate(-1)
    }
  }

  return (
    <div className="container">
      {isLoading && <Loading />}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success mt-3 mb-3"
          onClick={() => navigate(-1)}
        >
          вернуться
        </button>

        <button className="btn btn-danger mt-3 mb-3" onClick={handledelete}>
          удалить
        </button>
      </div>

      <ProductForm
        register={register}
        handleSubmit={handleSubmit}
        product={updateProductHandler}
        handleFileChange={handleFileChangeUpdate}
        button={'изменить'}
      />
      <CropModal
        img={img}
        setCropData={setCropData}
        handleFileChange={handleFileChangeUpdate}
        setImg={setImg}
        cropData={cropData}
      />

      {product && (
        <div className="mt-5 mb-5">
          <img
            src={product.photo}
            style={{ width: '100%', borderRadius: '20px' }}
            alt=""
          />
        </div>
      )}
    </div>
  )
}

export default UpdateProduct
