import styles from "./Column.module.css";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from "../Task/Task";

import { findRowIndex } from "../../store/slices/tasks";
import ContextMenu from "../ContextMenu/ContextMenu";

import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/slices/tasks";
import { columnsActions } from "../../store/slices/columns";

import useActionModal from "../../utilities/useActionModal";

import useConfirmDialogue from "../../utilities/useConfirmDialogue";

function getColumnTasks(list, rowData) {
  const rowIndex = findRowIndex(list, rowData);
  if (rowIndex === -1) {
    return [];
  } else {
    return list[rowIndex].tasks;
  }
}

export default function Column({
  title,
  columnId,
  workspaceId,
  boardId,
  tasks,
  index,
}) {
  const dispatch = useDispatch();

  const addTask = useActionModal("Add Task", addTaskHandler);
  const renameColumn = useActionModal("Column Name", renameColumnHandler);
  const removeColumn = useConfirmDialogue(
    "Do you really want to remove this column?",
    removeColumnHandler
  );

  const rowData = {
    workspaceId: workspaceId,
    boardId: boardId,
    columnId: columnId,
  };

  const columnTasks = getColumnTasks(tasks, rowData);

  // Add Task handler
  function addTaskHandler(taskTitle) {
    dispatch(
      tasksActions.addTask({ taskData: { title: taskTitle }, rowData: rowData })
    );
  }

  // Rename column handlers
  function renameColumnHandler(newName) {
    dispatch(columnsActions.rename({ columnId, newName }));
  }

  // Remove column handler
  function removeColumnHandler() {
    dispatch(columnsActions.remove({ columnId }));
  }

  // Column context menu items
  const menuItems = [
    { label: "Add Task", action: addTask.show },
    {
      label: "Rename",
      action: renameColumn.show,
    },
    {
      label: "Remove",
      action: removeColumn.show,
    },
  ];

  // {...provided.dragHandleProps}
  function ColumnHeader(dragHandleProps) {
    return (
      <div className={styles.header} {...dragHandleProps}>
        <h4 className={styles.title}>{title}</h4>
        <ContextMenu menuItems={menuItems} />
      </div>
    );
  }

  return (
    <>
      {addTask.modal}
      {renameColumn.modal}
      {removeColumn.modal}

      <Draggable draggableId={`column${columnId}`} key={columnId} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
          >
            <div className={styles.root}>
              <div className={styles.header} {...provided.dragHandleProps}>
                <h4 className={styles.title}>{title}</h4>
                <ContextMenu menuItems={menuItems} />
              </div>

              <div className={`${styles.body}`}>
                <Droppable droppableId={`${columnId}`} type={"task"}>
                  {(provided, snapshot) => (
                    <div
                      className={styles.droppable_area}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      // isDraggingOver={snapshot.isDraggingOver}
                    >
                      {columnTasks?.map((task, index) => (
                        <Task
                          key={index}
                          index={index}
                          task={task}
                          rowData={rowData}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>

            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
