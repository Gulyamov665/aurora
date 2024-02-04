import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

//todo reactHook form

const BaseUrl = process.env.REACT_APP_BASE_URL

export default function Sass() {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(localStorage.getItem('authTokens'))
      : null
  )

  let [loading, setLoading] = useState(true)

  const history = useNavigate()

  const submitFunc = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    let response = await fetch(BaseUrl + 'token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      history('/admin/bon')
    } else {
      alert('Something went wrong!')
    }
  }

  let updateToken = async () => {
    let response = await fetch(BaseUrl + 'refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      // logoutUser()
      console.log('user is logout')
    }

    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
  }, [authTokens, loading])

  return (
    <div className="background d-flex align-items-center">
    <div className="container text-center"> 
      <form onSubmit={submitFunc}>
          <img className="mb-4 login_logo" src="img/transparent_logo.png" alt=""/>
          <h1 className="h4 mb-3 fw-normal login_text">Вход в сервис</h1>

          <div className="form-floating mb-1">
              <input
              type="text"
              name="username"
              className="form-control"
              id="floatingInput"
              aria-describedby="loginHelp"
              placeholder="login"
              />
              <label for="floatingInput">Логин</label>
          </div>
          <div className="form-floating">
              <input 
              className="form-control"
              id="floatingPassword"
              type="password"
              name="password"
              placeholder="Password"/>
              <label for="floatingPassword">Пароль</label>
          </div>
          <br/>
          <button className="btn btn-info w-100 py-2" type="submit">Войти</button>
          <p className="mt-5 mb-3 text-light footer">© 2024 Powered by <a className='footer_powered' href='https://t.me/mgulyamov'>Gulyamov</a> and <a className='footer_powered' href='https://t.me/Bomuratov'>Bomuratov</a>
          </p>
      </form>
    </div>
  </div>
  )
}
