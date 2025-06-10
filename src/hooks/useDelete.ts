import { useActions } from "@/hooks/useActions";
import { modals } from "@store/appSlice";
import { useSelector } from "react-redux";

export const useDelete = () => {
  const { showDeleteModal } = useActions();
  const { deleteConfirmed, deleteModal } = useSelector(modals);

  const confirmedId = deleteConfirmed && deleteModal.id;
  const id = deleteModal.id;
  const type = deleteModal.type;

  const deleteItem = ({ message, type, id }: { message: string; type: string; id: number }) => {
    showDeleteModal({ message, type, id });
  };

  return { deleteItem, confirmedId, id, type };
};
