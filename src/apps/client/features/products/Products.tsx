import { FC, useMemo, useCallback, MouseEvent } from "react";
import Card from "../card/Card";
import { ProductData, ProductsProps } from "./types";
import { useAddToCartMutation } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../pages";
import { handleAddToCart } from "@/Utils/tools";

const Products: FC<ProductsProps> = ({ menuItems, category, sectionRefs, handleView }) => {
  const [addToCart] = useAddToCartMutation();
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);

  const activeCategories = useMemo(() => category.filter(({ is_active }) => is_active), [category]);
  const activeMenuItems = useMemo(() => menuItems.filter(({ is_active }) => is_active), [menuItems]);

  const setSectionRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      if (ref) sectionRefs.current[index] = ref;
    },
    [sectionRefs]
  );

  const onClick = async (event: MouseEvent<HTMLButtonElement>, productData: ProductData) => {
    if (!isUser?.user_id || !data?.id) return;
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
                    <Card {...filteredObj} addToCart={onClick} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Products;
