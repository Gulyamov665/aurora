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
      history('/test/bon')
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
    <div
      style={{
        width: '400px',
        height: '400px',
        margin: '100px auto',
      }}
    >
      <form onSubmit={submitFunc}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Login</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter login"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
// with_employee=true
// params запросы
