import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { CardViewProps } from "./types";
import { Dialog } from "@mui/material";
import { CardViewContent } from "./components/CardViewContent";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { CardViewContentFullSize } from "./components/CardViewContentFullSize";
import { handleAddToCart, updateCartCache } from "@/Utils/tools";
import { OutletContextType } from "../../pages";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "@store/admin/api/orders";
import { authState } from "@store/user/slices/authSlice";
import { IVariants } from "../order/types/orderTypes";
import { AppDispatch } from "@store/index";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const CardView: FC<CardViewProps> = ({ item, open, setIsOpen, count, setCount }) => {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const [addToCart] = useAddToCartMutation();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [option, setOption] = useState<IVariants | null>(null);
  const controls = useDragControls();
  const breakpoint = useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();

  // устанавливаем значение поумолчанию варианта при открытии модального окна
  useEffect(() => {
    if (item && item.options?.variants.length > 0) {
      const filteredVariants = item.options.variants.filter((v) => v.is_active);
      setSelectedVariant(filteredVariants[0].id);
    }
  }, [item]);

  // устанавливаем опцию при изменении выбранного варианта
  useEffect(() => {
    if (selectedVariant && item) {
      const options = item.options?.variants.find((v) => v.id === selectedVariant);
      setOption(options ?? null);
    }
  }, [selectedVariant, item]);

  const onAddProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!item) return;
    if (!item || !isUser?.user_id || !data?.id) return;

    const productData = {
      id: item.id,
      name: item.name,
      price: item.price,
      photo: item.photo,
      options: option,
    };

    updateCartCache(dispatch, isUser.user_id, data.id, productData);

    handleAddToCart({ event, productData, quantity: count, userId: isUser?.user_id, restaurantId: data.id, addToCart });
    setIsOpen(false);
  };

  return (
    // <AnimatePresence>
    //   {open && (
    //     <Dialog open={open} onClose={() => setIsOpen(!open)}>
    //       <div className="card_modal" onClick={() => setIsOpen(!open)}></div>

    //       <motion.div
    //         drag="y"
    //         dragControls={controls}
    //         dragElastic={{ top: 0, bottom: 1 }}
    //         dragConstraints={{ top: 0, bottom: 0 }}
    //         onDragEnd={(_, info) => {
    //           if (info.offset.y > 100) {
    //             setIsOpen(false);
    //           }
    //         }}
    //         initial={{ y: "100%" }}
    //         animate={{ y: 0 }}
    //         exit={{ y: "100%" }}
    //         transition={{ duration: 0.3 }}
    //         style={{
    //           position: "fixed",
    //           bottom: 0,
    //           background: "white",
    //         }}
    //         className="card_view_motion"
    //       >
    //         {item &&
    //           (breakpoint === "lg" || breakpoint === "xl" ? (
    //             <CardViewContentFullSize
    //               item={item}
    //               count={count}
    //               setCount={setCount}
    //               setIsOpen={setIsOpen}
    //               onAdd={onAddProduct}
    //               selectedVariant={selectedVariant}
    //               setSelectedVariant={setSelectedVariant}
    //               option={option}
    //             />
    //           ) : (
    //             <CardViewContent
    //               item={item}
    //               count={count}
    //               setCount={setCount}
    //               setIsOpen={setIsOpen}
    //               onAdd={onAddProduct}
    //               selectedVariant={selectedVariant}
    //               setSelectedVariant={setSelectedVariant}
    //               option={option}
    //             />
    //           ))}
    //       </motion.div>
    //     </Dialog>
    //   )}
    // </AnimatePresence>

    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      disableDiscovery={false} // разрешает "потянуть вверх"
      disableSwipeToOpen={false} // можно свайпом открыть
      transitionDuration={225}
      hysteresis={0.55}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: "90vh",
        },
      }}
    >
      <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
        {item &&
          (breakpoint === "lg" || breakpoint === "xl" ? (
            <CardViewContentFullSize
              item={item}
              count={count}
              setCount={setCount}
              setIsOpen={setIsOpen}
              onAdd={onAddProduct}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              option={option}
            />
          ) : (
            <CardViewContent
              item={item}
              count={count}
              setCount={setCount}
              setIsOpen={setIsOpen}
              onAdd={onAddProduct}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              option={option}
            />
          ))}
      </div>
    </SwipeableDrawer>
  );
};
export default CardView;
