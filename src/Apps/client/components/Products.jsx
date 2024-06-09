import React from 'react'
import Card from './Card'
import Skeleton from './ContentLoader'

export default function Products({
  menuItems,
  category,
  sectionRefs,
  handleView,
  isLoading,
}) {
  return (
    <>
      {menuItems.length > 0 &&
        category
          .filter((obj) => obj.is_active)
          .map((item, index) => (
            <div
              id={index}
              className="section"
              key={item.id}
              ref={(ref) => (sectionRefs.current[index] = ref)}
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
                            {!isLoading ? (
                              <Card
                                img={filteredObj.photo}
                                name={filteredObj.name}
                                desc={filteredObj.description}
                                price={filteredObj.price}
                              />
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          ))}
    </>
  )
}
