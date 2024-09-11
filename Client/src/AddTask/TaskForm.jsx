import React, { useState } from 'react';
import axios from 'axios';

export const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState(''); // Add feedback state

  const handleSubmit = (e) => {
    e.preventDefault();
   

    axios.post('http://localhost:8000/addtask', {taskName,date,isCompleted,description})
      .then(() => {
        setFeedback('Task added successfully!');
        // Optionally clear form fields
        setTaskName('');
        setDate('');
        setIsCompleted(false);
        setDescription('');
      })
      .catch((error) => {
        console.error('Error posting data:', error);
        setFeedback('Error adding task.');
      });
      
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="isCompleted"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <label className="form-check-label" htmlFor="isCompleted">Is Completed</label>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Enter task description"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {feedback && <div className="mt-3">{feedback}</div>} {/* Display feedback */}
    </div>
  );
};
