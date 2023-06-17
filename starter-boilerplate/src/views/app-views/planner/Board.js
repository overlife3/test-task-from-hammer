import React, { useState } from "react";
import Draggable from "react-draggable";

const tablesData = [
  { id: 1, width: 50, height: 50, coordinate: { x: 0, y: 0 } },
  { id: 2, width: 50, height: 50, coordinate: { x: 100, y: 100 } },
  { id: 3, width: 50, height: 50, coordinate: { x: 200, y: 200 } },
  { id: 4, width: 50, height: 50, coordinate: { x: 300, y: 300 } },
];

const getFactX = (x, width) => {
  return x + width / 2;
};

const getFactY = (y, height) => {
  return y + height / 2;
};
const Board = () => {
  const [tables, setTables] = useState(tablesData);
  const [redZones, setRedZones] = useState([]);

  const setCoordinateTableById = (coordinate, id) => {
    setTables((tables) => {
      const table = getTableById(tables, id);
      table.coordinate = coordinate;

      return [...tables];
    });
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

    console.log(left, right, top, bottom);
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
    const x = getFactX(targetTable.coordinate.x, targetTable.width);
    const y = getFactY(targetTable.coordinate.y, targetTable.height);
    console.log(x, y);
    const check = !allZones.find((func) => {
      return func(x, y) === false;
    });

    return check;
  };

  const handleTableDrag = (draggableData, idTable) => {
    const targetTable = getTableById(tables, idTable);
    const coordinate = { x: draggableData.x, y: draggableData.y };
    console.log("drag:", draggableData.x, draggableData.y);
    const delta = { x: draggableData.deltaX, y: draggableData.deltaY };
    targetTable.red = false;
    if (!checkRedZones(targetTable, redZones)) {
      // if (delta.y === -1) {
      //   setTables((tables) => {
      //     targetTable.bounds = { ...targetTable.bounds, top: coordinate.y };
      //     targetTable.coordinate.y += 10;
      //     return [...tables];
      //   });
      // }
      // if (delta.y === 1) {
      //   setTables((tables) => {
      //     targetTable.bounds = { ...targetTable.bounds, bottom: coordinate.y };
      //     targetTable.coordinate.y -= 10;
      //     return [...tables];
      //   });
      // }
      // if (delta.x === -1) {
      //   setTables((tables) => {
      //     targetTable.bounds = { ...targetTable.bounds, left: coordinate.x };
      //     return [...tables];
      //   });
      // }
      // if (delta.x === 1) {
      //   setTables((tables) => {
      //     targetTable.bounds = { ...targetTable.bounds, right: coordinate.x };
      //     return [...tables];
      //   });
      // }
      targetTable.red = true;
    }
    setCoordinateTableById(coordinate, idTable);
  };

  const handleStartDrag = (targetTable) => {
    setRedZones(getAllRedZones(targetTable));
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid blue",
        position: "relative",
      }}
    >
      {tables.map((item) => (
        <Table
          table={item}
          onTableDrag={handleTableDrag}
          onStart={handleStartDrag}
        />
      ))}
    </div>
  );
};

const Table = ({ table, onTableDrag, onStart }) => {
  const handleDrag = (_, draggableData) => {
    const { x, y } = draggableData;
    onTableDrag(draggableData, table.id);
  };

  const handleStart = () => {
    onStart(table);
  };

  const tableStyle = {
    width: "50px",
    height: "50px",
    background: table.red ? "red" : "lightblue",
    position: "absolute",
  };

  return (
    <Draggable
      position={table.coordinate}
      onDrag={handleDrag}
      defaultPosition={table.coordinate}
      bounds={table.bounds || "parent"}
      onStart={handleStart}

      // disabled={!!table.bounds}
    >
      <div style={tableStyle}>Table {table.id}</div>
    </Draggable>
  );
};

export default Board;
