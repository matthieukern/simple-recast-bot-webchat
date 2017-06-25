import React from "react";
import styled from "styled-components";

/** FAB to be displayed on a screen corner. */
const FAB = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	position: absolute;
	left: 30px;
	bottom: 30px;
	background-color: #2196f3;
	box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 20pt;
	cursor: pointer;
	transition: all .2s ease;
	transform: rotate(${props => props.open ? "180" : "0"}deg);
`;

export default FAB;
