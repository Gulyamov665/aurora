import React, { useState } from 'react'
import useAxios from '../hooks/useAxios'

export default function Menu() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')
  const [catChoose, setCatChoose] = useState()
  const [restaurant, setRestaurant] = useState()
  const { data: category, createMenu } = useAxios(`category_get`)

  const handleCategoryChange = (e) => {
    setCatChoose(e.target.value)

    const selectedCategory = category.find(
      (item) => item.id === Number(e.target.value)
    )

    if (selectedCategory) {
      setRestaurant(selectedCategory.restaurant)
    }
  }

  let formData = new FormData()
  formData.append('name', name)
  formData.append('description', desc)
  formData.append('price', price)
  formData.append('photo', img)
  formData.append('category', Number(catChoose))
  formData.append('restaurant', Number(restaurant))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createMenu('menu/', formData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: 20 }}>
        <label htmlFor="name">Position</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
        />
        <label htmlFor="img">Image</label>
        <input
          type="file"
          id="img"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <select
          name="category"
          value={catChoose}
          onChange={handleCategoryChange}
        >
          <option>Choose Category</option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Menu</button>
      </div>
    </form>
  )
}
