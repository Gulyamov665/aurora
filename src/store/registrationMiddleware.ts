import { userRegistration } from "./user/api/userRegistrationApi"; // Импорт API
import listenerMiddleware from "./user/listenerMiddleware";
import { regStepChange, userId } from "./user/slices/authSlice"; // Импорт экшена для изменения regStep

listenerMiddleware.startListening({
  matcher: userRegistration.endpoints.registration.matchFulfilled, // Слушаем экшен регистрации
  effect: async (action, listenerApi) => {
    console.log("Запрос регистрации отправлен:", action);

    listenerApi.dispatch(userId(action.payload.id));
    listenerApi.dispatch(regStepChange(1));
    console.log("change step");
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
