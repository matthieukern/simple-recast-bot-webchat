// @flow
import React from "react";

import Container from "./Container";
import Input from "./Input";
import SendButton from "./SendButton";

const MessageInput = () => (
  <Container>
    <Input placeholder="Enter your message..." />
    <SendButton />
  </Container>
);

export default MessageInput;
