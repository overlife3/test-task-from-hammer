import {
  ADD_TABLE,
  CLEAR_TABLES,
  REMOVE_TABLE,
  SET_COORDINATE_TABLE,
  SET_ID_TARGET_TABLE,
  SET_TABLES,
} from "redux/constants/Planner";

export function addTable(table) {
  return {
    type: ADD_TABLE,
    payload: table,
  };
}
export function removeTargetTable() {
  return {
    type: REMOVE_TABLE,
  };
}
export function setCoordinateTargetTable(coordinate) {
  return {
    type: SET_COORDINATE_TABLE,
    payload: coordinate,
  };
}

export function setIdTargetTable(tableId) {
  return {
    type: SET_ID_TARGET_TABLE,
    payload: tableId,
  };
}

export function clearTables() {
  return {
    type: CLEAR_TABLES,
  };
}

export function setTables(tables) {
  return {
    type: SET_TABLES,
    payload: tables,
  };
}
