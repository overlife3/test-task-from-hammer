import React from "react";
import { useDrag } from "react-dnd";

export const Item = ({ text }) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: "item",
  }));

  return <div ref={dragRef}>{text}</div>;
};
