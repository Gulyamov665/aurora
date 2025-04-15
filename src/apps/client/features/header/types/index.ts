import { UserInfoType } from "@store/user/types";

export type IsUser = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_user: boolean;
  is_vendor: boolean;
  vendor: string | null;
};

export type UserAvatarProps = {
  isUser: Partial<IsUser> | null;
  user: UserInfoType;
  logout: () => void;
};
