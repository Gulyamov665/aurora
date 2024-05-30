import React from 'react'

export default function Intro(props) {
  return (
    <div>
      <div className="section">
        <img src={props.img} className="img" alt="img" />
        <div className="op" />
        <div className="img_log">
          <img src={props.logo} className="img_logo" alt="logo" />
        </div>
      </div>
      <div className="container container-sm mt-4 ">
        <div className="name_container">
          <h1 className="texts">{props.name}</h1>
          <p className="texts">{props.location}</p>
        </div>
      </div>
    </div>
  )
}
