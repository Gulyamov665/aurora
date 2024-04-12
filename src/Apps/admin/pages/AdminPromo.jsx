import React, { useState, useEffect } from 'react'
import styles from '../static/AdminPromo.module.scss'
import FormControlLabel from '@mui/material/FormControlLabel'
import EditNoteIcon from '@mui/icons-material/EditNote'
import IOSSwitch from '../../client/components/MuiSwitch'
import {
  useAddPromosMutation,
  useUpdatePromoMutation,
} from '../../../store/admin/promoApi'
import { useForm } from 'react-hook-form'
import { useGetPromosQuery } from '../../../store/admin/promoApi'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import PromoModal from '../components/PromoModal'
import UpdateForm from '../components/UpdateForm'

const AdminPromo = () => {
  const { res } = useParams()
  const { data: promo = [] } = useGetPromosQuery(res)
  const { register, handleSubmit, reset } = useForm()
  const [addPromos] = useAddPromosMutation()
  const [updatePromos] = useUpdatePromoMutation()
  const [updateModal, setUpdateModal] = useState(false)
  const [show, setShow] = useState(false)
  const [id, setId] = useState(null)

  // console.log(id)
  // console.log(show)

  const addPromo = async (data) => {
    let formData = new FormData()

    formData.append('restaurant', 3)
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        formData.append(key, value[0])
      }
      formData.append(key, value)
    })

    await addPromos(formData).unwrap()
    reset()
    setShow(!show)
  }

  const updatePromo = async (item) => {
    delete item.photo

    const updatePromo = {
      ...item,
      is_active: !item.is_active,
      restaurant: 3,
    }

    await updatePromos({
      body: updatePromo,
      id: item.id,
    }).unwrap()
  }

  const updatePromoItem = async (item) => {
    setId(item)
    delete item.photo
    setShow(!show)
    console.log({ item })
  }
  const handleShow = () => setShow(true)

  return (
    <div className={`${styles.container_promo}`}>
      {!id ? (
        <PromoModal
          show={show}
          setShow={setShow}
          register={register}
          handleSubmit={handleSubmit}
          submit={addPromo}
        />
      ) : (
        <UpdateForm
          show={show}
          setShow={setShow}
          register={register}
          handleSubmit={handleSubmit}
          submit={updatePromoItem}
        />
      )}
      <div className={`${styles.add_promo}`} onClick={handleShow}>
        <AddIcon />
      </div>
      {promo?.map((item) => (
        <div key={item.id} className={`${styles.card_promo}`}>
          <div className={styles.img}>
            <img src={item.photo} alt="" />
          </div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.name_active}>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={item.is_active}
                  onChange={() => updatePromo({ ...item })}
                />
              }
              label="Активность"
            />
            <div onClick={() => updatePromoItem({ ...item })}>
              <EditNoteIcon />
            </div>
          </div>
          <div className={styles.switch}></div>
        </div>
      ))}
    </div>
  )
}

export default AdminPromo
