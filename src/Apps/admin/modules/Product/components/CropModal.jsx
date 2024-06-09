import React from 'react'
import { StaticModal } from '../ui/Modal'
import { CropJs } from './CropJs'

function CropModal({ img, setCropData, setImg, cropData }) {
  return (
    <div>
      <StaticModal
        title={'Изображение'}
        trigger={img}
        setImg={setImg}
        cropData={cropData}
      >
        <CropJs src={img} setCropData={setCropData} />
      </StaticModal>
    </div>
  )
}

export default CropModal
