import React from 'react'

function VendorForm({ register, handleSubmit, handleUpdate }) {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div>
        <label htmlFor="">название</label>
        <input
          className="form-control"
          type="text"
          {...register('name')}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">адрес</label>
        <input className="form-control" type="text" {...register('adress')} />
      </div>
      <div>
        <label htmlFor="">ссылка Телеграм</label>
        <input className="form-control" type="text" {...register('telegram')} />
      </div>
      <div>
        <label htmlFor="">ссылка Инстаграм</label>
        <input
          className="form-control"
          type="text"
          {...register('instagramm')}
        />
      </div>
      <button className="btn btn-success mt-3">сохранить</button>
    </form>
  )
}

export default VendorForm
