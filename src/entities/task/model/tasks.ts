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
        if (day.dayOfWeek === action.payload.day) {
          action.payload.id = day.tasks.length + 1;
          action.payload.complete = false;
          day.tasks.push(action.payload);
        }
      });
    },
    toggleTask: (state, action) => {
      console.log(action.payload);
      state.week.map((day) => {
        if (day.dayOfWeek === action.payload.day) {
          day.tasks.map((task) => {
            if (task.id === action.payload.id) {
              task.complete = action.payload.complete;
            }
          });
        }
      });
    },
    deleteTask: (state, action) => {
      console.log(state, action.payload);
      state.week = state.week.map((day) => {
        if (day.dayOfWeek === action.payload.day) {
          day.tasks = day.tasks.filter((task) => task.id !== action.payload.id);
        }
        return day;
      });
    },
  },
});

export const { addTask, toggleTask, deleteTask } = taskModel.actions;
