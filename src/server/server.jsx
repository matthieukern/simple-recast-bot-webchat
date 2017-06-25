// @flow
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import serializeJs from "serialize-javascript";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../shared/reducers";
import { Map } from "immutable";
import config from "../shared/config";
import App from "../shared/components/App";
import { ServerStyleSheet } from "styled-components";
import "../shared/resources/favicon.png";
import "../shared/style";

const publicConfig = Object.assign({}, config);
delete publicConfig.private;

/**
 * Render the HTML that will be send back to the client to display the page with
 * the app side rendered components.
 *
 * @param {string} componentHTML The current screen rendered by the app.
 * @param {string} styles The styled-components processed styles.
 * @returns {string} The generated HTML.
 */
function renderHTML(
  componentHTML: string,
  styles: string,
  preloadedState: object
) {
  return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<title>${config.projectName}</title>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i&amp;subset=latin-ext" />
				<link rel="stylesheet" href="/styles.css" />
        ${styles}
				<link rel="icon" type="image/png" href="/img/favicon.png" />
			</head>
			<body>
				<div id="app">${componentHTML}</div>
				<script>
					window.__CONFIG__ = ${serializeJs(publicConfig, { isJSON: true })};
					window.__PRELOADED_STATE__ = ${serializeJs(preloadedState, {
    isJSON: true
  })};
				</script>
				<script src="/client.bundle.js"></script>
			</body>
		</html>
	`.replace(/>[\s\t\n]*</g, "><");
}

/**
 * The function that is used by ExpressJS to generate the HTML of the page
 * on app side and returns everything to the client. This is the entry point
 * of the code.
 *
 * @param {object} req The ExpressJS request.
 * @param {object} res The ExpressJS response.
 */
function serverSideRendering(req: Object, res: Object) {
  const context: Object = {};
  const sheet = new ServerStyleSheet();
  const initialState = Map();
  const store = createStore(reducers, initialState, applyMiddleware(thunk));

  const markup = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  const styles = sheet.getStyleTags();
  const preloadedState = store.getState().toJS();

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.status(200).send(renderHTML(markup, styles, preloadedState));
  }
}

export default serverSideRendering;
