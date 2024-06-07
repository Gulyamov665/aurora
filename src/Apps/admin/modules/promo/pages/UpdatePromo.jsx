import React, { useEffect, useState } from 'react'
import PromoForm from '../components/PromoForm'
import CropModal from '../../Product/components/CropModal'
import { useForm } from 'react-hook-form'
import {
  useDeletePromoMutation,
  useGetPromoQuery,
  useUpdatePromoMutation,
} from '../../../../../store/admin/promoApi'
import { useNavigate, useParams } from 'react-router-dom'

function UpdatePromo() {
  const { id } = useParams()
  const { data: promo } = useGetPromoQuery(id)
  const [updatePromo] = useUpdatePromoMutation()
  const [deletePromo] = useDeletePromoMutation()
  const { register, handleSubmit, reset } = useForm()
  const [img, setImg] = useState(null)
  const [cropData, setCropData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (promo) {
      const { photo, ...rest } = promo
      reset(rest)
    }
  }, [promo, reset])

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

  const updatePromoHandler = async (data) => {
    let formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        return [...value].forEach((item) => formData.append(key, item))
      }
      formData.append(key, value)
    })
    formData.append('crop', JSON.stringify(cropData))
    await updatePromo({ body: formData, id: Number(id) })
    navigate(-1)
  }

  const handleDelete = async () => {
    if (window.confirm('вы действительно хотите удалить позицию')) {
      await deletePromo(Number(id)).unwrap()
      navigate(-1)
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success mt-3 mb-3"
          onClick={() => navigate(-1)}
        >
          вернуться
        </button>

        <button className="btn btn-danger mt-3 mb-3" onClick={handleDelete}>
          удалить
        </button>
      </div>

      <PromoForm
        register={register}
        handleSubmit={handleSubmit}
        handle={updatePromoHandler}
        handleFile={handleFileChangeUpdate}
      />

      <CropModal img={img} setCropData={setCropData} />
    </div>
  )
}

export default UpdatePromo
