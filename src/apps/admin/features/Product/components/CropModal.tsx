import { FC } from "react";
import { CropModalMaterial } from "../ui/Modal.tsx";
import { CropJs } from "./CropJs.tsx";

interface CropProps {
  img: string | ArrayBuffer | null;
  setCropData: (data: Cropper.Data | null) => void;
  uploadImage: () => Promise<void>;
  setImg: (img: string | ArrayBuffer | null) => void;
  cropData: Cropper.Data | null;
}

const CropModal: FC<CropProps> = ({ img, setCropData, setImg, cropData, uploadImage }) => {
  return (
    <CropModalMaterial
      title={"изображение"}
      trigger={img}
      setImg={setImg}
      cropData={cropData}
      fetch={() => uploadImage()}
    >
      <CropJs src={img} setCropData={setCropData} />
    </CropModalMaterial>
  );
};

export default CropModal;
