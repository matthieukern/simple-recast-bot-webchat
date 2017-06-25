// @flow
import { connect } from "react-redux";

import Conversation from "../components/Conversation";

const mapStateToProps = state => ({
  messages: state.get("messages")
});

const ConversationContainer = connect(mapStateToProps)(Conversation);

export default ConversationContainer;
