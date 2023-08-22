import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../../entities/task/model/tasks";

type Inputs = {};

export const Form = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(addTask(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("task")} />
      <input type="number" {...register("day")} />
      <input type="submit" />
    </form>
  );
};
