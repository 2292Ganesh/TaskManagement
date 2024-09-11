import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Edit = ({ taskId, onClose, onUpdate }) => {
  const [task, setTask] = useState({
    TaskName: '',
    Desc: '',
    Status: false,
  });

  useEffect(() => {
    if (taskId) {
      axios.get(`http://localhost:8000/viewtask/${taskId}`)
        .then((res) => setTask(res.data))
        .catch((e) => console.log("Error fetching task:", e));
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/updatetask/${taskId}`, task)
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((e) => console.log("Error updating task:", e));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/deletetask/${taskId}`)
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((e) => console.log("Error deleting task:", e));
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button
              type="button"
              className="btn btn-danger" // Change to alert style
              onClick={onClose}
              style={{ marginLeft: 'auto' }} // Align to the right
            >
              Close
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="TaskName"
                  value={task.TaskName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea
                  className="form-control"
                  id="desc"
                  name="Desc"
                  value={task.Desc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="status"
                    name="Status"
                    checked={task.Status}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="status">Completed</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
