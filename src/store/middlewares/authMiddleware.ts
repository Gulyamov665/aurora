import { userAuth } from "@store/user/api/userAuthApi";
import { regError, setUser } from "@store/user/slices/authSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import listenerMiddleware from "@store/user/listenerMiddleware";

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

listenerMiddleware.startListening({
  matcher: userAuth.endpoints.auth.matchFulfilled,
  effect: async (action, listenerApi) => {
    const { access, refresh } = action.payload;
    localStorage.setItem("token", access);
    localStorage.setItem("refresh", refresh);
    const user = jwtDecode<CustomJwtPayload>(access);
    listenerApi.dispatch(setUser(user));
    // const meResponse = await listenerApi.dispatch(userAuth.endpoints.me.initiate(user.user_id));
    // if (meResponse?.data) {
    //   listenerApi.dispatch(setUser(meResponse));
    // }
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

export const authMiddleware = listenerMiddleware.middleware;
