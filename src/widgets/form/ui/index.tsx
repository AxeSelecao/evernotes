import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../../entities/task/model/tasks";

type Inputs = {
  todo: string;
  day: string;
};

export const Form = () => {
  const { register, handleSubmit, resetField } = useForm<Inputs>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.todo.length > 0) {
      dispatch(addTask(data));
      resetField("todo");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__input">
        <input {...register("todo")} type="text" placeholder="Type a task..." />
        <select {...register("day")}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <input type="submit" value="Add task" />
      </div>
    </form>
  );
};
