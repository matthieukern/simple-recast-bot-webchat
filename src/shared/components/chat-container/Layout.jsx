import React from "react";
import { withState } from "recompose";
import FontAwesome from "react-fontawesome";

import Chat from "./Chat";
import OpenChatButton from "./OpenChatButton";

const chatOpen = withState("chatOpen", "setChatOpen", true);

/** The layout of the webchat that manages whether the chat is open or not. */
const Layout = ({ chatOpen, setChatOpen }) => (
  <div>
    <OpenChatButton open={chatOpen} onClick={() => setChatOpen(!chatOpen)}>
      <FontAwesome name={chatOpen ? "times" : "comments-o"} />
    </OpenChatButton>
    <Chat visible={chatOpen} />
  </div>
);

export default chatOpen(Layout);
