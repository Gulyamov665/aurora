import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useGetTokenMutation } from '../../../store/tokenApi'
import { toast } from 'react-toastify'
import logo from '../../../assets/transparent_logo.png'

//todo reactHook form

export default function Login() {
  const [getToken, { data, isSuccess, isError, isLoading }] =
    useGetTokenMutation()
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

  const history = useNavigate()

  const submitFunc = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    await getToken({
      username: username,
      password: password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      const dataDecode = jwtDecode(data.access)
      localStorage.setItem('authTokens', JSON.stringify(data))
      setAuthTokens(data)
      setUser(dataDecode)
      history(`/admin/${dataDecode.vendor}`)
      toast.success(
        `Добро пожаловать ${dataDecode.first_name} ${dataDecode.last_name}`
      )
    }
  }, [isSuccess, isError, authTokens])

  return (
    <div className="background d-flex align-items-center">
      <div className="container text-center">
        <form onSubmit={submitFunc}>
          <img className="mb-4 login_logo" src={logo} alt="logo" />
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
            <label htmlFor="floatingInput">Логин</label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              id="floatingPassword"
              type="password"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>
          {isError && (
            <p style={{ color: 'red' }}>Логин или пароль не верный</p>
          )}
          <br />
          {isLoading ? (
            <button className="btn btn-info w-100 py-2" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className="btn btn-info w-100 py-2" type="submit">
              <span role="status">Войти</span>
            </button>
          )}

          <p className="mt-5 mb-3 text-light footer">
            © 2024 Powered by{' '}
            <a className="footer_powered" href="https://t.me/mgulyamov">
              Gulyamov
            </a>{' '}
            and{' '}
            <a className="footer_powered" href="https://t.me/Bomuratov">
              Bomuratov
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
