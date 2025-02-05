import styles from "./Task.module.css";

import { Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/slices/tasks";

import ContextMenu from "../ContextMenu/ContextMenu";

import useActionModal from "../../utilities/useActionModal";
import useConfirmDialogue from "../../utilities/useConfirmDialogue";

export default function Task({ task, index, rowData }) {
  const dispatch = useDispatch();

  const editTask = useActionModal("Task Text", editHandler);
  const deleteTask = useConfirmDialogue(
    "Do you really want to remove this task?",
    removeTaskHandler
  );

  // Edit task handler
  function editHandler(taskTitle) {
    dispatch(
      tasksActions.editTask({
        rowData,
        taskTitle: taskTitle,
        taskIndex: index,
      })
    );
  }

  // Remove task handler
  function removeTaskHandler() {
    dispatch(
      tasksActions.removeTask({ rowData, taskId: task.id, taskIndex: index })
    );
  }

  const menuItems = [
    {
      label: "Edit",
      action: editTask.show,
    },
    {
      label: "Remove",
      action: deleteTask.show,
    },
  ];

  return (
    <>
      {editTask.modal}
      {deleteTask.modal}

      <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={styles.root}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
          >
            <div
              style={{
                position: "absolute",
                top: "4px",
                right: "5px",
              }}
            >
              <ContextMenu
                menuItems={menuItems}
                className={styles.contextButton}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                padding: "2px",
              }}
            >
              <span>
                <small>
                  #{task.id} i={index}
                </small>
              </span>
            </div>

            <div className={styles.text}>{task.title}</div>

            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
