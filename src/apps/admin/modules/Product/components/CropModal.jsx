import React from 'react'
import { StaticModal } from '../ui/Modal'
import { CropJs } from './CropJs'

function CropModal({
  img,
  setCropData,
  setImg,
  cropData,
  show,
  setShow,
  cleanImgState,
}) {
  return (
    <div>
      <StaticModal
        title={'изображение'}
        trigger={img}
        setImg={setImg}
        cropData={cropData}
        show={show}
        setShow={setShow}
        cleanImgState={cleanImgState}
      >
        <CropJs src={img} setCropData={setCropData} />
      </StaticModal>
    </div>
  )
}

export default CropModal
