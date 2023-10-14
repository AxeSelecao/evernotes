import { createSlice } from "@reduxjs/toolkit";

type TodosItem = {
  complete: boolean;
  day: string;
  id: number;
  todo: string;
};

type TasksItem = {
  complete: boolean;
  day: string;
  id: number;
  index: number;
  task: string;
  todos: TodosItem[];
};

type WeekItem = {
  dayOfWeek: string;
  tasks: TasksItem[];
};

type State = {
  week: WeekItem[];
};

export const initialState: State = {
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
        state.week.map((day) => {
          if (day.dayOfWeek === action.payload[0].day) {
            day.tasks[action.payload[2]].todos[action.payload[3]].complete =
              !day.tasks[action.payload[2]].todos[action.payload[3]].complete;

            const todos = day.tasks[action.payload[2]].todos;

            for (let i = 0; i < todos.length; i++) {
              const todo = todos[i];
              if (todo.complete === false) {
                allCompleted = false;
                day.tasks[action.payload[2]].complete = false;
                return;
              }
            }

            allCompleted = true;

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
        for (let i = 0; i < state.week.length; i++) {
          if (state.week[i].dayOfWeek === action.payload[0].day) {
            console.log(action.payload);
            state.week[i].tasks[action.payload[2]].todos = state.week[i].tasks[
              action.payload[2]
            ].todos.filter((_, index) => index !== action.payload[3]);

            state.week[i].tasks[action.payload[2]].todos.map((todo) => {
              if (!todo.complete) {
                return;
              }
            });

            state.week[i].tasks[action.payload[2]].complete =
              !state.week[i].tasks[action.payload[2]].complete;
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
