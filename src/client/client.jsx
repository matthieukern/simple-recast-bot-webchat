// @flow
import React from "react";
import ReactDOM from "react-dom";
import App from "../shared/components/App";
import { BrowserRouter } from "react-router-dom";
import "../shared/resources/favicon.png";
import "../shared/style";

const rootElement = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
