import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Board from "./Board";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Alert } from "antd";
const Planner = () => {
  const [x, setX] = useState(0);
  return (
    <DndProvider backend={HTML5Backend}>
      <Alert type="error" message="Не успел докончить" />
      <div>
        <Board />
      </div>
    </DndProvider>
  );
};

export default Planner;
