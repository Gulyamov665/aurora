import { FC, useMemo, useCallback, MouseEvent, useState } from "react";
import { ProductData, ProductsProps } from "./types";
import { useAddToCartMutation, useDecreaseItemMutation, useGetCartQuery } from "@store/admin/api/orders";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../pages";
import { handleAddToCart, updateCartCache } from "@/Utils/tools";
import { MaterialModal } from "@/apps/common/Modal";
import { GuestBox } from "./components/GuestBox";
import { CartItem } from "@store/user/types";
import { AppDispatch } from "@store/index";
import Card from "../card/Card";

export const Products: FC<ProductsProps> = ({ menuItems, category, sectionRefs, handleView }) => {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const [addToCart] = useAddToCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [toRegPage, setToRegPage] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const activeCategories = useMemo(() => category.filter(({ is_active }) => is_active), [category]);
  const activeMenuItems = useMemo(() => menuItems.filter(({ is_active }) => is_active), [menuItems]);

  const setSectionRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      if (ref) sectionRefs.current[index] = ref;
    },
    [sectionRefs]
  );

  const findItem = (id: number): number => {
    if (!items?.products) return 0;

    return items.products
      .filter((item: CartItem) => item.id === id)
      .reduce((sum: number, item: CartItem): number => sum + (item.quantity ?? 0), 0);
  };

  const decrease = (e: MouseEvent<HTMLButtonElement>, product: CartItem) => {
    if (!isUser?.user_id || !data?.id) return;
    e.stopPropagation();

    decreaseItem({
      product,
      user_id: isUser?.user_id,
      restaurant_id: data.id,
    });
  };

  const onClick = async (event: MouseEvent<HTMLButtonElement>, productData: ProductData, quantity: number) => {
    if (!isUser?.user_id || !data?.id) {
      event.stopPropagation();
      return setToRegPage(true);
    }
    const product = activeMenuItems.find((item) => item.id === productData.id);

    if (product?.options?.variants.length) {
      event.stopPropagation();
      return handleView(product);
    }

    if (!data.availability_orders) {
      event.stopPropagation();
      return setUnavailable(true);
    }

    updateCartCache(dispatch, isUser.user_id, data.id, productData);

    handleAddToCart({
      event,
      productData,
      quantity,
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
                    <Card
                      product={{
                        id: filteredObj.id,
                        photo: filteredObj.photo,
                        name: filteredObj.name,
                        price: filteredObj.price,
                      }}
                      findItem={findItem}
                      decrease={decrease}
                      addToCart={onClick}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      <MaterialModal open={toRegPage} onClose={() => setToRegPage(false)} minHeight={0}>
        <GuestBox setToRegPage={setToRegPage} />
      </MaterialModal>
      <MaterialModal open={unavailable} onClose={() => setUnavailable(false)} minHeight={0}>
        <GuestBox setToRegPage={setUnavailable} singleBtn title="Заказы в данном заведении недоступны" />
      </MaterialModal>
    </>
  );
};
