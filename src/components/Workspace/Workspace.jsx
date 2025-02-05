import styles from "./Workspace.module.css";

import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useActionModal from "../../utilities/useActionModal";
import { boardsActions } from "../../store/slices/boards";

import Grid from "../Grid/Grid";
import BoardCard from "../BoardCard/BoardCard";

export default function Workspace() {
  const dispatch = useDispatch();

  const addBoard = useActionModal("Board Name", addBoardHandler);

  const { w_id } = useParams();
  const workspaceId = Number(w_id);

  // Getting workspace name
  const workspaces = useSelector((state) => state.workspaces.list);
  const workspaceName = workspaces.find(
    (workspace) => workspace.id === workspaceId
  ).name;

  // Getting workspace boards
  const boards = useSelector((state) => state.boards.list);
  const workspaceBoards = boards.filter(
    (board) => board.workspaceId === workspaceId
  );

  function addBoardHandler(boardName) {
    dispatch(boardsActions.addBoard({ boardName, workspaceId }));
  }

  return (
    <>
      {addBoard.modal}

      <div className={styles.header}>
        <h1 style={{ marginBottom: "0.5rem" }}> {workspaceName} Boards: </h1>
        <Link
          onClick={addBoard.show}
          style={{ marginLeft: "0.5rem", width: "fit-content" }}
        >
          Add Board
        </Link>
      </div>
      <Grid>
        {workspaceBoards.map((board) => (
          <BoardCard
            key={board.id}
            boardId={board.id}
            title={board.name}
            workspaceId={workspaceId}
          />
        ))}
      </Grid>
    </>
  );
}
