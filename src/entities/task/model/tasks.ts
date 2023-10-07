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
                  todo: action.payload[2],
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
      let allCompleted = false;
      if (action.payload[1] === "inner") {
        console.log(action.payload);
        state.week.map((day) => {
          if (day.dayOfWeek === action.payload[0].day) {
            day.tasks[action.payload[2]].todos[action.payload[3]].complete =
              !day.tasks[action.payload[2]].todos[action.payload[3]].complete;

            const todos = day.tasks[action.payload[2]].todos;

            for (let i = 0; i < todos.length; i++) {
              const todo = todos[i];
              if (todo.complete === false) {
                allCompleted = false;
                console.log("in loop", allCompleted);
                day.tasks[action.payload[2]].complete = false;
                return;
              }
            }

            allCompleted = true;
            console.log("after loop", allCompleted);

            day.tasks[action.payload[2]].complete = true;
          }
        });
      } else {
        state.week.map((day) => {
          if (day.dayOfWeek === action.payload.day) {
            day.tasks.map((task) => {
              if (task.id === action.payload.id) {
                task.complete = !task.complete;
                if (task.todos) {
                  task.todos.map((todo) => {
                    if (task.complete) {
                      todo.complete = true;
                    } else if (!task.complete) {
                      todo.complete = false;
                    }
                  });
                }
              }
            });
          }
        });
      }
    },
    deleteTask: (state, action) => {
      if (action.payload[1] === "inner") {
        console.log(action.payload);
        for (let i = 0; i < state.week.length; i++) {
          if (state.week[i].dayOfWeek === action.payload[0].day) {
            state.week[i].tasks[action.payload[2]].todos = state.week[i].tasks[
              action.payload[2]
            ].todos.filter((todo, index) => index !== action.payload[3]);
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
