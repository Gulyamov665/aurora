import React, { useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Test() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <div>
        <Header search={search} setSearch={setSearch} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Test
