import React, { useState } from 'react'
import PromoForm from '../components/PromoForm'
import { useForm } from 'react-hook-form'
import { useLoadQuery } from '../../../../../store/admin/vendorApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddPromosMutation } from '../../../../../store/admin/promoApi'
import CropModal from '../../Product/components/CropModal'
import Loading from '../../../../client/components/Loading'

function AddPromo() {
  const { res } = useParams()
  console.log(res)
  const { data: vendor } = useLoadQuery(res)
  const [addPromos, { isLoading }] = useAddPromosMutation()
  const { register, handleSubmit, reset } = useForm()
  const [img, setImg] = useState(null)
  const [cropData, setCropData] = useState('')
  const navigate = useNavigate()

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

  const handleAddPromo = async (data) => {
    let formData = new FormData()

    formData.append('restaurant', vendor.id)
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        return [...value].forEach((item) => formData.append(key, item))
      }
      formData.append(key, value)
    })
    formData.append('crop', JSON.stringify(cropData))

    await addPromos(formData).unwrap()
    reset()
    navigate(-1)
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="container">
        <button
          className="btn btn-success mt-3 mb-3"
          onClick={() => navigate(-1)}
        >
          вернутся
        </button>
        <PromoForm
          register={register}
          handleSubmit={handleSubmit}
          handle={handleAddPromo}
          handleFile={handleFileChange}
        />
      </div>

      <CropModal img={img} setCropData={setCropData} />
    </>
  )
}

export default AddPromo
