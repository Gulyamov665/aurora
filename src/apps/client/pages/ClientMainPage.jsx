import React, { useState } from 'react'
import { useLoadQuery } from '../../../store/admin/vendorApi'
import { useParams } from 'react-router-dom'
import Intro from '../components/Intro'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'

function ClientMainPage() {
  const { res } = useParams()
  const { data: vendor = [], isLoading } = useLoadQuery(res)
  const { search } = useSelector((state) => state.modals)

  if (isLoading) return <Loading />

  return (
    <div>
      <Intro data={vendor} />
      <Category search={search} />
      <Footer />
    </div>
  )
}

export default ClientMainPage
