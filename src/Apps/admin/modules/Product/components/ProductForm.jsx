import React from 'react'

function ProductForm({ register, handleSubmit, product, handleFileChange }) {
  return (
    <>
      <form onSubmit={handleSubmit(product)}>
        <div>
          <label htmlFor="">название</label>
          <input
            type="text"
            className="form-control"
            {...register('name')}
            required
          />
        </div>
        <div>
          <label htmlFor="">описание</label>
          <textarea
            name=""
            id=""
            className="form-control"
            {...register('description')}
          ></textarea>
        </div>
        <div>
          <label htmlFor="">цена</label>
          <input
            type="number"
            className="form-control"
            {...register('price')}
            required
          />
        </div>
        <div>
          <label htmlFor="">выберите изображение</label>
          <input
            type="file"
            className="form-control"
            {...register('photo')}
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-primary mt-5">добавить</button>
      </form>
    </>
  )
}

export { ProductForm }
