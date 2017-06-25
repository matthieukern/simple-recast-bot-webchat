export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const MESSAGE_ERROR = "MESSAGE_ERROR";

export function sendMessage(message, token) {
  return dispatch => {
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
