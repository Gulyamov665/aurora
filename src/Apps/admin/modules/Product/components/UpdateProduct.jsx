import React, { useEffect, useState } from 'react'
import { ProductForm } from './ProductForm'
import { useForm } from 'react-hook-form'
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../../../../store/admin/productsApi'
import { useNavigate, useParams } from 'react-router-dom'
import CropModal from './CropModal'

function UpdateProduct() {
  const params = useParams()
  const { data: product } = useGetProductQuery(params.id)
  const [updateProduct] = useUpdateProductMutation()
  const { register, handleSubmit, reset } = useForm()
  const [img, setImg] = useState(null)
  const [cropData, setCropData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      const { photo, ...rest } = product
      reset(rest)
    }
  }, [product, reset])

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

  return (
    <div className="container">
      <button
        className="btn btn-success mt-3 mb-3"
        onClick={() => navigate(-1)}
      >
        вернуться
      </button>

      <ProductForm
        register={register}
        handleSubmit={handleSubmit}
        product={updateProductHandler}
        handleFileChange={handleFileChangeUpdate}
      />

      <CropModal img={img} setCropData={setCropData} />
    </div>
  )
}

export { UpdateProduct }
