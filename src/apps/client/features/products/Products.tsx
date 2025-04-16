import { FC, useMemo, useCallback, MouseEvent, useState } from "react";
import { ProductData, ProductsProps } from "./types";
import { useAddToCartMutation, useDecreaseItemMutation, useGetCartQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../pages";
import { handleAddToCart } from "@/Utils/tools";
import { MaterialModal } from "@/apps/common/Modal";
import { GuestBox } from "./components/GuestBox";
import { CartItem } from "@store/user/types";
import Card from "../card/Card";

const Products: FC<ProductsProps> = ({ menuItems, category, sectionRefs, handleView }) => {
  const [addToCart] = useAddToCartMutation();
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const { data: items } = useGetCartQuery(
    { user: isUser?.user_id, vendorId: data?.id },
    { skip: !data?.id || !isUser?.user_id }
  );
  const [decreaseItem] = useDecreaseItemMutation();
  const [toRegPage, setToRegPage] = useState(false);

  const activeCategories = useMemo(() => category.filter(({ is_active }) => is_active), [category]);
  const activeMenuItems = useMemo(() => menuItems.filter(({ is_active }) => is_active), [menuItems]);

  const setSectionRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      if (ref) sectionRefs.current[index] = ref;
    },
    [sectionRefs]
  );

  const findItem = (id: number) => {
    return items?.products?.find((item: CartItem) => item.id === id);
  };

  const decrease = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    if (!isUser?.user_id || !data?.id) return;
    e.stopPropagation();

    decreaseItem({
      product_id: id,
      user_id: isUser?.user_id,
      restaurant_id: data.id,
    });
  };

  const onClick = async (event: MouseEvent<HTMLButtonElement>, productData: ProductData) => {
    if (!isUser?.user_id || !data?.id) {
      event.stopPropagation();
      return setToRegPage(true);
    }
    handleAddToCart({
      event,
      productData,
      userId: isUser?.user_id,
      restaurantId: data.id,
      addToCart,
    });
  };

  return (
    <>
      {activeCategories.map((item, index) => (
        <div id={index.toString()} className="section" key={item.id} ref={(ref) => setSectionRef(ref, index)}>
          <div className="container">
            <h2 className="cat_name pt-4">{item.name}</h2>
            <hr />
            <div className="row">
              {activeMenuItems
                .filter(({ category }) => category === item.id)
                .map((filteredObj) => (
                  <div
                    onClick={() => handleView(filteredObj)}
                    key={filteredObj.id}
                    className="col-6 col-sm-6 col-md-4 col-lg-3 "
                  >
                    <Card product={filteredObj} findItem={findItem} decrease={decrease} addToCart={onClick} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      <MaterialModal open={toRegPage} onClose={() => setToRegPage(false)} minHeight={0}>
        <GuestBox setToRegPage={setToRegPage} />
      </MaterialModal>
    </>
  );
};

export default Products;
