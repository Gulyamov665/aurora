import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProductForm } from '../components/ProductForm'
import CropModal from '../components/CropModal'
import { useAddProductMutation } from '../../../../../store/admin/productsApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../../client/components/Loading'

function AddProduct() {
  const { register, handleSubmit, reset } = useForm()
  const [addProduct, { isLoading }] = useAddProductMutation()
  const { selectedCategory: category } = useSelector((state) => state.modals)
  const { id: vendor } = useSelector((state) => state.vendor)
  const [img, setImg] = useState(null)
  const [cropData, setCropData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!category) {
      navigate(-1)
    }
  }, [category])

  useEffect(() => {
    if (!img) {
      reset({ photo: null })
    }
  }, [img])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addProductHandler = async (data) => {
    let formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        return [...value].forEach((item) => formData.append(key, item))
      }

      formData.append(key, value)
    })
    if (data.photo) {
      formData.append('crop', JSON.stringify(cropData))
    }
    formData.append('category', +category)
    formData.append('restaurant', vendor)

    await addProduct(formData).unwrap()
    reset()
    navigate(-1)
  }

  return (
    <div className="container">
      {isLoading && <Loading />}
      <button
        className="btn btn-success mt-3 mb-3"
        onClick={() => navigate(-1)}
      >
        вернуться
      </button>
      <ProductForm
        register={register}
        handleSubmit={handleSubmit}
        product={addProductHandler}
        handleFileChange={handleFileChange}
      />
      <CropModal img={img} setImg={setImg} setCropData={setCropData} />
    </div>
  )
}

export default AddProduct
