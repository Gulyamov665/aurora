import React from 'react'

const Header = () => {
  return (
    <header className="py-3 rounded-bottom mb-3 border-bottom header_backgroud">
      <div
        className="container-fluid d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        <img src="/img/transparent_logo.png" style={{ width: 150 }} alt />
        <div className="d-flex align-items-end justify-content-end">
          <form className="" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          {/* <button className="btn btn-light">Search</button> */}
        </div>
      </div>
    </header>
  )
}

export default Header
