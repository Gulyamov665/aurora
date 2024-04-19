import React, { useRef, useState } from 'react'
import Intro from '../components/Intro'
import useAxios from '../../../hooks/useAxios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Category from '../components/Category'

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
