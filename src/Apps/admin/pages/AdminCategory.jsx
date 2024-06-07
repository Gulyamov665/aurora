import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminCard from '../components/AdminCard'
import styles from '../static/AdminCategory.module.scss'
import CategoryModal from '../../client/components/CategoryModal'
import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Link, useParams } from 'react-router-dom'
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../../../store/admin/productsApi'
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateOrderMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '../../../store/admin/categoryApi'

import { toast } from 'react-toastify'
import ReorderPage from '../components/ReorderPage'
import { useLoadQuery } from '../../../store/admin/vendorApi'
import { getVendorId } from '../../../store/admin/slices/vendorSlice'

export default function AdminCategory() {
  const { res } = useParams()
  const { data: vendor } = useLoadQuery(res)
  const [showModalCategory, setShowModalCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const { data: menuItems } = useGetProductsQuery(res)
  const { data: category } = useGetCategoriesQuery(res)
  const [items, setItems] = useState([])
  const [updateProduct] = useUpdateProductMutation()
  const [addCategory] = useAddCategoryMutation()
  const [updateOrder] = useUpdateOrderMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { selectedCategory: select } = useSelector((state) => state.modals)
  const [editCategory, setEditCategory] = useState(false)
  const [changeItem, setChangeItem] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (vendor) dispatch(getVendorId(vendor?.id))
  }, [vendor, dispatch])

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
      restaurant: vendor.id,
      name: newCategory,
    }

    await addCategory(categoryItem).unwrap()
    setShowModalCategory(!showModalCategory)
    toast.success('Новая категория добавлена')
  }

  useEffect(() => {
    setItems(category)
  }, [category])

  const handleUpdataCategory = async () => {
    await updateCategory({
      body: {
        ...changeItem,
        name: newCategory,
      },
      id: changeItem.id,
    })
    setEditCategory(false)
  }

  const handleDeleteCategory = async () => {
    await deleteCategory({
      id: changeItem.id,
    })
    setEditCategory(false)
  }

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
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            handleUpdataCategory={handleUpdataCategory}
            handleDeleteCategory={handleDeleteCategory}
          />

          <ReorderPage
            updatePosition={updatePosition}
            items={items}
            setItems={setItems}
            select={select}
            setEditCategory={setEditCategory}
            setNewCategory={setNewCategory}
            setChangeItem={setChangeItem}
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
            <Link
              to={`/admin/${res}/add-product`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <p className="pt-5 text-center">Добавить</p>
            </Link>
          </div>
        )}
        {select &&
          menuItems
            ?.filter((obj) => obj.category === select)
            .map((item) => (
              <AdminCard
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
