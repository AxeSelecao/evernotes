import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {};

export const Form = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("task")} />
      <input type="submit" />
    </form>
  );
};
