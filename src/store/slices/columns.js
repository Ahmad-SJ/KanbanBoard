import { createSlice } from "@reduxjs/toolkit";

import { getMaxIdInList } from "../../utilities/crudHelpers";

const dummy_columns = [
  { id: 1, name: "To do", workspaceId: 1, boardId: 1 },
  { id: 2, name: "Pending", workspaceId: 1, boardId: 1 },
  { id: 3, name: "Done", workspaceId: 1, boardId: 1 },
];

// Row format: {id, name, workspaceId, boardId}
const columnsInitialState = {
  list: [...dummy_columns],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState: columnsInitialState,
  reducers: {
    add(state, action) {
      const { columnName, workspaceId, boardId } = action.payload;

      const maxId = getMaxIdInList(state.list) + 1;
      state.list.push({ id: maxId, name: columnName, workspaceId, boardId });
    },
    rename(state, action) {
      const { columnId, newName } = action.payload;
      const index = state.list.findIndex((row) => row.id === columnId);
      state.list[index].name = newName;
    },
    remove(state, action) {
      const { columnId } = action.payload;
      state.list = state.list.filter((row) => row.id !== columnId);
    },
    move(state, action) {
      //rowData: { workspaceId, boardId, columnId}
      //taskData: {id, destinationColumn, newIndex}
      const { columnId, oldIndex, newIndex } = action.payload;

      // Remove column from old index
      const temp = state.list.splice(oldIndex, 1);
      const deletedColumn = JSON.parse(JSON.stringify(temp));

      // insert column into new index
      state.list.splice(newIndex, 0, ...deletedColumn);
      console.log(state.list);
    },
  },
});

const columnsReducer = columnsSlice.reducer;
export default columnsReducer;

export const columnsActions = columnsSlice.actions;
