import { FC } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/store/cartSlice";
import { CardViewProps } from "./types";
import { ProductType } from "../category/types";
import { Dialog } from "@mui/material";
import CardViewContent from "./components/CardViewContent";

const CardView: FC<CardViewProps> = ({ item, open, setIsOpen, count, setCount }) => {
  const controls = useDragControls();
  const dispatch = useDispatch();

  const addToCart = (item: ProductType) => {
    const cartItem = {
      ...item,
      quantity: count,
    };
    dispatch(addCartItem(cartItem));
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onClose={() => setIsOpen(!open)}>
          <div className="card_modal" onClick={() => setIsOpen(!open)}></div>

          <motion.div
            drag="y"
            dragControls={controls}
            dragElastic={{ top: 0, bottom: 1 }}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                setIsOpen(false);
              }
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 0,
              background: "white",
            }}
            className="card_view_motion"
          >
            {item && (
              <CardViewContent addToCart={addToCart} item={item} count={count} setCount={setCount}></CardViewContent>
            )}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
export default CardView;
