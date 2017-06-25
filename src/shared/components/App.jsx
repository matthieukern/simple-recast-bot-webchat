// @flow
import React from "react";
import styled from "styled-components";

import Chat from "./chat-container";

/** The main container of the app. */
const App = (props: Object) => (
  <Wrapper>
    <Chat />
  </Wrapper>
);

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

export default App;
