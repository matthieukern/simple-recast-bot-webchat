// @flow
import React from "react";
import { withState } from "recompose";

import Container from "./Container";
import Input from "./Input";
import SendButton from "./SendButton";

/** The message current value. */
const message = withState("message", "setMessage", "");

/** The assembly of the typing zone, managing the message state and sending action. */
const MessageInput = (
  props: {
    onSendButtonClick: (string) => void,
    message: string,
    token: string,
    setMessage: (string) => void,
    loading: boolean
  }
) => {
  const { onSendButtonClick, message, setMessage, token, loading } = props;
  return (
    <Container>
      <Input
        placeholder="Enter your message..."
        value={message}
        onChange={e => setMessage && setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.keyCode === 10 || e.keyCode === 13) {
            if (!e.shiftKey) {
              if (message.trim().length > 0) {
                onSendButtonClick(message, token);
                setMessage("");
              }
              e.preventDefault();
              return false;
            }
          }
        }}
      />
      <SendButton
        disabled={loading}
        onClick={() => {
          if (message.trim().length > 0) {
            onSendButtonClick(message, token);
            setMessage("");
          }
        }}
      >Send</SendButton>
    </Container>
  );
};

export default message(MessageInput);
