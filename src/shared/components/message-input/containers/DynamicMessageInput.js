// @flow
import { connect } from "react-redux";
import { sendMessage } from "../../../actions/index";

import MessageInput from "../components/MessageInput";

/** Retrieve the conversation token (if any) and whether the app is loading or not. */
const mapStateToProps = state => ({
  token: state.get("conversation").get("token"),
  loading: state.get("conversation").get("loading")
});

/** Manage the behavior of the message send button. */
const mapDispatchToProps = dispatch => ({
  onSendButtonClick: (message: string, token: string) => {
    dispatch(sendMessage(message, token));
  }
});

const DynamicMessageInput = connect(mapStateToProps, mapDispatchToProps)(
  MessageInput
);

export default DynamicMessageInput;
