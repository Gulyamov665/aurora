import { ReorderPage } from "../components/ReorderPage";
import { FC, useState } from "react";
// import { toast } from "react-toastify";
import { CategoriesListType } from ".";
import CategoryModal from "@/apps/client/components/CategoryModal";
import styles from "../static/AdminCategory.module.scss";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { snack } from "@/apps/common/notistack";

export const CategoriesList: FC<CategoriesListType> = ({
  updatePosition,
  items,
  setItems,
  categoryId,
  setChangeItem,
  addCategory,
  vendor,
  updateCategory,
  deleteCategory,
  changeItem,
}) => {
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(false);

  const handleCategory = async () => {
    const categoryItem = {
      restaurant: vendor?.id,
      name: newCategory,
    };

    await addCategory(categoryItem).unwrap();
    setShowModalCategory(!showModalCategory);
    snack.success("Успех!")
  };
  const handleUpdataCategory = async () => {
    await updateCategory({
      body: {
        ...changeItem,
        name: newCategory,
      },
      id: categoryId,
    });
    setEditCategory(false);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({
      id: categoryId,
    });
    setEditCategory(false);
  };

  return (
    <div className="col d-flex flex-column">
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
        setEditCategory={setEditCategory}
        setNewCategory={setNewCategory}
        setChangeItem={setChangeItem}
      />
    </div>
  );
};
