import React, { useEffect, useRef, useCallback } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../store/productsApi'
import { useParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '../store/categoryApi'
import Loading from './Loading'
import Scrollspy from 'react-scrollspy'

export default function Category() {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const { data: menuItems = [], isLoading, isError } = useGetProductsQuery(res)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error not found page </p>
  }

  return (
    <nav>
      <div className="container sticky-top">
        <div className="custom-navbar">
          <ul>
            <Scrollspy
              items={category.map((item) => item.name)}
              currentClassName="active"
            >
              {category.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.name}`}>{item.name}</a>
                </li>
              ))}
            </Scrollspy>
          </ul>
        </div>
      </div>
      {menuItems.length > 0 &&
        category.map((item) => (
          <div id={item.name} className="section" key={item.id}>
            <div className="container">
              <h2 className="">{item.name}</h2>
              <div className="row">
                {menuItems
                  .filter((obj) => obj.category === item.id)
                  .map(
                    (filteredObj) =>
                      filteredObj.is_active && (
                        <div
                          key={filteredObj.id}
                          className="col-6 col-sm-6 col-md-4 col-lg-3"
                        >
                          <Card
                            img={filteredObj.photo}
                            name={filteredObj.name}
                            desc={filteredObj.description}
                            price={filteredObj.price}
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        ))}
    </nav>
  )
}
