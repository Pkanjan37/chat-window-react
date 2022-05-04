import { Menu, Dropdown, Space, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { UserId } from "../../generated/graphql";
import "./styles.scss";

interface UserSelectorProp {
  selectingUser: UserId;
  onSelectUser: (user: UserId) => void;
}

const UserSelector = (props: UserSelectorProp) => {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={() => props.onSelectUser(UserId.Joyse)}>
              {UserId.Joyse}
            </div>
          ),
          key: UserId.Joyse,
          icon: <UserOutlined />,
        },
        {
          label: (
            <div onClick={() => props.onSelectUser(UserId.Russell)}>
              {UserId.Russell}
            </div>
          ),
          key: UserId.Russell,
          icon: <UserOutlined />,
        },
        {
          label: (
            <div onClick={() => props.onSelectUser(UserId.Sam)}>
              {UserId.Sam}
            </div>
          ),
          key: UserId.Sam,
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="user-selector-container">
      <div className="user-selector-container__title">1. Choose your user</div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          <Space>
            {props.selectingUser} <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserSelector;
