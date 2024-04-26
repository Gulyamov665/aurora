import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import header from '../static/Header.module.scss'

const Header = ({ search, setSearch }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [vendor, setVendor] = useState(null)

  useEffect(() => {
    if (authTokens) {
      setVendor(jwtDecode(authTokens.access).vendor)
    } else {
      setVendor('')
    }
  }, [authTokens])

  return (
    <header className={`${header.header_backgroud} py-3 rounded-bottom mb-3 border-bottom header_backgroud`}>
      <div
        className="container-fluid d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        {!vendor ? (
          <img
            src="/img/transparent_logo.png"
            style={{ width: 150 }}
            alt="logo"
          />
        ) : (
          <div>
            <Link to={`/admin/${vendor}/menu`}>
              <button className={header.btn_edit}>Редактировать</button>
            </Link>
          </div>
        )}

        <div className="d-flex align-items-end justify-content-end">




        <div className={header.search_box }>
            <button className={header.btn_search}> <span className={header.span}>Sea</span>rch</button>
            <input type="text" className={header.input_search} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        
        </div>
      </div>
    </header>
  )
}

export default Header
