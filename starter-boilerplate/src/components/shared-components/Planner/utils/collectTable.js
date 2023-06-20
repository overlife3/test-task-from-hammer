import { nanoid } from "nanoid";

export function collectTable(table) {
  return {
    id: nanoid(),
    imgId: table.imgId,
    width: table.width,
    height: table.height,
    intersected: false,
    coordinate: {
      x: 0,
      y: 0,
    },
  };
}
