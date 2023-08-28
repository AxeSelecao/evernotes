import { useSelector } from "react-redux";

export const TaskRow = () => {
  const data = useSelector((state) => state.tasks.week);
  console.log(data);
  return (
    <div className="taskrow">
      {data.map((day) => {
        return (
          <div key={day.dayOfWeek}>
            <h2>{day.dayOfWeek}</h2>
            {day.tasks.map((task) => {
              return <p key={task.id}>{task.task}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};
