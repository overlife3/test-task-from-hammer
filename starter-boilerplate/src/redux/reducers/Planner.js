import {
  ADD_TABLE,
  CLEAR_TABLES,
  REMOVE_TABLE,
  SET_COORDINATE_TABLE,
  SET_ID_TARGET_TABLE,
  SET_TABLES,
} from "redux/constants/Planner";
const initialState = {
  tables: [],
  targetTableId: null,
};

const getTableById = (tables, id) => {
  return tables.find((table) => table.id === id);
};

const Planner = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TABLE:
      const tables = state.tables;
      return { ...state, tables: [...tables, action.payload] };
    case REMOVE_TABLE:
      const newTables = state.tables.filter(
        (table) => table.id !== state.targetTableId
      );
      return { ...state, tables: newTables };
    case SET_COORDINATE_TABLE:
      const targetTable = getTableById(state.tables, state.targetTableId);
      targetTable.coordinate = action.payload;
      return { ...state };
    case SET_ID_TARGET_TABLE:
      state.targetTableId = action.payload;
      return state;
    case CLEAR_TABLES:
      state = initialState;
      return state;
    case SET_TABLES:
      state.tables = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default Planner;
