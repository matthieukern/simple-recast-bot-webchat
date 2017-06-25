// @flow
import React from "react";
import styled from "styled-components";

/** A message bubble. */
const Message = styled.div`
	color: white;
	border-radius: 3px;
	max-width: calc(90% - 60px);
	padding: 20px;
	margin: 10px;
	background: ${props => props.other ? "rgb(97, 97, 97)" : "rgb(255, 193, 7)"};
	align-self: ${props => props.other ? "flex-end" : "flex-start"};
`;

export default Message;
