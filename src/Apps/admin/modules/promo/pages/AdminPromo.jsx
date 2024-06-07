import React from 'react'
import styles from '../assets/AdminPromo.module.scss'
import { useUpdatePromoMutation } from '../../../../../store/admin/promoApi'
import { useGetPromosQuery } from '../../../../../store/admin/promoApi'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Promos from '../components/Promos'

const AdminPromo = () => {
  const { res } = useParams()
  const { data: promo = [] } = useGetPromosQuery(res)
  const [updatePromos] = useUpdatePromoMutation()

  //Toggle update function
  const updatePromo = async (item) => {
    delete item.photo
    const updatePromo = {
      ...item,
      is_active: !item.is_active,
    }
    await updatePromos({
      body: updatePromo,
      id: item.id,
    }).unwrap()
  }

  return (
    <div className={`${styles.container_promo}`}>
      <div className={`${styles.add_promo}`}>
        <Link
          to={`/admin/${res}/add-promo`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <p className="pt-5 text-center">Добавить</p>
        </Link>
      </div>

      <Promos data={promo} updatePromo={updatePromo} />
    </div>
  )
}

export default AdminPromo
