import React from 'react'

function PromoForm({ register, handleSubmit, handle, handleFile }) {
  return (
    <form onSubmit={handleSubmit(handle)}>
      <div>
        <label htmlFor="">название</label>
        <input className="form-control" type="text" {...register('name')} />
      </div>

      <div>
        <label htmlFor="">информация</label>
        <textarea className="form-control" type="text" {...register('info')} />
      </div>

      <div>
        <label htmlFor="">цена</label>
        <input className="form-control" type="number" {...register('price')} />
      </div>

      <div>
        <label htmlFor="">изображение</label>
        <input
          className="form-control"
          type="file"
          {...register('photo')}
          onChange={handleFile}
        />
      </div>
      <button className="btn btn-primary mt-3">добавить</button>
    </form>
  )
}

export default PromoForm