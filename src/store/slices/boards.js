import { createSlice } from "@reduxjs/toolkit";

import { getMaxIdInList } from "../../utilities/crudHelpers";

const dummy_boards = [{ id: 1, name: "Reports", workspaceId: 1 }];

const boardsInitialState = {
  list: [...dummy_boards],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsInitialState,
  reducers: {
    addBoard(state, action) {
      const { boardName, workspaceId } = action.payload;
      console.log(boardName, workspaceId);
      const maxId = getMaxIdInList(state.list) + 1;
      state.list.push({ id: maxId, name: boardName, workspaceId });
    },
    removeBoard(state, action) {
      const { boardId } = action.payload;
      state.list = [...state.list.filter((board) => board.id !== boardId)];
    },
    renameBoard(state, action) {
      const { boardId, newName } = action.payload;
      const index = state.list.findIndex((item) => item.id === boardId);
      state.list[index].name = newName;
    },
  },
});

const boardsReducer = boardsSlice.reducer;
export default boardsReducer;
export const boardsActions = boardsSlice.actions;
