// @flow
import React from "react";
import styled from "styled-components";
import { lifecycle } from "recompose";

import Message from "./Message";

const manageScroll = lifecycle({
  componentDidUpdate() {
    const elem = document.getElementById("ugly-scroll-hack");
    elem.scrollIntoView({ behavior: "smooth" });
  }
});

const Conversation = props => (
  <Wrapper>
    {props.messages.map((msg, key) => (
      <Message key={key} other={msg.get("bot")}>{msg.get("message")}</Message>
    ))}
    <div id="ugly-scroll-hack" />
  </Wrapper>
);

const Wrapper = styled.div`
	height: calc(100% - 66px);
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
`;

export default manageScroll(Conversation);
