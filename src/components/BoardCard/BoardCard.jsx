import styles from "./BoardCard.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import useActionModal from "../../utilities/useActionModal";
import { boardsActions } from "../../store/slices/boards";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useConfirmDialogue from "../../utilities/useConfirmDialogue";

export default function BoardCard({ boardId, title, className, style }) {
  const renameBoard = useActionModal("Board Name", renameBoardHandler);
  const removeBoard = useConfirmDialogue(
    "Do you really want to remove this board?",
    removeBoardHandler
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(`board/${boardId}`);
  }

  function renameBoardHandler(newName) {
    dispatch(boardsActions.renameBoard({ boardId, newName }));
  }

  function removeBoardHandler() {
    dispatch(boardsActions.removeBoard({ boardId }));
  }

  // Board context menu items
  const menuItems = [
    {
      label: "Rename",
      action: renameBoard.show,
    },
    {
      label: "Remove",
      action: removeBoard.show,
    },
  ];

  return (
    <>
      {renameBoard.modal}
      {removeBoard.modal}

      <div className={`${styles.root} ${className} ${style}`}>
        <ContextMenu menuItems={menuItems} className={styles.contextMenu} />

        <div className={styles.title} onClick={onClickHandler}>
          <div style={{ fontSize: "1.3rem" }}>&#128279;</div> {title}
        </div>
      </div>
    </>
  );
}
