import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = tasks.slice();
    updatedTasks[index] = { ...updatedTasks[index], text: editTask };
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.slice();
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={() => handleSaveTask(index)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <div className="button-container">
                  <button className="edit" onClick={() => handleEditTask(index)}>Edit</button>
                  <button className="complete" onClick={() => toggleComplete(index)}>
                    {task.completed ? 'Mark Undone' : 'Mark Done'}
                  </button>
                  <button className="delete" onClick={() => handleDeleteTask(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
