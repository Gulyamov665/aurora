import React from 'react'
import { useLoadQuery } from '../../../store/admin/vendorApi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Intro from '../components/Intro'
import Category from '../modules/category/Category'
import Loading from '../components/Loading'

function ClientMainPage() {
  const { res } = useParams()
  const { data: vendor = [], isLoading } = useLoadQuery(res)
  const { search } = useSelector((state) => state.modals)

  if (isLoading) return <Loading />

  return (
    <>
      <Intro data={vendor} />
      <Category search={search} />
    </>
  )
}

export default ClientMainPage
