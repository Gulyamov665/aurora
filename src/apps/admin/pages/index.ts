import { CategoryMutationType, DeleteCategoryType, UpdateCategoryType } from "@store/admin/api/categoryApi";
import { VendorInfoType } from "@store/user/types";

export type CategoryItemType = {
  id: number;
  restaurant: number;
  name: string;
  order: number;
  is_active: boolean;
};

export type CategoriesListType = {
  updatePosition: () => void;
  items: CategoryItemType[];
  setItems: React.Dispatch<React.SetStateAction<CategoryItemType[] | []>>;
  categoryId: number;
  setChangeItem: React.Dispatch<React.SetStateAction<CategoryItemType | null>>;
  addCategory: CategoryMutationType[0];
  vendor: VendorInfoType;
  updateCategory: UpdateCategoryType[0];
  deleteCategory: DeleteCategoryType[0];
  changeItem: CategoryItemType | null;
};
