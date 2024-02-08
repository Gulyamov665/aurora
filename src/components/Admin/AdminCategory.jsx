import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import AdminCard from './AdminCard'
import styles from './AdminCategory.module.scss'
import MenuModal from '../MenuModal'
import CategoryModal from '../CategoryModal'
import {
  toggleCreate,
  toggleUpdate,
  selectedCategory,
} from '../../store/appSlice'

import { useParams } from 'react-router-dom'
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../../store/productsApi'
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateOrderMutation,
} from '../../store/categoryApi'
import { Reorder } from 'framer-motion'
import { toast } from 'react-toastify'

export default function AdminCategory() {
  const { res } = useParams()
  const { restData } = useAxios(`category_get`)
  const rest = restData && restData.id
  const [showModalCategory, setShowModalCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [updatedItem, setUpdatedItem] = useState(null)
  const { data: menuItems } = useGetProductsQuery(res)
  const { data: category } = useGetCategoriesQuery(res)
  const [items, setItems] = useState([])
  const [updateProduct] = useUpdateProductMutation()
  const [addCategory] = useAddCategoryMutation()
  const [updateOrder] = useUpdateOrderMutation()
  const { createModal, selectedCategory: select } = useSelector(
    (state) => state.modals
  )
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    createModal ? dispatch(toggleCreate()) : dispatch(toggleUpdate())
  }

  //todo WebHook, setWebHook,

  const handleActiveToggle = async (item) => {
    delete item.photo
    const updatedItem = {
      ...item,
      is_active: !item.is_active,
    }
    await updateProduct({
      body: updatedItem,
      updatedItem: item.id,
    }).unwrap()
  }

  const handleCategory = async () => {
    const categoryItem = {
      restaurant: rest,
      name: newCategory,
    }

    await addCategory(categoryItem).unwrap()
    setShowModalCategory(!showModalCategory)
    toast.success('Новая категория добавлена')
  }

  useEffect(() => {
    setItems(category)
  }, [category])

  const updatePosition = async () => {
    const update = items.map((item) => item.id)
    await updateOrder(update)
  }
  console.log(items)

  return (
    <>
      <div className={styles.category}>
        <div className="col d-flex flex-column mt-3 sticky-top">
          <h4 className="text-center text-dark">Категории</h4>
          <button
            className={`btn mt-2 fs-sm-1 ${styles.but_col}`}
            onClick={() => setShowModalCategory(!showModalCategory)}
          >
            Добавить категорию
          </button>

          <CategoryModal
            showModalCategory={showModalCategory}
            setShowModalCategory={setShowModalCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleCategory={handleCategory}
          />

          {items && (
            <Reorder.Group
              axis="y"
              as="div"
              values={items}
              onReorder={setItems}
            >
              {items &&
                items.map((item, i) => (
                  <Reorder.Item
                    className={styles.but_col}
                    key={item.id}
                    value={item}
                    onMouseUpCapture={() => updatePosition()}
                  >
                    <button
                      key={item.id}
                      onClick={() => dispatch(selectedCategory(item.id))}
                      className={`btn mt-2 ${styles.but_col} ${
                        select === item.id ? styles.but_col_active : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          )}
        </div>
      </div>
      <div className={styles.menuItems}>
        {select && (
          <div
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#create_mode"
            className={`${styles.col_1} mt-2`}
          >
            <p
              className="pt-5 text-center"
              onClick={() => dispatch(toggleCreate())}
            >
              Добавить Меню
            </p>
            <MenuModal
              updatedItem={updatedItem}
              close={handleCloseModal}
              restaurant={rest}
            />
          </div>
        )}
        {select &&
          menuItems
            .filter((obj) => obj.category === select)
            .map((item) => (
              <AdminCard
                setUpdatedItem={setUpdatedItem}
                key={item.id}
                item={item}
                isActive={item.is_active}
                onChange={() => handleActiveToggle({ ...item })}
              />
            ))}
      </div>
    </>
  )
}
