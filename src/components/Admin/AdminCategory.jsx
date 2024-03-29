import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import AdminCard from './AdminCard'
import styles from './AdminCategory.module.scss'
import MenuModal from '../Client/MenuModal'
import CategoryModal from '../Client/CategoryModal'
import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { toggleCreate, toggleUpdate } from '@store/appSlice'
import { useParams } from 'react-router-dom'
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@store/admin/productsApi'
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateOrderMutation,
} from '@store/admin/categoryApi'
import { toast } from 'react-toastify'
import ReorderPage from './ReorderPage'

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
  console.log()
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

  return (
    <>
      <div className={styles.category}>
        <div className="col d-flex flex-column sticky-top">
          <h4 className="text-center text-dark">Категории</h4>
          <div className="btn-group">
            <button
              className={`btn mt-2 fs-sm-1 ${styles.but_col}`}
              onClick={() => setShowModalCategory(!showModalCategory)}
            >
              <AddIcon />
            </button>
            <button className={`btn mt-2 fs-sm-1 ${styles.but_col}`}>
              <EditNoteIcon />
            </button>
          </div>
          <CategoryModal
            showModalCategory={showModalCategory}
            setShowModalCategory={setShowModalCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleCategory={handleCategory}
          />

          <ReorderPage
            updatePosition={updatePosition}
            items={items}
            setItems={setItems}
            select={select}
          />
        </div>
      </div>
      <div className={styles.menuItems}>
        {select && (
          <div
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#create_mode"
            className={`${styles.col_1}`}
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
            ?.filter((obj) => obj.category === select)
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
