import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/boutons.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { roomAdapterApi } from "./Cricket/adapters/roomAdapter.api";
import { initSentry } from "./sentry/initSentry";

initSentry();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App roomAdapter={roomAdapterApi} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
