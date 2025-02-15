// import { createListenerMiddleware } from "@reduxjs/toolkit";
// import { someAction } from "./someSlice";
// import { someApi } from "./admin/someApi";

// const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: someAction,
//   effect: async (action, listenerApi) => {
//     console.log("someAction вызван:", action);

//     const response = await listenerApi.dispatch(someApi.endpoints.getData.initiate());

//     if (response.data) {
//       console.log("Полученные данные:", response.data);
//     }
//   },
// });

// export default listenerMiddleware.middleware;
