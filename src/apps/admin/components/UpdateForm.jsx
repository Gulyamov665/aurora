import React from 'react'
import PromoModal from './PromoModal'

export default function UpdateForm({ show, register, handleSubmit, reset }) {
  return (
    <div>
      <PromoModal
        show={show}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
    </div>
  )
}
