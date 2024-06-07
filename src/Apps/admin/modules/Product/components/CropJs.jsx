import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const CropJs = ({ src, setCropData }) => {
  const cropperRef = useRef(null)

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    const cData = cropper.getData(true)
    setCropData(cData)
  }

  return (
    <Cropper
      src={src}
      style={{ width: '100%' }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      aspectRatio={16 / 9}
      guides={true}
      viewMode={0}
      crop={onCrop}
      ref={cropperRef}
      rotatable={true}
      // modal={true}
    />
  )
}

export { CropJs }
