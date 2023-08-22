import { useState } from "react";
import "./assets/styles/style.scss";
import { TaskCard } from "../entities/task/ui/task-card";
import { Form } from "../widgets/form/ui";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <TaskCard />
      <Form />
    </div>
  );
}

export default App;
