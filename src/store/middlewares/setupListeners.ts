import listenerMiddleware from "../user/listenerMiddleware";
import { setupAuthListeners } from "./authMiddleware";
import { setupRegistrationListeners } from "./registrationMiddleware";

export function setupAllListeners() {
  setupRegistrationListeners(listenerMiddleware);
  setupAuthListeners(listenerMiddleware);
}
