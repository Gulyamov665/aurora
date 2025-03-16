import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { useLazyGetProductsQuery } from "@store/admin/api/productsApi.js";
import { useUpdateProductMutation } from "@store/admin/api/productsApi.js";
import { useAddCategoryMutation, useGetCategoriesQuery } from "@store/admin/api/categoryApi.js";
import { useUpdateOrderMutation, useDeleteCategoryMutation } from "@store/admin/api/categoryApi.js";
import { useUpdateCategoryMutation } from "@store/admin/api/categoryApi.js";
import { toast } from "react-toastify";
import { modals } from "@store/appSlice";
import { getVendorId } from "@store/admin/slices/vendorSlice";
import { CategoryItemType } from ".";
import { ProductType } from "@store/user/types";
import ReorderPage from "../components/ReorderPage";
import AdminCard from "../components/AdminCard";
import styles from "../static/AdminCategory.module.scss";
import CategoryModal from "../../client/components/CategoryModal";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { OutletContextType } from "@/apps/client/pages";

export default function AdminCategory() {
  const { data: vendor, res } = useOutletContext<OutletContextType>();
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [getProducts, { data: menuItems }] = useLazyGetProductsQuery();
  const { data: category } = useGetCategoriesQuery(res);
  const [items, setItems] = useState<CategoryItemType[] | []>([]);
  const [updateProduct] = useUpdateProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { selectedCategory: categoryId } = useSelector(modals);
  const [editCategory, setEditCategory] = useState(false);
  const [changeItem, setChangeItem] = useState<CategoryItemType | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor) dispatch(getVendorId(vendor.id));
  }, [vendor, dispatch]);

  useEffect(() => {
    if (categoryId) getSelectedCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setItems(category);
  }, [category]);

  const handleActiveToggle = async (item: ProductType) => {
    const { photo, ...newItem } = item;
    const updatedItem = {
      newItem,
      is_active: !item.is_active,
    };
    await updateProduct({
      body: updatedItem,
      updatedItem: item.id,
    }).unwrap();
  };

  const handleCategory = async () => {
    const categoryItem = {
      restaurant: vendor?.id,
      name: newCategory,
    };

    await addCategory(categoryItem).unwrap();
    setShowModalCategory(!showModalCategory);
    toast.success("Новая категория добавлена");
  };

  const handleUpdataCategory = async () => {
    await updateCategory({
      body: {
        ...changeItem,
        name: newCategory,
      },
      id: changeItem?.id,
    });
    setEditCategory(false);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({
      id: changeItem?.id,
    });
    setEditCategory(false);
  };

  const updatePosition = async () => {
    const update = items.map((item) => item.id);
    await updateOrder(update);
  };

  const getSelectedCategory = async (id: number) => {
    await getProducts({ res: res, category: id }, true);
  };

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
            select={categoryId}
            getProducts={getSelectedCategory}
            setEditCategory={setEditCategory}
            setNewCategory={setNewCategory}
            setChangeItem={setChangeItem}
          />
        </div>
      </div>
      <div className={styles.menuItems}>
        {categoryId && (
          <div role="button" data-bs-toggle="modal" data-bs-target="#create_mode" className={`${styles.col_1}`}>
            <Link to={`/admin/${res}/add-product`} style={{ textDecoration: "none", color: "black" }}>
              <p className="pt-5 text-center">Добавить</p>
            </Link>
          </div>
        )}
        {categoryId &&
          menuItems
            ?.filter((obj: ProductType) => obj.category === categoryId)
            .map((item: ProductType) => (
              <AdminCard
                key={item.id}
                item={item}
                isActive={item.is_active}
                onChange={() => handleActiveToggle({ ...item })}
              />
            ))}
      </div>
    </>
  );
}
