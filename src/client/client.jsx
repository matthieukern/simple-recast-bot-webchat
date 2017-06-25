// @flow
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../shared/reducers";
import { fromJS } from "immutable";
import App from "../shared/components/App";
import { BrowserRouter } from "react-router-dom";
import "../shared/resources/favicon.png";
import "../shared/style";

const rootElement = document.getElementById("app");
const preloadedState = fromJS(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;
const store = createStore(reducers, preloadedState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
