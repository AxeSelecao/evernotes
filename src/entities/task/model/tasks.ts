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
      if (action.payload[1] === "inner") {
        for (let i = 0; i < state.week.length; i++) {
          if (state.week[i].dayOfWeek === action.payload[0].day) {
            for (let j = 0; j < state.week[i].tasks.length; j++) {
              if (state.week[i].tasks[j].id == action.payload[0].id) {
                state.week[i].tasks[j].todos.push({
                  id: state.week[i].tasks[j].todos.length + 1,
                  todo: "todo",
                  day: action.payload[0].day,
                  complete: false,
                });
                state.week[i].tasks[j].complete = false;
              }
            }
          }
        }
      } else {
        state.week.map((day) => {
          if (day.dayOfWeek === action.payload.day) {
            action.payload.id = day.tasks.length + 1;
            action.payload.complete = false;
            action.payload.todos = [];
            day.tasks.push(action.payload);
          }
        });
      }
    },
    toggleTask: (state, action) => {
      let allCompleted = true;
      if (action.payload[1] === "inner") {
        for (let i = 0; i < state.week.length; i++) {
          if (state.week[i].dayOfWeek === action.payload[0].day) {
            state.week[i].tasks[action.payload[2] - 1].todos.map(
              (todo, index) => {
                if (todo.id === action.payload[0].id) {
                  todo.complete = !todo.complete;
                  if (!todo.complete) {
                    state.week[i].tasks[action.payload[2] - 1].complete =
                      !state.week[i].tasks[action.payload[2] - 1].complete;
                  }
                }
                if (!todo.complete) {
                  allCompleted = false;
                }
              }
            );
            if (allCompleted) {
              state.week[i].tasks[action.payload[2] - 1].complete =
                !state.week[i].tasks[action.payload[2] - 1].complete;
            }
          }
        }
      } else {
        state.week.map((day) => {
          if (day.dayOfWeek === action.payload.day) {
            day.tasks.map((task) => {
              if (task.id === action.payload.id) {
                task.complete = !task.complete;
              }
            });
          }
        });
      }
    },
    deleteTask: (state, action) => {
      if (action.payload[1] === "inner") {
        for (let i = 0; i < state.week.length; i++) {
          if (state.week[i].dayOfWeek === action.payload[0].day) {
            state.week[i].tasks[action.payload[2] - 1].todos = state.week[
              i
            ].tasks[action.payload[2] - 1].todos.filter(
              (task) => task.id !== action.payload[0].id
            );
          }
        }
      } else {
        state.week = state.week.map((day) => {
          if (day.dayOfWeek === action.payload.day) {
            day.tasks = day.tasks.filter(
              (task) => task.id !== action.payload.id
            );
          }
          return day;
        });
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask } = taskModel.actions;
