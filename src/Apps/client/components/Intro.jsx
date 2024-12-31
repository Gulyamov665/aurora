import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import { useWaiterCallMutation } from '../../../store/user/dispatcherApi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Snowfall from 'react-snowfall'
import snowFlake_img from '../../../assets/snowFlakes.png'

export default function Intro({ data }) {
  const { table } = useParams()
  const [callWaiter, { isLoading }] = useWaiterCallMutation()

  const handleCallWaiter = async () => {
    if (data.waiter_chat_id) {
      await callWaiter({ table, chat_id: data.waiter_chat_id })
      toast.success('Запрос отправлен')
      return
    }
    console.log('вызов официанта не доступен в этом заведении')
  }
  return (
    <div className="">
      <div className="section">
        <div className="snowFall">
          <Snowfall color="white" snowflakeCount={100} />
        </div>
        <img src={data.photo} loading="lazy" className="img" alt="img" />
        <div className="op" />
        <div className="img_log">
          <img src={data.logo} className="img_logo" alt="logo" />
        </div>
      </div>
      <div className="container container-sm mt-4 ">
        <div className="name_container">
          <h1 className="texts">{data.name}</h1>
          <p className="texts">{data.adress}</p>

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
          {isLoading ? (
            <button className="btn btn-warning mt-3">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className="btn btn-warning mt-3" onClick={handleCallWaiter}>
              {' '}
              Вызвать официанта
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
