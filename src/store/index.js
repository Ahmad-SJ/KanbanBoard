import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from "./slices/workspaces";
import boardsReducer from "./slices/boards";
import columnsReducer from "./slices/columns";
import tasksReducer from "./slices/tasks";

const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
  },
});

export default store;
