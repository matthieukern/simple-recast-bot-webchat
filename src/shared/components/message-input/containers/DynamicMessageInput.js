// @flow
import { connect } from "react-redux";
import { sendMessage } from "../../../actions/index";

import MessageInput from "../components/MessageInput";

const mapStateToProps = state => ({
  token: state.get("conversation").get("token"),
  loading: state.get("conversation").get("loading")
});

const mapDispatchToProps = dispatch => ({
  onSendButtonClick: (message: string, token: string) => {
    dispatch(sendMessage(message, token));
  }
});

const DynamicMessageInput = connect(mapStateToProps, mapDispatchToProps)(
  MessageInput
);

export default DynamicMessageInput;
