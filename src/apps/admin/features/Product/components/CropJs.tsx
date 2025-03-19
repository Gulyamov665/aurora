import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropJs = ({ src, setCropData }: { src: any; setCropData: (data: Cropper.Data) => void }) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    if (!cropperRef.current) return;
    const cropper = cropperRef.current.cropper;
    const cData = cropper.getData(true);
    setCropData(cData);
  };

  return (
    <Cropper
      src={src}
      style={{ width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      aspectRatio={16 / 9}
      guides={true}
      viewMode={1}
      cropend={onCrop}
      ref={cropperRef}
      rotatable={true}
      modal={true}
    />
  );
};

export { CropJs };
