import "./assets/styles/style.scss";
import { Form } from "../widgets/form/ui";
import { TaskRow } from "../entities/task/ui/task-row";

function App() {
  return (
    <div className="app">
      <TaskRow />
      <Form />
    </div>
  );
}

export default App;
