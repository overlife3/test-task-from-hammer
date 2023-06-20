import { Card } from "antd";
import React from "react";
import Board from "./Board";
import style from "./Planner.module.scss";
import PropTypes from "prop-types";

const Planner = ({ title }) => {
  return (
    <Card title={title} className={style.planner}>
      <Board />
    </Card>
  );
};

Planner.propTypes = {
  title: PropTypes.string,
};

export default Planner;
