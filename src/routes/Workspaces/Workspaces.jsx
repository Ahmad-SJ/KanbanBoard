import styles from "./Workspaces.module.css";

import Grid from "../../components/Grid/Grid";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { workspacesActions } from "../../store/slices/workspaces";
import WorkspaceCard from "../../components/WorkspaceCard/WorkspaceCard";

import useActionModal from "../../utilities/useActionModal";

export default function Workspaces() {
  const addWorkspace = useActionModal("Workspace Name", addWorkspaceHandler);
  const workspaces = useSelector((state) => state.workspaces.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addWorkspaceHandler(workspaceName) {
    dispatch(workspacesActions.addWorkspace({ workspaceName }));
  }

  return (
    <>
      {addWorkspace.modal}

      <div className={styles.header}>
        <h1 style={{ marginBottom: "0.5rem" }}> Workspaces </h1>
        <Link onClick={addWorkspace.show} style={{ marginLeft: "0.5rem" }}>
          Add Workspace
        </Link>
      </div>
      <Grid>
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspaceId={workspace.id}
            title={workspace.name}
          />
        ))}
      </Grid>
    </>
  );
}
