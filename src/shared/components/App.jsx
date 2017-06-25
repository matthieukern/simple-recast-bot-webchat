// @flow
import React from "react";
import styled from "styled-components";

import Conversation from "./conversation";
import MessageInput from "./message-input";

const App = (props: Object) => (
  <Wrapper>
    <Conversation />
    <MessageInput />
  </Wrapper>
);

const Wrapper = styled.div`
	background: #f8f8f8;
	width: 100%;
	height: 100%;
`;

export default App;
