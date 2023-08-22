import {
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

export const initialState = {
  tasks: [[], [], [], [], [], [], []],
};

export const taskModel = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log(state, action.payload);
      state.tasks[+action.payload.day - 1].push(action.payload);
    },
    toggleTask: (state, action) => {
      console.log(state, action.payload);
    },
    deleteTask: (state, action) => {
      console.log(state, action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = taskModel.actions;
