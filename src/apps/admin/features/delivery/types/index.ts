import { AddDeliveryRuleMutationType, DeleteDeliveryRuleMutationType, UpdateDeliveryRuleMutationType, useToggleActiveDeliveryRuleMutationType } from "@store/admin/api/delivery";
import { DeliveryRuleType, VendorInfoType } from "@store/user/types";



export interface DeliveryRulesMainProps {
    rules?: DeliveryRuleType[]
    addDeliveryRule: AddDeliveryRuleMutationType[0]
    updateDeliveryRule: UpdateDeliveryRuleMutationType[0]
    vendorData: VendorInfoType
    deleteDeliveryRule: DeleteDeliveryRuleMutationType[0]
    toggleActiveDeliveryRule: useToggleActiveDeliveryRuleMutationType[0]
}

export interface DeliveryRulesListProps {
    rules: DeliveryRuleType[]
    onEyeClick: (id: number) => Promise<void>
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
    deleteItem: ({ message, type, id }: { message: string, type: string, id: number }) => void
    toggleActiveDeliveryRule: useToggleActiveDeliveryRuleMutationType[0]
}

export type IToggleActive = (
  id: number,
  is_active: boolean,
  color: 'success' | 'error' | 'info' | 'warning', // если у тебя фиксированные цвета
  message: string
) => Promise<void>;

export type DeliveryRuleFormValues = {
  restaurant: number;
  name: string;
  description: string;
  calculation_type: string;
  min_distance: number;
  max_distance: number;
  price_per_km: number | null;
  fixed_price: number | null;
  price_per_percent: number | null;
  max_order_price_for_free_delivery: number | null;
  is_active: boolean;
};

export type DeliveryRulesAddProps = {
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
  addDeliveryRule: AddDeliveryRuleMutationType[0]
  vendorData: VendorInfoType

};

export interface DeliveryRulesEditProps {
  onSubmit: (data: DeliveryRuleFormValues) => void;
}