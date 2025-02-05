import { createSlice } from "@reduxjs/toolkit";
import { getMaxIdInList } from "../../utilities/crudHelpers";

const dummy_workspaces = [{ id: 1, name: "Work" }];

const workspacesInitialState = {
  list: [...dummy_workspaces],
};

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: workspacesInitialState,
  reducers: {
    addWorkspace(state, action) {
      const { workspaceName } = action.payload;
      const maxId = getMaxIdInList(state.list) + 1;
      state.list.push({ id: maxId, name: workspaceName });
    },
    remove(state, action) {
      const { workspaceId } = action.payload;
      state.list = [
        ...state.list.filter((workspace) => workspace.id !== workspaceId),
      ];
    },
    rename(state, action) {
      const { workspaceId, newName } = action.payload;
      const index = state.list.findIndex((item) => item.id === workspaceId);
      state.list[index].name = newName;
    },
  },
});

const workspacesReducer = workspacesSlice.reducer;
export default workspacesReducer;
export const workspacesActions = workspacesSlice.actions;
