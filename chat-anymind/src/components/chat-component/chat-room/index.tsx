import { useState, useRef, useEffect } from "react";
import { Button, Spin, Modal, message } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Messages from "./messages";
import {
  UserId,
  ChannelId,
  useMessagePostMutation,
} from "../../../generated/graphql";

const errorMsg = () => {
  message.error("Error try to resend the message! please try again");
};

interface ChatRoomProp {
  selectingChannel: ChannelId;
  selectingUser: UserId;
  loadingMsg: boolean;
  messageList: MessageData[];
  onSendMessage: (channel: ChannelId, text: string, user: UserId) => void;
  onUpdateMessageList: (message: MessageData) => void;
  onReplaceMessageList: (messages: MessageData[]) => void;
  onGetOlderMessage: () => void;
  onGetNewerMessage: () => void;
}

export interface MessageData {
  messageId: string | undefined;
  text: string;
  datetime: string;
  userId: UserId;
  isSuccess?: boolean;
}

export interface ResendingMessage {
  datetime: string | undefined;
  text: string;
}

const { TextArea } = Input;

const ChatRoom = (props: ChatRoomProp) => {
  const [
    modalVisibilityByMsgTimestampAndMsg,
    setModalVisibilityByMsgTimestampAndMsg,
  ] = useState(undefined as undefined | ResendingMessage);
  const [typingMsg, setTypingMsg] = useState("");
  const chatRef = useRef(null);
  const [sendMessage, { loading }] = useMessagePostMutation({
    variables: {
      channelId: props.selectingChannel,
      userId: props.selectingUser,
      text: typingMsg || modalVisibilityByMsgTimestampAndMsg?.text || "",
    },
  });

  useEffect(() => {
    if (props.messageList.length && chatRef?.current) {
      const current: any = chatRef.current;
      current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.messageList]);

  function onSendingMessage() {
    sendMessage()
      .then((item) => {
        const newSendMessage = { ...item.data?.MessagePost, isSuccess: true };
        props.onUpdateMessageList(newSendMessage as any);
        setTypingMsg("");
      })
      .catch((error) => {
        setTypingMsg("");
        const newSendMessage: MessageData = {
          messageId: undefined,
          isSuccess: false,
          userId: props.selectingUser,
          datetime: new Date().toUTCString(),
          text: typingMsg,
        };
        props.onUpdateMessageList(newSendMessage);
      });
  }

  function onResentMessage() {
    sendMessage()
      .then((item) => {
        const updateIndex = props.messageList.findIndex(
          (item) =>
            item.datetime === modalVisibilityByMsgTimestampAndMsg?.datetime
        );
        const newSendMessage = [...props.messageList];
        newSendMessage[updateIndex] = {
          ...newSendMessage[updateIndex],
          isSuccess: true,
        };

        props.onReplaceMessageList(newSendMessage);
      })
      .catch((error) => {
        errorMsg();
      });
  }

  function handleResentMessage() {
    onResentMessage();
    setModalVisibilityByMsgTimestampAndMsg(undefined);
  }
  function handleDiscardMessage() {
    const removedMsg = props.messageList.filter(
      (item) => item.datetime !== modalVisibilityByMsgTimestampAndMsg?.datetime
    );
    props.onReplaceMessageList(removedMsg);
    setModalVisibilityByMsgTimestampAndMsg(undefined);
  }

  return (
    <>
      <div className="chat-room-container">
        <div className="chat-room-container__header">
          {props.selectingChannel}
        </div>
        {!props.loadingMsg ? (
          <div ref={chatRef} className="chat-room-container__body">
            <Button
              type="primary"
              icon={<CaretUpOutlined />}
              loading={loading}
              onClick={() => {
                props.onGetOlderMessage();
              }}
            >
              Read More
            </Button>
            <div className="chat-room-container__body__message">
              <Messages
                messageList={props.messageList}
                currentUser={props.selectingUser}
                onClickFailedMsg={(msg: ResendingMessage) => {
                  setModalVisibilityByMsgTimestampAndMsg(msg);
                }}
              />
            </div>
            <Button
              type="primary"
              icon={<CaretDownOutlined />}
              loading={loading}
              onClick={() => {
                props.onGetNewerMessage();
              }}
            >
              Read More
            </Button>
          </div>
        ) : (
          <div className="chat-room-container__spinner">
            <Spin />
          </div>
        )}

        <div className="chat-room-container__footer">
          <TextArea
            value={typingMsg}
            onChange={(e) => {
              setTypingMsg(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSendingMessage();
              }
            }}
            autoSize={{ minRows: 5 }}
          />
          <div className="chat-room-container__footer__button">
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={loading}
              onClick={() => {
                onSendingMessage();
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Error!"
        visible={!!modalVisibilityByMsgTimestampAndMsg}
        cancelText={"Unsend"}
        okText={"Resend"}
        onOk={handleResentMessage}
        onCancel={handleDiscardMessage}
      >
        <p>An error occured please select the action</p>
      </Modal>
    </>
  );
};

export default ChatRoom;
