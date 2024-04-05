import React, { useRef, useState } from 'react'
import { useGetProductsQuery } from '../../store/user/productsApi'
import { useGetCategoriesQuery } from '../../store/user/categoryApi'
import { useGetPromosQuery } from '../../store/user/promoApi'
import { useParams } from 'react-router-dom'
import Card from './Card'
import Loading from './Loading'
import CardView from './CardView'
import Promo from './Promo'
import Navbar from './Navbar'
import Products from './Products'
import Story from './Story'

export default function Category({ search }) {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const {
    data: menuItems = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery(res)
  const { data: promo = [] } = useGetPromosQuery(res)
  const sectionRefs = useRef([])
  const [isOpen, setIsOpen] = useState(false)
  const [viewItem, setViewItem] = useState(null)
  const [showStory, setShowStory] = useState(false)

  const handleView = (item) => {
    setIsOpen(!isOpen)
    setViewItem(item)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error not found page </p>
  }

  return (
    <>
      {showStory && <Story setShowStory={setShowStory} showStory={showStory} />}

      <Promo promo={promo} setShowStory={setShowStory} />
      <div className="container sticky-top">
        <Navbar
          isSuccess={isSuccess}
          sectionRefs={sectionRefs}
          category={category}
        />
      </div>
      <div className="round">
        {search ? (
          menuItems
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((searchItem) => (
              <div key={searchItem.id} onClick={() => handleView(searchItem)}>
                <Card
                  img={searchItem.photo}
                  name={searchItem.name}
                  desc={searchItem.description}
                  price={searchItem.price}
                />
              </div>
            ))
        ) : (
          <Products
            menuItems={menuItems}
            category={category}
            sectionRefs={sectionRefs}
            handleView={handleView}
          />
        )}
      </div>
      <CardView item={viewItem} open={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
