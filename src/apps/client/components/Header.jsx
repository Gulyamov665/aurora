import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import header from '../static/Header.module.scss'
import logo from '../../../assets/transparent_logo.png'
import newYearLogo from '../../../assets/transparent_logo_new_year.png'
import { useDispatch, useSelector } from 'react-redux'
import { productSearch } from '../../../store/appSlice'
import LocationDropdown from './LocationDropdown'

const Header = () => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [vendor, setVendor] = useState(null)
  const { search } = useSelector((state) => state.modals)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authTokens) {
      setVendor(jwtDecode(authTokens.access).vendor)
    } else {
      setVendor('')
    }
  }, [authTokens])

  const items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item2' },
    { id: 4, name: 'item2' },
  ]

  return (
    <header
      className={`${header.header_backgroud} py-2 mb-2 header_backgroud`}
    >
      <div
        className="container d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        {!vendor ? (
          <div>
            <img src={newYearLogo} style={{ width: 32 }} alt="logo" />
          </div>
        ) : (
          <div>
            <Link to={`/admin/${vendor}/menu`}>
              <button className={header.btn_edit}>Редактировать</button>
            </Link>
          </div>
        )}
        <LocationDropdown items={items} />

        {/* <div className="d-flex align-items-center justify-content-end">
          <div className={header.search_box}>
            <button className={header.btn_search}>
              {' '}
              <span className={header.span}>Search</span>
            </button>
            <input
              type="text"
              className={header.input_search}
              placeholder="Search..."
              value={search}
              onChange={(e) => dispatch(productSearch(e.target.value))}
            />
          </div>
        </div> */}
      </div>
    </header>
  )
}

export default Header
