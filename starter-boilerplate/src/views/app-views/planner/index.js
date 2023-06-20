import React from "react";
import { Button, Card, Col, Input, List, Row, Upload } from "antd";
import PlannerBoard from "components/shared-components/Planner";
import { getImgById, PlannerConfig } from "configs/PlannerConfing";
import style from "./Planner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  clearTables,
  removeTargetTable,
  setCoordinateTargetTable,
  setTables,
} from "redux/actions/Planner";
import { collectTable } from "components/shared-components/Planner/utils/collectTable";
import { downloadJSONFile } from "components/shared-components/Planner/utils/downloadJSONFile";

const Block = ({ block }) => {
  const { imgId, title } = block;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addTable(collectTable(block)));
  };

  return (
    <Card
      bordered={true}
      hoverable
      cover={
        <img
          src={getImgById(imgId)}
          alt={title}
          style={{ height: 122, objectFit: "contain" }}
        />
      }
      onClick={handleClick}
    >
      {title}
    </Card>
  );
};

const BlockParameters = () => {
  const dispatch = useDispatch();
  const { tables, targetTableId } = useSelector((store) => store.planner);
  const targetTable = tables.find((table) => table.id === targetTableId);

  const handleX = (e) => {
    let x = Number(e.target.value);

    if (x < 0) x = 0;
    if (x > 500 - targetTable.width) x = 500 - targetTable.width;

    const coordinate = { x, y: targetTable.coordinate.y };
    console.log(coordinate);

    dispatch(setCoordinateTargetTable(coordinate));
  };
  const handleY = (e) => {
    let y = Number(e.target.value);

    if (y < 0) y = 0;
    if (y > 500 - targetTable.height) y = 500 - targetTable.height;
    const coordinate = { x: targetTable.coordinate.x, y };
    console.log(coordinate);
    dispatch(setCoordinateTargetTable(coordinate));
  };

  const handleRemove = () => {
    dispatch(removeTargetTable());
  };
  return (
    <Card title="Параметры элемента" className={style.param_element}>
      <div className={style.list}>
        <div>
          <p>X</p>
          <Input
            type="number"
            value={targetTable?.coordinate.x || 0}
            onChange={handleX}
          />
        </div>
        <div>
          <p>Y</p>
          <Input
            type="number"
            value={targetTable?.coordinate.y || 0}
            onChange={handleY}
          />
        </div>
        <div className={style.remove}>
          <Button type="primary" danger onClick={handleRemove}>
            Удалить элемент
          </Button>
        </div>
      </div>
    </Card>
  );
};

const BlockList = ({ data }) => {
  return (
    <Card>
      <List
        style={{ overflowX: "auto" }}
        grid={{
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Block block={item} />
          </List.Item>
        )}
      />
    </Card>
  );
};

const PlannerMenu = () => {
  const dispatch = useDispatch();
  const tables = useSelector((store) => store.planner.tables);
  const handleDownload = () => {
    downloadJSONFile(tables, "planner.json");
  };

  const handleClearTables = () => {
    dispatch(clearTables());
  };

  const handleUploadFile = (file) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      dispatch(setTables(jsonData));
    };

    reader.readAsText(file);
  };

  return (
    <Card className={style.planner_menu}>
      <div className={style.btns}>
        <Button type="primary" onClick={handleDownload}>
          Сохранить
        </Button>
        <Upload
          accept=".json"
          beforeUpload={handleUploadFile}
          showUploadList={false}
        >
          <Button type="primary">Загрузить файл</Button>
        </Upload>
        <Button type="primary" danger onClick={handleClearTables}>
          Удалить все
        </Button>
      </div>
    </Card>
  );
};

const Planner = () => {
  return (
    <Row gutter={16}>
      <Col sm={12}>
        <BlockList data={PlannerConfig} />
        <BlockParameters />
        <PlannerMenu />
      </Col>

      <Col sm={12}>
        <PlannerBoard title="Карта заведения" />
      </Col>
    </Row>
  );
};

export default Planner;
