import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { userRegistration } from "../user/api/userRegistrationApi";
import { regStepChange, userId, botLinkAction, regError } from "../user/slices/authSlice";

export function setupRegistrationListeners(listenerMiddleware: ListenerMiddlewareInstance) {
  listenerMiddleware.startListening({
    matcher: userRegistration.endpoints.registration.matchFulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.dispatch(userId(action.payload.id));
      listenerApi.dispatch(botLinkAction(action.payload.bot_link));
      listenerApi.dispatch(regStepChange(1));
    },
  });

  listenerMiddleware.startListening({
    matcher: userRegistration.endpoints.registration.matchRejected,
    effect: async (action, listenerApi) => {
      const errorPayload = action.payload as { data?: { message?: string } };
      const errorMessage = errorPayload.data?.message || "Что-то пошло не так";
      listenerApi.dispatch(regError({ message: errorMessage, code: 400 }));
    },
  });

  listenerMiddleware.startListening({
    matcher: userRegistration.endpoints.codeRequest.matchFulfilled,
    effect: async (_, listenerApi) => {
      listenerApi.dispatch(regStepChange(2));
    },
  });
}
