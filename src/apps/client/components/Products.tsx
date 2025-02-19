import { FC } from "react";
import Card from "../features/card/Card";
import { ProductsProps } from "../features/products/types";

const Products: FC<ProductsProps> = ({ menuItems, category, sectionRefs, handleView }) => {
  return (
    <>
      {menuItems.length > 0 &&
        category
          .filter((obj) => obj.is_active)
          .map((item, index) => (
            <div
              id={index.toString()}
              className="section"
              key={item.id}
              ref={(ref) => {
                if (ref) sectionRefs.current[index] = ref;
              }}
            >
              <div className="container">
                <h2 className="cat_name pt-4">{item.name}</h2>

                <hr />
                <div className="row">
                  {menuItems
                    .filter((obj) => obj.category === item.id)
                    .map(
                      (filteredObj) =>
                        filteredObj.is_active && (
                          <div
                            onClick={() => handleView(filteredObj)}
                            key={filteredObj.id}
                            className="col-6 col-sm-6 col-md-4 col-lg-3"
                          >
                            <Card
                              id={filteredObj.id}
                              photo={filteredObj.photo}
                              name={filteredObj.name}
                              price={filteredObj.price}
                            />
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Products;
