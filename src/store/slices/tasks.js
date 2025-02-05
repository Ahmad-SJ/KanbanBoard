import { createSlice } from "@reduxjs/toolkit";
import { getMaxIdInList } from "../../utilities/crudHelpers";

const dummy_tasks = [
  { userId: 1, id: 4, title: "et porro tempora", completed: true, columnId: 1 },

  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 11,
    title: "vero rerum temporibus dolor",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 12,
    title: "ipsa repellendus fugit nisi",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 14,
    title: "repellendus sunt dolores architecto voluptatum",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 15,
    title: "ab voluptatum amet voluptas",
    completed: true,
    columnId: 1,
  },

  {
    userId: 1,
    id: 16,
    title: "accusamus eos facilis sint et aut voluptatem",
    completed: true,
    columnId: 2,
  },

  {
    userId: 1,
    id: 17,
    title: "quo laboriosam deleniti aut qui",
    completed: true,
    columnId: 2,
  },

  {
    userId: 1,
    id: 19,
    title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    completed: true,
    columnId: 2,
  },

  {
    userId: 1,
    id: 20,
    title: "ullam nobis libero sapiente ad optio sint",
    completed: false,
    columnId: 2,
  },

  {
    userId: 2,
    id: 22,
    title: "distinctio vitae autem nihil ut molestias quo",
    completed: false,
    columnId: 2,
  },

  {
    userId: 2,
    id: 25,
    title: "voluptas quo tenetur perspiciatis explicabo natus",
    completed: false,
    columnId: 2,
  },

  {
    userId: 2,
    id: 26,
    title: "aliquam aut quasi",
    completed: false,
    columnId: 2,
  },

  {
    userId: 2,
    id: 27,
    title: "veritatis pariatur delectus",
    completed: false,
    columnId: 3,
  },

  {
    userId: 2,
    id: 30,
    title:
      "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
    completed: false,
    columnId: 3,
  },

  {
    userId: 2,
    id: 35,
    title: "repellendus veritatis molestias dicta incidunt",
    completed: false,
    columnId: 3,
  },

  {
    userId: 2,
    id: 36,
    title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
    completed: false,
    columnId: 3,
  },

  {
    userId: 3,
    id: 43,
    title: "tempore ut sint quis recusandae",
    completed: false,
    columnId: 3,
  },

  {
    userId: 3,
    id: 44,
    title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
    completed: false,
    columnId: 3,
  },
  {
    userId: 3,
    id: 45,
    title: "ut sint quis recusan oremque ipsa natu atque quo n",
    completed: false,
    columnId: 3,
  },
];

export function compareRows(row1, row2) {
  if (row1.workspaceId === row2.workspaceId) {
    if (row1.boardId === row2.boardId) {
      if (row1.columnId === row2.columnId) {
        return true;
      }
    }
  }
  return false;
}

export function findRowIndex(list, row) {
  if (list?.length > 0) {
    for (let index = 0; index < list.length; index++) {
      if (compareRows(list[index], row)) {
        return index;
      }
    }
  }
  return -1;
}

function getMaxTaskIdInBoard(list, row) {
  const tempList = JSON.parse(JSON.stringify(list));
  let boardTasks = [];

  for (let index = 0; index < tempList.length; index++) {
    if (tempList[index].workspaceId === row.workspaceId) {
      if (tempList[index].boardId === row.boardId) {
        boardTasks.push(...tempList[index].tasks);
      }
    }
  }
  return getMaxIdInList(boardTasks);
}

//row format: { workspaceId, boardId, columnId, tasks[] }
//{ workspaceId: 0, boardId: 0, columnId: 0, tasks: [] }
const tasksTable = [];

const tasksInitialState = {
  list: [...tasksTable],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action) {
      //rowData: { workspaceId, boardId, columnId}
      //taskData: {title, userId, index, completed, }
      const { rowData, taskData } = action.payload;

      let tempTask = {
        id: getMaxTaskIdInBoard(state.list, rowData) + 1,
        ...taskData,
      };

      //Checking if the row already exists
      const rowIndex = findRowIndex(state.list, rowData);
      if (rowIndex === -1) {
        state.list.push({ ...rowData, tasks: [tempTask] });
      } else {
        state.list[rowIndex].tasks.push(tempTask);
      }
    },
    updateTask(state, action) {
      //rowData: { workspaceId, boardId, columnId}
      //taskData: {id, destinationColumn, newIndex}
      const { rowData, taskData } = action.payload;

      // Remove task from old column
      const sourceRowIndex = findRowIndex(state.list, rowData);
      const temp = state.list[sourceRowIndex].tasks.splice(
        taskData.oldIndex,
        1
      );
      const deletedTask = JSON.parse(JSON.stringify(temp));

      // Add task to new column
      const tempRowData = { ...rowData, columnId: taskData.destinationColumn };
      const destinationRowIndex = findRowIndex(state.list, tempRowData);
      // Destination column never held a task before
      if (destinationRowIndex === -1) {
        const newRow = { ...tempRowData, tasks: [...deletedTask] };
        state.list.push(newRow);
      }
      // Destination column held a task before
      else {
        state.list[destinationRowIndex].tasks.splice(
          taskData.newIndex,
          0,
          ...deletedTask
        );
        console.log(state.list[destinationRowIndex].tasks);
      }
    },
    removeTask(state, action) {
      //{ rowData, taskId, taskIndex }
      //rowData: { workspaceId, boardId, columnId}
      const { rowData, taskId, taskIndex } = action.payload;
      const rowIndex = findRowIndex(state.list, rowData);
      state.list[rowIndex].tasks.splice(taskIndex, 1);
    },
    editTask(state, action) {
      const { rowData, taskIndex, taskTitle } = action.payload;
      const rowIndex = findRowIndex(state.list, rowData);
      state.list[rowIndex].tasks[taskIndex].title = taskTitle;
    },
  },
});

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
export const tasksActions = tasksSlice.actions;
