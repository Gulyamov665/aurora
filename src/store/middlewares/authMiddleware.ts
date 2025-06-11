import { userAuth } from "@store/user/api/userAuthApi";
import { regError, setUser } from "@store/user/slices/authSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";

interface CustomJwtPayload extends JwtPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_user: boolean;
  is_vendor: boolean;
  vendor: string | null;
}

export function setupAuthListeners(listenerMiddleware: ListenerMiddlewareInstance) {
  listenerMiddleware.startListening({
    matcher: userAuth.endpoints.auth.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { access_token } = action.payload;
      localStorage.setItem("token", access_token);
      const user = jwtDecode<CustomJwtPayload>(access_token);
      listenerApi.dispatch(setUser(user));
    },
  });

  listenerMiddleware.startListening({
    matcher: userAuth.endpoints.auth.matchPending,
    effect: async (_, listener) => {
      listener.dispatch(regError({ message: "", code: 0 }));
    },
  });

  listenerMiddleware.startListening({
    matcher: userAuth.endpoints.auth.matchRejected,
    effect: async (action, listenerApi) => {
      const errorPayload = action.payload as { data?: { message?: string } };
      const errorMessage = errorPayload.data?.message || "Что-то пошло не так";
      listenerApi.dispatch(regError({ message: errorMessage, code: 400 }));
    },
  });
}
