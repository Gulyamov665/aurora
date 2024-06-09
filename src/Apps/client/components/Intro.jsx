import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'

export default function Intro({ data }) {
  return (
    <div>
      <div className="section">
        <img src={data.photo} loading="lazy" className="img" alt="img" />
        <div className="op" />
        <div className="img_log">
          <img src={data.logo} className="img_logo" alt="logo" />
        </div>
      </div>
      <div className="container container-sm mt-4 ">
        <div className="name_container">
          <h1 className="texts">{data.name}</h1>
          <p className="texts">{data.location}</p>

          <div>
            {data.instagramm && (
              <a
                href={data.instagramm}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <InstagramIcon style={{ marginRight: 5 }} />
              </a>
            )}
            {data.telegram && (
              <a
                style={{ textDecoration: 'none', color: 'black' }}
                href={data.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon style={{ marginRight: 5 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
