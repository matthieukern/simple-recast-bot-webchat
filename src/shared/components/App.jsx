// @flow
import React from "react";
import styled from "styled-components";

import Conversation from "./Conversation";
import Message from "./Message";
import MessageInput from "./message-input";

const App = (props: Object) => (
  <Wrapper>
    <Conversation>
      <Message>Hello!</Message>
      <Message other>Hello!</Message>
    </Conversation>
    <MessageInput />
  </Wrapper>
);

const Wrapper = styled.div`
	background: #f8f8f8;
	width: 100%;
	height: 100%;
`;

export default App;
