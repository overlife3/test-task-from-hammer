import React from "react";
import { Avatar, Drawer, Divider, Typography } from "antd";
import { MobileOutlined, MailOutlined, TeamOutlined } from "@ant-design/icons";
import img from "../../../../assets/img/default.png";

const { Text } = Typography;

const ClientView = ({ data, visible, close }) => {
  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >
      <div className="text-center mt-3">
        <Avatar size={80} src={img} />
        <h3 className="mt-2 mb-0">{data?.name}</h3>
      </div>
      <Divider dashed />
      <div className="">
        <h6 className="text-muted text-uppercase mb-3">Company details</h6>
        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">{data?.company.name}</span>
        </p>
        <p>
          <span className="ml-3 text-dark">{data?.company.catchPhrase}</span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
        <p>
          <MobileOutlined />
          <span className="ml-3 text-dark">{data?.phone}</span>
        </p>
        <p>
          <MailOutlined />
          <span className="ml-3 text-dark">
            {data?.email ? data?.email : "-"}
          </span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">Address</h6>
        <p>
          <Text strong>City: </Text> {data?.address.city}
        </p>
        <p>
          <Text strong>Suite: </Text> {data?.address.suite}
        </p>
        <p>
          <Text strong>Street: </Text> {data?.address.street}
        </p>
      </div>
    </Drawer>
  );
};

export default ClientView;
