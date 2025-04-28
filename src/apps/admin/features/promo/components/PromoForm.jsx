import React from 'react'

function PromoForm({ register, handleSubmit, handle, handleFile, button }) {
  return (
    <form onSubmit={handleSubmit(handle)}>
      <div>
        <label htmlFor="">название</label>
        <input className="form-control" type="text" {...register('name')} />
      </div>

      <div>
        <label htmlFor="">информация</label>
        <textarea
          className="form-control"
          type="text"
          {...register('description')}
        />
      </div>

      <div>
        <label htmlFor="">цена</label>
        <input
          className="form-control"
          type="number"
          {...register('price')}
          required
        />
      </div>

      <div>
        <label htmlFor="">изображение</label>
        <input
          className="form-control"
          accept="image/png, image/jpg"
          type="file"
          {...register('photo')}
          onChange={handleFile}
        />
      </div>
      <button className="btn btn-primary mt-3">{button}</button>
    </form>
  )
}

export default PromoForm
