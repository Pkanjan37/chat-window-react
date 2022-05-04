import { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import UserSelector from "../chat-component/user-selector";
import ChannelSelector from "../chat-component/channel-selector";
import ChatRoom from "../chat-component/chat-room";
import { MessageData } from "../chat-component/chat-room";
import { sortBy } from "lodash";
import {
  ChannelId,
  UserId,
  useMessagesFetchLatestLazyQuery,
  useMessagesFetchMoreLazyQuery,
} from "../../generated/graphql";
import "./styles.scss";

const messagesData = {
  [ChannelId.General]: [] as MessageData[],
  [ChannelId.Lgtm]: [] as MessageData[],
  [ChannelId.Technology]: [] as MessageData[],
};

const errorMsg = () => {
  message.error("Error try to fetch the message! please try again");
};

const ChatLayout = () => {
  const [messageList, setMessageList] = useState(messagesData);
  const [selectingUser, setSelectingUser] = useState(UserId.Joyse as UserId);
  const [selectingChannel, setSelectingChannel] = useState(
    ChannelId.General as ChannelId
  );
  const [getMsg, { loading }] = useMessagesFetchLatestLazyQuery({
    variables: { channelId: selectingChannel },
  });
  const [getOldMsg] = useMessagesFetchMoreLazyQuery({
    variables: {
      channelId: selectingChannel,
      old: true,
      messageId: messageList?.[selectingChannel]?.[0]?.messageId || "",
    },
  });
  const [getNewerMsg] = useMessagesFetchMoreLazyQuery({
    variables: {
      channelId: selectingChannel,
      old: false,
      messageId:
        messageList?.[selectingChannel]?.[
          messageList[selectingChannel].length - 1
        ]?.messageId || "",
    },
  });

  useEffect(() => {
    if (
      messageList[selectingChannel] &&
      !messageList[selectingChannel].length
    ) {
      getMsg({ variables: { channelId: selectingChannel } }).then(
        (item: any) => {
          setMessageList({
            ...messageList,
            [selectingChannel]: sortBy(item.data.MessagesFetchLatest, [
              "datetime",
            ]),
          });
        }
      );
    }
  }, [selectingChannel]);
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error || !data) {
  //     return <div>ERROR</div>;
  //   }

  function handleGetOlderMsg() {
    console.log(
      "?????????????????????????????????? old",
      messageList?.[selectingChannel]?.[0]?.messageId || ""
    );

    getOldMsg()
      .then((response) => {
        setMessageList({
          ...messageList,
          [selectingChannel]: sortBy(
            messageList[selectingChannel].concat(
              response.data?.MessagesFetchMore || []
            ),
            ["datetime"]
          ),
        });
      })
      .catch((error) => {
        console.log(error, "olddddddddddddddd errr");
        errorMsg();
      });
  }

  function handleGetNewerMsg() {
    getNewerMsg()
      .then((response) => {
        setMessageList({
          ...messageList,
          [selectingChannel]: sortBy(
            messageList[selectingChannel].concat(
              response.data?.MessagesFetchMore || []
            ),
            ["datetime"]
          ),
        });
      })
      .catch((error) => {
        console.log(error, "newwwwwwwwwwwww err");
        errorMsg();
      });
  }

  return (
    <div className="layout-container">
      <Row className="layout-container__wrapper">
        <Col span={6} className="layout-container__wrapper__side-menu">
          <UserSelector
            selectingUser={selectingUser}
            onSelectUser={(user: UserId) => setSelectingUser(user)}
          />
          <ChannelSelector
            selectingChannel={selectingChannel}
            onSelectChannel={(channel: ChannelId) =>
              setSelectingChannel(channel)
            }
          />
        </Col>
        <Col span={18} className="layout-container__wrapper__chat-menu">
          <ChatRoom
            onSendMessage={() => {}}
            loadingMsg={loading}
            messageList={messageList[selectingChannel]}
            selectingUser={selectingUser}
            selectingChannel={selectingChannel}
            onGetOlderMessage={handleGetOlderMsg}
            onGetNewerMessage={handleGetNewerMsg}
            onReplaceMessageList={(messages: MessageData[]) =>
              setMessageList({ ...messageList, [selectingChannel]: messages })
            }
            onUpdateMessageList={(message: MessageData) =>
              setMessageList({
                ...messageList,
                [selectingChannel]: [...messageList[selectingChannel], message],
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChatLayout;
