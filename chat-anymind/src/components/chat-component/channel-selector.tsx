import { Menu, MenuProps } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { ChannelId } from "../../generated/graphql";

interface ChannelSelectorProp {
  selectingChannel: ChannelId;
  onSelectChannel: (channel: ChannelId) => void;
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const ChannelSelector = (props: ChannelSelectorProp) => {
  const items: MenuItem[] = [
    getItem(
      <div onClick={() => props.onSelectChannel(ChannelId.General)}>
        {ChannelId.General} Channel
      </div>,
      ChannelId.General,
      <MessageOutlined />
    ),
    getItem(
      <div onClick={() => props.onSelectChannel(ChannelId.Lgtm)}>
        {ChannelId.Lgtm} Channel
      </div>,
      ChannelId.Lgtm,
      <MessageOutlined />
    ),
    getItem(
      <div onClick={() => props.onSelectChannel(ChannelId.Technology)}>
        {ChannelId.Technology} Channel
      </div>,
      ChannelId.Technology,
      <MessageOutlined />
    ),
  ];

  return (
    <div className="channel-selector-container">
      <div className={"channel-selector-container__title"}>
        1. Choose your Channel
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
};

export default ChannelSelector;
