// @flow
import React from "react";
import styled from "styled-components";

/** The textarea in which the user type his message. */
const MessageInput = styled.textarea`
	width: 100%;
	border: none;
	padding: 10px 20px;
	font: 14px/22px "Lato", Arial, sans-serif;
	resize: none;
	box-sizing: border-box;
	background-color: white;
`;

export default MessageInput;
