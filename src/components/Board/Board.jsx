import styles from "./Board.module.css";

import { Link, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/slices/tasks";
import { columnsActions } from "../../store/slices/columns";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Column from "../../components/Column/Column";

import useActionModal from "../../utilities/useActionModal";

export default function Board() {
  const dispatch = useDispatch();
  const addColumn = useActionModal("Column name", addColumnHandler);

  //getting workspace id and board id from url
  const { w_id, b_id } = useParams();
  const workspaceId = Number(w_id);
  const boardId = Number(b_id);

  //getting board name
  const boards = useSelector((state) => state.boards.list);
  const boardName = boards.find(
    (board) => board.id === boardId && board.workspaceId === workspaceId
  ).name;

  //getting board columns
  const columns = useSelector((state) => state.columns.list);
  const boardColumns = columns.filter(
    (column) => column.workspaceId === workspaceId && column.boardId === boardId
  );

  console.log(boardColumns);

  //getting all tasks
  //row format: { workspaceId, boardId, columnId, tasks[] }
  const tasks = useSelector((state) => state.tasks.list);
  const boardTasks = tasks.filter(
    (row) => row.workspaceId === workspaceId && row.boardId === boardId
  );

  //----------------------------------------------------------------------
  function dragEndHandler(result) {
    const { destination, source, draggableId, type } = result;
    console.log(result);

    if (type === "column") {
      // Nothing to do
      if (destination === null) return;

      // Dragging in the same droppable list
      if (source.droppableId === destination.droppableId) {
        // Nothing changed
        if (source.index === destination.index) {
          return;
        }
        // Columns order changed
        else {
          dispatch(
            columnsActions.move({
              columnId: Number(draggableId),
              oldIndex: source.index,
              newIndex: destination.index,
            })
          );
        }
      }
    }

    if (type === "task") {
      // Nothing to do
      if (destination === null) return;

      const updateData = {
        rowData: {
          workspaceId: workspaceId,
          boardId: boardId,
          columnId: Number(source.droppableId),
        },
        taskData: {
          id: Number(draggableId),
          destinationColumn: Number(destination.droppableId),
          oldIndex: Number(source.index),
          newIndex: Number(destination.index),
        },
      };

      // Dragging in the same droppable list
      if (source.droppableId === destination.droppableId) {
        // Nothing changed
        if (source.index === destination.index) {
          return;
        }
        // Tasks order changed
        else {
          dispatch(tasksActions.updateTask(updateData));
        }
      }
      //Moving tasks between different lists, index also should be updated
      else {
        if (source.type === destination.type) {
          dispatch(tasksActions.updateTask(updateData));
        }
      }
    }
  }

  function addColumnHandler(columnName) {
    dispatch(columnsActions.add({ columnName, workspaceId, boardId }));
  }

  return (
    <>
      {addColumn.modal}
      <DragDropContext onDragEnd={dragEndHandler}>
        <div className={styles.root}>
          <div className={styles.header}>
            <h1 style={{ marginBottom: "0.5rem" }}> {boardName} Board </h1>
            <Link onClick={addColumn.show} style={{ marginLeft: "0.5rem" }}>
              Add Column
            </Link>
          </div>
          <div className={styles.body}>
            {/* ----------------------------------------------------- */}
            <Droppable
              droppableId={"all_columns"}
              direction="horizontal"
              type={"column"}
            >
              {(provided, snapshot) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  {boardColumns.map((column, index) => (
                    <Column
                      key={column.id}
                      workspaceId={workspaceId}
                      boardId={boardId}
                      columnId={column.id}
                      title={column.name}
                      tasks={boardTasks}
                      index={index}
                    />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* ----------------------------------------------------- */}
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
