import style from "./Table.module.scss";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { setIdTargetTable } from "redux/actions/Planner";
import { getImgById } from "configs/PlannerConfing";
import PropTypes from "prop-types";

const Table = ({ table, onTableDrag, onDragStart }) => {
  const dispatch = useDispatch();
  const targetTableId = useSelector((store) => store.planner.targetTableId);

  const handleDrag = (_, draggableData) => {
    onTableDrag(draggableData, table.id);
  };

  const handleStart = () => {
    onDragStart(table);
    dispatch(setIdTargetTable(table.id));
  };

  const tableStyle = {
    width: table.width,
    height: table.height,
  };

  return (
    <Draggable
      position={table.coordinate}
      onDrag={handleDrag}
      defaultPosition={table.coordinate}
      bounds={"parent"}
      onStart={handleStart}
    >
      <div
        style={tableStyle}
        className={
          style.table +
          " " +
          (table.intersected ? style.intersected : "") +
          " " +
          (targetTableId === table.id ? style.target_table : "")
        }
      >
        <img src={getImgById(table.imgId)} alt="img" draggable="false" />
      </div>
    </Draggable>
  );
};

const collectTable = PropTypes.shape({
  id: PropTypes.string,
  imgId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  intersected: false,
  coordinate: {
    x: PropTypes.number,
    y: PropTypes.number,
  },
});

Table.propTypes = {
  table: collectTable,
  onTableDrag: PropTypes.func,
  onDragStart: PropTypes.func,
};

export default Table;
