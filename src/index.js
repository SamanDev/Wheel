import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./auth.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="510611130752-hg24vg8c3bp9rb4rb81n4aols7esa79r.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
