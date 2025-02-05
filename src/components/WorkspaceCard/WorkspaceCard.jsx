import styles from "./WorkspaceCard.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import useActionModal from "../../utilities/useActionModal";
import { workspacesActions } from "../../store/slices/workspaces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useConfirmDialogue from "../../utilities/useConfirmDialogue";

export default function WorkspaceCard({
  workspaceId,
  title,
  className,
  style,
}) {
  const renameWorkspace = useActionModal(
    "Workspace Name",
    renameWorkspaceHandler
  );
  const removeWorkspace = useConfirmDialogue(
    "Do you really want to remove this workspace?",
    removeWorkspaceHandler
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(`/workspace/${workspaceId}`);
  }

  function renameWorkspaceHandler(newName) {
    dispatch(workspacesActions.rename({ workspaceId, newName }));
  }

  function removeWorkspaceHandler() {
    dispatch(workspacesActions.remove({ workspaceId }));
  }

  // Board context menu items
  const menuItems = [
    {
      label: "Rename",
      action: renameWorkspace.show,
    },
    {
      label: "Remove",
      action: removeWorkspace.show,
    },
  ];

  return (
    <>
      {renameWorkspace.modal}
      {removeWorkspace.modal}

      <div className={`${styles.root} ${className} ${style}`}>
        <ContextMenu menuItems={menuItems} className={styles.contextMenu} />

        <div className={styles.title} onClick={onClickHandler}>
          <div style={{ fontSize: "1.3rem" }}>&#128279;</div> {title}
        </div>
      </div>
    </>
  );
}
