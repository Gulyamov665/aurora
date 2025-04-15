import { UserInfoType, VendorInfoType } from "@store/user/types";

export interface OutletContextType {
  data: VendorInfoType;
  me: UserInfoType;
  isLoading?: boolean;
  res?: string;
}
