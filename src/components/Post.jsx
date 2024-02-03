import React, { useState } from 'react'
import { instance } from '../Utils/request.js'

export default function Post() {
  const [name, setName] = useState('')
  const [adress, setAdress] = useState('')

  const Create = async () => {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('adress', adress)

    await instance
      .post('category/', formData)
      .then((response) => console.log(response.data))
  }

  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="adress">Adress</label>
      <input
        type="text"
        id="adress"
        name="adress"
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
      />
      <button onClick={Create}>отправить</button>
    </>
  )
}
