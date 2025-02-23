import { userRegistration } from "./user/api/userRegistrationApi"; // Импорт API
import listenerMiddleware from "./user/listenerMiddleware";
import { regStepChange, userId, botLinkAction, regError } from "./user/slices/authSlice"; // Импорт экшена для изменения regStep

listenerMiddleware.startListening({
  matcher: userRegistration.endpoints.registration.matchFulfilled, // Слушаем экшен регистрации
  effect: async (action, listenerApi) => {
    console.log("Запрос регистрации отправлен:", action);

    listenerApi.dispatch(userId(action.payload.id));
    listenerApi.dispatch(botLinkAction(action.payload.bot_link));
    listenerApi.dispatch(regStepChange(1));
  },
});

listenerMiddleware.startListening({
  matcher: userRegistration.endpoints.registration.matchRejected,
  effect: async (action, listenerApi) => {
    const errorMessage = action.payload?.data || "Что-то пошло не так";
    listenerApi.dispatch(regError(errorMessage));
  },
});

listenerMiddleware.startListening({
  matcher: userRegistration.endpoints.codeRequest.matchFulfilled, // Слушаем экшен регистрации
  effect: async (action, listenerApi) => {
    console.log("Запрос регистрации отправлен patch:", action);
    listenerApi.dispatch(regStepChange(2));
  },
});

export default listenerMiddleware.middleware;
