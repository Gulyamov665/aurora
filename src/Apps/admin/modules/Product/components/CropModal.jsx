import React from 'react'
import { StaticModal } from '../ui/Modal'
import { CropJs } from './CropJs'

function CropModal({ img, setCropData, setImg }) {
  return (
    <div>
      <StaticModal title={'Изображение'} trigger={img}>
        <CropJs src={img} setCropData={setCropData} />
      </StaticModal>
    </div>
  )
}

export default CropModal
