// @flow
import React from "react";
import styled from "styled-components";

import Conversation from "../conversation";
import MessageInput from "../message-input";

/** The chat container. */
const Chat = ({ visible }: { visible: boolean }) => (
  <Wrapper visible={visible}>
    <Title>Recast.ai Simple Bot Chat</Title>
    <Content>
      <Conversation />
      <MessageInput />
    </Content>
  </Wrapper>
);

const Wrapper = styled.div`
	width: 370px;
	height: 100%;
	max-height: 500px;
	border-radius: 10px;
	background: #f8f8f8;
	position: absolute;
	left: 30px;
	bottom: 110px;
	box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
	overflow: hidden;
	transform-origin: bottom left;
	transform: scale(${props => props.visible ? "1" : "0"});
	opacity: ${props => props.visible ? "1" : "0"};
	transition: all .2s ease;
`;

const Title = styled.div`
	background: #2196f3;
	color: white;
	padding: 0 30px;
	height: 60px;
	display: flex;
	align-items: center;
	border-bottom: 2px solid #e9e9e9;
`;

const Content = styled.div`
	position: relative;
	height: calc(100% - 62px);
`;

export default Chat;
