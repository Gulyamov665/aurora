import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useAddProductMutation, useLazyGetProductsQuery } from "@store/admin/api/productsApi.js";
import { useUpdateProductMutation } from "@store/admin/api/productsApi.js";
import { useAddCategoryMutation, useGetCategoriesQuery } from "@store/admin/api/categoryApi.js";
import { useUpdateOrderMutation, useDeleteCategoryMutation } from "@store/admin/api/categoryApi.js";
import { useUpdateCategoryMutation } from "@store/admin/api/categoryApi.js";
import { modals } from "@store/appSlice";
import { CategoryItemType } from ".";
import { ProductType } from "@store/user/types";
import { OutletContextType } from "@/apps/client/pages";
import { useActions } from "@/hooks/useActions";
import { CategoriesList } from "./CategoriesList";
import { CreateModal } from "../features/Product/pages/CreateModal";
import { Fab } from "@mui/material";
import AdminCard from "../components/AdminCard";
import styles from "../static/AdminCategory.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { LoadingScreen } from "../features/loading/LoadingScreen";

export default function AdminCategory() {
  const { data: vendor, res } = useOutletContext<OutletContextType>();
  const [getProducts, { data: menuItems, isFetching: getProductLoading }] = useLazyGetProductsQuery();
  const { data: category } = useGetCategoriesQuery(res);
  const [items, setItems] = useState<CategoryItemType[] | []>([]);
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { selectedCategory: categoryId } = useSelector(modals);
  const [changeItem, setChangeItem] = useState<CategoryItemType | null>(null);
  const { setOpenAddModal } = useActions();

  useEffect(() => {
    if (categoryId) getSelectedCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setItems(category);
  }, [category]);

  const handleActiveToggle = async (item: ProductType) => {
    const updatedItem = {
      restaurant: item.restaurant,
      category: item.category,
      is_active: !item.is_active,
    };
    await updateProduct({
      body: updatedItem,
      id: item.id,
    }).unwrap();
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
        <CategoriesList
          updatePosition={updatePosition}
          items={items}
          setItems={setItems}
          setChangeItem={setChangeItem}
          categoryId={categoryId}
          addCategory={addCategory}
          vendor={vendor}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          changeItem={changeItem}
        />
      </div>
      <div className={styles.menuItems}>
        {getProductLoading && <LoadingScreen loading={getProductLoading} />}
        {categoryId && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() =>
              setOpenAddModal({
                type: "add-product",
                vendorId: vendor.id,
                categoryId: categoryId,
              })
            }
            sx={{ position: "fixed", bottom: 35, right: 15, backgroundColor: "#210648" }}
          >
            <AddIcon />
          </Fab>
        )}
        {menuItems?.map((item: ProductType) => (
          <AdminCard
            key={item.id}
            item={item}
            isActive={item.is_active}
            onChange={() => handleActiveToggle({ ...item })}
          />
        ))}
        <CreateModal fetch={addProduct} title="Добавить позицию" />
      </div>
    </>
  );
}
