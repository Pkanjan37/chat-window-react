import Message from "./message";
import { MessageData, ResendingMessage } from "./index";
import { UserId } from "../../../generated/graphql";

interface MessageProp {
  messageList: MessageData[];
  currentUser: UserId;
  onClickFailedMsg: (datetime: ResendingMessage) => void;
}

const Messages = (props: MessageProp) => {
  return (
    <div className="messages-container">
      {props.messageList.map((item: MessageData) => {
        return (
          <Message
            messageId={item.messageId}
            text={item.text}
            datetime={item.datetime}
            userId={item.userId}
            currentUser={props.currentUser}
            isSentSuccess={item.isSuccess}
            onClickFailedMsg={props.onClickFailedMsg}
          />
        );
      })}
    </div>
  );
};

export default Messages;
