import React, { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTask}>Add</button>

      {}
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet.</p>
      )}
    </div>
  );
};

export default App;
