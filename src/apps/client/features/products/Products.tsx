import { FC, useMemo, useCallback } from "react";
import Card from "../card/Card";
import { ProductsProps } from "./types";

const Products: FC<ProductsProps> = ({ menuItems, category, sectionRefs, handleView }) => {
  const activeCategories = useMemo(() => category.filter(({ is_active }) => is_active), [category]);
  const activeMenuItems = useMemo(() => menuItems.filter(({ is_active }) => is_active), [menuItems]);

  const setSectionRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      if (ref) sectionRefs.current[index] = ref;
    },
    [sectionRefs]
  );

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
                    className="col-6 col-sm-6 col-md-4 col-lg-3"
                  >
                    <Card {...filteredObj} />
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
