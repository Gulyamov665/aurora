import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-image-crop/dist/ReactCrop.css";
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
