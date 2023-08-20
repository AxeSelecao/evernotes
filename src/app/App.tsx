import { useState } from "react";
import './styles/style.scss'
import { Card } from "../entities/task/ui/task-card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>hello</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>click</button>
		<Card />
    </div>
  );
}

export default App;
