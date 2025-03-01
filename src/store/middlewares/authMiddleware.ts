import { userAuth } from "@store/user/api/userAuthApi";
import listenerMiddleware from "@store/user/listenerMiddleware";
import { regError, setUser } from "@store/user/slices/authSlice";

listenerMiddleware.startListening({
  matcher: userAuth.endpoints.auth.matchFulfilled,
  effect: async (action, listenerApi) => {
    const { access, refresh } = action.payload;
    localStorage.setItem("token", access);
    localStorage.setItem("refresh", refresh);

    listenerApi.dispatch(setUser(true));
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

listenerMiddleware.startListening({
  matcher: userAuth.endpoints.auth.matchPending,
  effect: async (_, listener) => {
    listener.dispatch(regError({ message: "", code: 0 }));
  },
});

export const authMiddleware = listenerMiddleware.middleware;
