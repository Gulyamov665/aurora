import React, { useState } from 'react'
import Intro from '../components/Intro'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Category from '../components/Category'
import { useLoadQuery } from '../../../store/admin/vendorApi'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

function Test() {
  const { res } = useParams()
  const { data: vendor = [], isLoading } = useLoadQuery(res)
  const [search, setSearch] = useState('')

  return (
    <div>
      <div>
        <Header search={search} setSearch={setSearch} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Intro data={vendor} />
          <Category search={search} />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Test
