// @flow
import React from "react";
import styled from "styled-components";
import { lifecycle } from "recompose";

import Message from "./Message";
import NoMessageInfo from "./NoMessageInfo";

/**
 * Simple function to scroll to the end of the conversation when the component is re-rendered (when
 * a new message is displayed).
 */
const manageScroll = lifecycle({
  componentDidUpdate() {
    const elem: ?Object = document.getElementById("ugly-scroll-hack");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }
});

/** The container for a conversation, that displays all stored messages. */
const Conversation = props => (
  <Wrapper>
    {props.messages.size === 0 &&
      <NoMessageInfo>Ask me anything!</NoMessageInfo>}
    {props.messages.map((msg, key) => (
      <Message key={key} other={msg.get("bot")}>{msg.get("message")}</Message>
    ))}
    <div id="ugly-scroll-hack" />
  </Wrapper>
);

/** Wrapper to apply style to the conversation. */
const Wrapper = styled.div`
	height: calc(100% - 66px);
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
`;

export default manageScroll(Conversation);
