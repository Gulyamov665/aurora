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
      <div>
        <label htmlFor="">Чат id заказов</label>
        <input
          className="form-control"
          type="text"
          {...register('orders_chat_id')}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">Чат id вызов официанта</label>
        <input
          className="form-control"
          type="text"
          {...register('waiter_chat_id')}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">Доступ к заказам</label>
        <input
          className="form-control"
          type="text"
          {...register('availability_orders')}
          disabled
        />
      </div>
      <button className="btn btn-success mt-3">сохранить</button>
    </form>
  )
}

export default VendorForm
