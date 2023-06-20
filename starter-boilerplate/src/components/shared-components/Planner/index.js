import { Card } from "antd";
import React from "react";
import Board from "./Board";
import style from "./Planner.module.scss";
const Planner = ({ title }) => {
  return (
    <Card title={title} className={style.planner}>
      <Board />
    </Card>
  );
};

export default Planner;
