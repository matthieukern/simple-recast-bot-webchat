// @flow
import { combineReducers } from "redux-immutable";
import { fromJS } from "immutable";

import { SEND_MESSAGE, RECEIVE_MESSAGES, MESSAGE_ERROR } from "../actions";

/** Manage messages redux state. */
function messages(state = fromJS([]), action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const message = fromJS({
        bot: false,
        message: action.message
      });
      return state.push(message);

    case RECEIVE_MESSAGES:
      const messages = action.messages.map(m => ({
        bot: true,
        message: m
      }));
      return state.concat(fromJS(messages));
  }
  return state;
}

/** Manage conversation redux state. */
function conversation(state = fromJS({ token: null, loading: false }), action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return state.set("loading", true);

    case RECEIVE_MESSAGES:
      const token = action.token;
      return state.set("token", token).set("loading", false);

    case MESSAGE_ERROR:
      return state.set("loading", false);
  }
  return state;
}

const app = combineReducers({
  messages,
  conversation
});

export default app;
