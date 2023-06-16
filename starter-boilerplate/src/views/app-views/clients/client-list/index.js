import { Alert, Button, Card, Table, Tooltip, Typography } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { EyeOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientListRequest } from "redux/actions/Clients";
import ClientView from "./ClientView";
import { useHistory } from "react-router-dom";
const { Text } = Typography;

const ClientList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((store) => store.clients);
  useEffect(() => {
    dispatch(clientListRequest());
  }, [dispatch]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [clientProfileVisible, setClientProfileVisible] = useState(false);

  const showClientProfile = (elem) => {
    setSelectedClient(elem);
    setClientProfileVisible(true);
  };

  const closeClientProfile = () => {
    setSelectedClient(null);
    setClientProfileVisible(false);
  };

  const onNameClick = (id) => {
    history.push(id + "/setting");
  };

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            name={record.name}
            shape="square"
            onNameClick={() => onNameClick(record.id)}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
      render: (_, record) => (
        <div>
          <p>
            <Text strong>mail: </Text> {record.email}
          </p>
          <p>
            <Text strong>phone: </Text> {record.phone}
          </p>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (_, record) => (
        <div>
          <Text strong>{record.company.name}</Text>
          <p>{record.company.catchPhrase}</p>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => {
                showClientProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      {error ? (
        <Alert
          message="Произошла ошибка"
          type="error"
          description="Попробуйте позже"
        />
      ) : (
        <Table
          columns={tableColumns}
          dataSource={clients}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 4 }}
        />
      )}
      <ClientView
        data={selectedClient}
        visible={clientProfileVisible}
        close={closeClientProfile}
      />
    </Card>
  );
};

export default ClientList;
