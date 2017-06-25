// @flow
/** The action when a message is sent. */
export const SEND_MESSAGE = "SEND_MESSAGE";

/** The action when a response is received for a message. */
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";

/** Dispatched if an error has occurred when dispatching a message. */
export const MESSAGE_ERROR = "MESSAGE_ERROR";

/** Helper to asynchronously send a message to the server. */
export function sendMessage(message: string, token: string) {
  return (dispatch: (Object) => null) => {
    dispatch({
      type: SEND_MESSAGE,
      message
    });
    fetch("/api/converse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        token
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status >= 400) {
          console.error(res);
          dispatch({
            type: MESSAGE_ERROR
          });
        } else {
          const replies = res.replies;
          dispatch({
            type: RECEIVE_MESSAGES,
            messages: replies,
            token: res.token
          });
        }
      })
      .catch(e => {
        console.error(e);
        dispatch({
          type: MESSAGE_ERROR
        });
      });
  };
}
