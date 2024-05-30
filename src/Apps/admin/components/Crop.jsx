import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import ReactCrop from 'react-image-crop'

function CropDemo({ src }) {
  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src}  />
    </ReactCrop>
  )
}

export default CropDemo
