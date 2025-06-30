import React from "react";
import { useDispatch } from "react-redux";
import { Reorder } from "framer-motion";
import { selectedCategory } from "@store/appSlice";
import { CategoryItemType } from "../pages";
import styles from "./Reorder.module.scss";
import EditNoteIcon from "@mui/icons-material/EditNote";

export type ReorderPageProps = {
  updatePosition: () => void;
  items: CategoryItemType[];
  setItems: React.Dispatch<React.SetStateAction<CategoryItemType[] | []>>;
  select: number;
  setEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
  setChangeItem: React.Dispatch<React.SetStateAction<CategoryItemType | null>>;
};
export const ReorderPage: React.FC<ReorderPageProps> = ({
  updatePosition,
  items,
  setItems,
  select,
  setEditCategory,
  setNewCategory,
  setChangeItem,
}) => {
  const dispatch = useDispatch();

  const handleChangeCategory = (item: CategoryItemType) => {
    setEditCategory(true);
    setNewCategory(item.name);
    setChangeItem({
      ...item,
    });
  };

  return (
    <div>
      {items && (
        <Reorder.Group axis="y" as="div" values={items} onReorder={setItems}>
          {items &&
            items.map((item) => (
              <Reorder.Item
                className={styles.but_col}
                key={item.id}
                value={item}
                onDragEnd={() => updatePosition()}
                whileDrag={{ scale: 1.1 }}
              >
                <button
                  key={item.id}
                  onClick={() => dispatch(selectedCategory(item.id))}
                  className={`btn mt-2 ${styles.but_col} ${select === item.id ? styles.but_col_active : ""}`}
                >
                  <div className={styles.button_name}>
                    <div className={styles.button_text}>{item.name}</div>
                    <EditNoteIcon
                      onClick={() => {
                        handleChangeCategory(item);
                      }}
                    />
                  </div>
                </button>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      )}
    </div>
  );
};
