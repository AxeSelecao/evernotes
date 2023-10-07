import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { addTask, toggleTask, deleteTask } from "../../model/tasks";

type Props = {
  id: number;
  task: string;
  day: string;
  complete: boolean;
  todos: string[];
  index: number;
};

type Inputs = {};

export const TaskCard = (props: Props) => {
  const { register, handleSubmit, resetField } = useForm();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(addTask([props, "inner", data.innerTodo]));

    resetField<string>("innerTodo");
  };

  return (
    <div>
      <div className="taskrow__daylist-task">
        <div>
          {/*<span
            className="pointer"
            style={{ marginRight: 15 }}
            onClick={() => {
              //  dispatch(addTask([props, "inner"]));
            }}
          >
            +
          </span>*/}
          <input
            type="checkbox"
            checked={props.complete}
            onChange={() => {
              dispatch(
                toggleTask({
                  id: props.id,
                  day: props.day,
                  complete: !props.complete,
                })
              );
            }}
          />
        </div>
        <p style={{ textDecoration: props.complete ? "line-through" : "none" }}>
          {props.task}
        </p>
        <svg
          onClick={() => dispatch(deleteTask(props))}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash pointer"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />{" "}
        </svg>
      </div>
      <form
        className="innerform"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex" }}
      >
        <input
          {...register("innerTodo")}
          type="text"
          placeholder="Type a task..."
          style={{
            background: "rgba(0, 0, 0)",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="submit"
          value="Add task"
          style={{
            background: "rgba(0, 0, 0)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            outline: "none",
            cursor: "pointer",
            padding: "5px",
          }}
        />
      </form>
      <div className="taskrow__innertaskslist">
        {props.todos.map((item, index) => {
          return (
            <div className="taskrow__daylist-task" style={{ margin: 0 }}>
              <input
                type="checkbox"
                checked={props.todos[index].complete}
                onChange={() => {
                  dispatch(
                    toggleTask([
                      props.todos[index],
                      "inner",
                      props.index,
                      index,
                    ])
                  );
                }}
              />
              <p
                style={{
                  textDecoration: props.todos[index].complete
                    ? "line-through"
                    : "none",
                }}
              >
                {item.todo}
              </p>
              <svg
                onClick={() =>
                  dispatch(
                    deleteTask([
                      props.todos[index],
                      "inner",
                      props.index,
                      index,
                    ])
                  )
                }
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash pointer"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />{" "}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
