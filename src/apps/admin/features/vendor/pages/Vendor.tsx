import { FC, useEffect, useState } from "react";
import VendorForm from "../components/VendorForm";
import { useParams } from "react-router-dom";
import { useLoadQuery, useUpdateMutation } from "@store/admin/api/vendorApi";
import { useForm } from "react-hook-form";
import { initialDataType, VendorInfoType } from "@store/user/types";
import { useQrCodeMutation } from "@store/admin/api/qrCode";
import { DownloadQr } from "@/Utils/downloadQr";

const Vendor: FC = () => {
  const { res = "" } = useParams();
  const { data: load } = useLoadQuery(res);
  const [update, { isLoading }] = useUpdateMutation();
  const [qrCode] = useQrCodeMutation();
  const { register, handleSubmit, reset, watch } = useForm<VendorInfoType>();
  const [isChanged, setIsChanged] = useState(false);
  const [initialData, setInitialData] = useState<initialDataType | null>(null);

  useEffect(() => {
    if (load) {
      const { logo, background_photo, ...rest } = load;
      reset(rest);
      setInitialData(rest);
    }
  }, [load, reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (initialData) {
        setIsChanged(JSON.stringify(values) !== JSON.stringify(initialData));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, initialData]);

  const handleUpdate = async (data: VendorInfoType) => {
    await update({ body: data, vendor: res });
  };

  const qrCodeGenerate = async () => {
    try {
      const blob = await qrCode({ quantity: 1 }).unwrap();
      DownloadQr(blob);
    } catch (error) {
      console.error("Ошибка при скачивании QR-кода:", error);
    }
  };

  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    };


  return (
    <div className="container">
      <VendorForm
        register={register}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
        isChanged={isChanged}
        qrCodeGenerate={qrCodeGenerate}
        tab={tab}
        handleTabChange={handleTabChange}

      />
    </div>
  );
};

export default Vendor;
