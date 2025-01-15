import React, { useRef, useState } from 'react'
import { useGetProductsQuery } from '../../../store/user/api/productsApi'
import { useGetCategoriesQuery } from '../../../store/user/api/categoryApi'
import { useGetPromosQuery } from '../../../store/user/api/promoApi'
import { useParams, Link } from 'react-router-dom'
import Card from './Card'
import Loading from './Loading'
import CardView from './CardView'
import Promo from './Promo'
import Navbar from './Navbar'
import Products from './Products'
import CartBtn from './CartBtn'

export default function Category({search}) {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const { data: menuItems = [], isLoading, isError } = useGetProductsQuery(res)
  const { data: promo = [] } = useGetPromosQuery(res)
  const sectionRefs = useRef([])
  const rootSection = useRef([])
  const [isOpen, setIsOpen] = useState(false)
  const [viewItem, setViewItem] = useState(null)
  const [count, setCount] = useState(1)

  const handleView = (item) => {
    setIsOpen(!isOpen)
    setViewItem(item)
    setCount(1)
  }

  const handleViewPromo = (item) => {
    setIsOpen(!isOpen)
    setViewItem(item)
  }

  if (isLoading) return <Loading main={true} />

  if (isError) {
    return <p>Error not found page </p>
  }

  

  return (
    <>
      <Promo promo={promo} handleViewPromo={handleViewPromo} />
      <div className="sticky-top">
        <Navbar
          sectionRefs={sectionRefs}
          category={category}
          rootRef={rootSection}
        />
      </div>
      <div className="round" ref={(ref) => (rootSection.current[0] = ref)}>
        {search ? (
          menuItems
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((searchItem) => (
              <div key={searchItem.id} onClick={() => handleView(searchItem)}>
                <Card
                  photo={searchItem.photo}
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
            isLoading={isLoading}
          />
        )}
      </div>
      <CardView
        item={viewItem}
        open={isOpen}
        setIsOpen={setIsOpen}
        count={count}
        setCount={setCount}
      />
      <Link to={'orders'} style={{ color: 'black' }}>
        <CartBtn />
      </Link>
    </>
  )
}
