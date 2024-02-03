import React from 'react'

export default function Navbar() {
  return (
    <div
      classname="navbar-test sticky-top"
      data-spy="scroll"
      data-target=".navbar"
      data-offset={50}
    >
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">
              WebSiteName
            </a>
          </div>
          <div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#section1">Section 1</a>
                </li>
                <li>
                  <a href="#section2">Section 2</a>
                </li>
                <li>
                  <a href="#section3">Section 3</a>
                </li>
                <li className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    Section 4 <span className="caret" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#section41">Section 4-1</a>
                    </li>
                    <li>
                      <a href="#section42">Section 4-2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div id="section1" className="container-fluid">
        <h1>Section 1</h1>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
      </div>
      <div id="section2" className="container-fluid">
        <h1>Section 2</h1>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
      </div>
      <div id="section3" className="container-fluid">
        <h1>Section 3</h1>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
      </div>
      <div id="section41" className="container-fluid">
        <h1>Section 4 Submenu 1</h1>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
      </div>
      <div id="section42" className="container-fluid">
        <h1>Section 4 Submenu 2</h1>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
        <p>
          Try to scroll this section and look at the navigation bar while
          scrolling! Try to scroll this section and look at the navigation bar
          while scrolling!
        </p>
      </div>
    </div>
  )
}
