import {
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

export const initialState = {
  week: [
    { dayOfWeek: "Monday", tasks: [] },
    { dayOfWeek: "Tuesday", tasks: [] },
    { dayOfWeek: "Wednesday", tasks: [] },
    { dayOfWeek: "Thursday", tasks: [] },
    { dayOfWeek: "Friday", tasks: [] },
    { dayOfWeek: "Saturday", tasks: [] },
    { dayOfWeek: "Sunday", tasks: [] },
  ],
};

export const taskModel = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log(action.payload);
      //state.tasks[+action.payload.day - 1].push(action.payload);
      state.week.map((day) => {
        if (day.dayOfWeek == action.payload.day) {
          action.payload.complete = false;
          day.tasks.push(action.payload);
        }
      });
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
