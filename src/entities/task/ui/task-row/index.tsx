import { useSelector } from "react-redux";
import { TaskCard } from "../task-card";

export const TaskRow = () => {
  const data = useSelector((state) => state.tasks.week);
  return (
    <div className="taskrow">
      {data.map((day) => {
        return (
          <div className="taskrow__daylist" key={day.dayOfWeek}>
            <h2>{day.dayOfWeek}</h2>
            {day.tasks.map((task, i) => {
              return (
                <TaskCard
                  task={task.todo}
                  id={task.id}
                  day={task.day}
                  complete={task.complete}
                  todos={task.todos}
						index={i}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
