import React, { useState } from "react";
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function sendData(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.7) {
        resolve(values);
      } else {
        reject("Error");
      }
    }, 2000);
  });
}

function Setting() {
  const history = useHistory();
  const { id } = useParams();
  const client = useSelector((store) =>
    store.clients.clients.find((client) => client.id == id)
  );
  const [clientData, setClientData] = useState(client);
  const [clientImg, setClientImg] = useState("");

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onFinish = (values) => {
    const key = "updatable";
    message.loading({ content: "Updating...", key, duration: 2 });
    // имитация
    sendData(values)
      .then((res) => {
        console.log(res);
        message.success({ content: "Done!", key, duration: 0.5 });
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
        message.error({ content: "Error...", key, duration: 0.5 });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUploadAavater = (info) => {
    const key = "updatable";
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key, duration: 1 });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => setClientImg(url));
      message.success({ content: "Uploaded!", key, duration: 1.5 });
      return;
    }
    if (info.file.status === "error") {
      message.error({ content: "error...", key, duration: 1.5 });
    }
  };

  const onRemoveAvater = () => {
    setClientImg("");
  };

  const formInitialState = {
    name: clientData.name,
    email: clientData.email,
    phone: clientData.phone,
    address_street: clientData.address.street,
    address_suite: clientData.address.suite,
    address_city: clientData.address.city,
    company_name: clientData.company.name,
    company_catchPhrase: clientData.company.catchPhrase,
  };

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={clientImg} icon={<UserOutlined />} />
        <div className="ml-md-3 mt-md-0 mt-3">
          <Upload
            onChange={onUploadAavater}
            showUploadList={false}
            action={"http://localhost:3000"}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={formInitialState}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Street" name="address_street">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="address_city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Suite" name="address_suite">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Company name" name="company_name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Company cath phrase"
                    name="company_catchPhrase"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default Setting;
