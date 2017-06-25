// @flow
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../shared/reducers";
import App from "../shared/components/App";
import { BrowserRouter } from "react-router-dom";
import "../shared/resources/favicon.png";
import "../shared/style";

const rootElement = document.getElementById("app");
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(reducers, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
