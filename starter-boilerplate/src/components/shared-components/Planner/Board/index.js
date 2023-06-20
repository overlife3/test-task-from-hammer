import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIdTargetTable,
  setCoordinateTargetTable as setCoordinateTargetTableAction,
} from "redux/actions/Planner";
import Table from "../Table";

const getCenterX = (x, width) => {
  return x + width / 2;
};

const getCenterY = (y, height) => {
  return y + height / 2;
};

const Board = () => {
  const dispatch = useDispatch();
  const { tables, targetTableId } = useSelector((store) => store.planner);
  const [redZones, setRedZones] = useState([]);

  useEffect(() => {
    if (tables.length !== 0) {
      const lastTable = tables[tables.length - 1];
      console.log(lastTable);
      dispatch(setIdTargetTable(lastTable.id));
      const redZones = getAllRedZones(lastTable);
      if (!checkRedZones(lastTable, redZones)) {
        lastTable.intersected = true;
      }
    }
  }, [tables.length]);

  const setCoordinateTargetTable = (coordinate) => {
    dispatch(setCoordinateTargetTableAction(coordinate));
  };

  const getTableById = (tables, id) => {
    return tables.find((table) => table.id === id);
  };

  const getRedZone = (targetTable, index) => {
    const table = tables[index];

    const xTable = table.coordinate.x;
    const yTable = table.coordinate.y;

    const left = xTable - targetTable.width / 2;
    const right = xTable + table.width + targetTable.width / 2;
    const top = yTable - targetTable.height / 2;
    const bottom = yTable + table.height + targetTable.height / 2;
    return function (x, y) {
      return x < left || x > right || y < top || y > bottom;
    };
  };

  const getAllRedZones = (targetTable) => {
    const allZones = [];
    for (let i = 0; i < tables.length; i++) {
      if (targetTable.id !== tables[i].id) {
        allZones.push(getRedZone(targetTable, i));
      }
    }
    return allZones;
  };

  const checkRedZones = (targetTable, allZones) => {
    const x = getCenterX(targetTable.coordinate.x, targetTable.width);
    const y = getCenterY(targetTable.coordinate.y, targetTable.height);
    const check = !allZones.find((func) => {
      return func(x, y) === false;
    });

    return check;
  };

  const handleTableDrag = (draggableData) => {
    const targetTable = getTableById(tables, targetTableId);
    const coordinate = { x: draggableData.x, y: draggableData.y };
    targetTable.intersected = false;
    if (!checkRedZones(targetTable, redZones)) {
      targetTable.intersected = true;
    }
    setCoordinateTargetTable(coordinate);
  };

  const handleDragStart = (targetTable) => {
    setRedZones(getAllRedZones(targetTable));
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "500px",
        height: "500px",
        border: "1px solid rgb(240 240 240)",
        position: "relative",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      {tables.map((item) => (
        <Table
          key={item.id}
          table={item}
          onTableDrag={handleTableDrag}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default Board;
