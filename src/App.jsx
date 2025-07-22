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
    const newTask = { text: input.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ marginTop: "1rem" }}>
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "white",
                marginRight: "1rem"
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
