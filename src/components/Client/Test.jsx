import React, { useState } from 'react'
import Intro from './Intro'
import useAxios from '../../hooks/useAxios'
import Header from './Header'
import Footer from './Footer'
import Category from './Category'

function Test() {
  const { restData: pos } = useAxios('restaurant')
  const [search, setSearch] = useState('')

  return (
    <div>
      <div>
        <Header search={search} setSearch={setSearch} />
      </div>
      <div>
        {Object.keys(pos).length > 0 && (
          <Intro
            name={pos.name}
            location={pos.adress}
            img={pos.photo}
            logo={pos.logo}
          />
        )}
        <Category search={search} />
      </div>
      <Footer />
    </div>
  )
}

export default Test
