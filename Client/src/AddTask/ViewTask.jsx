import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditTask from '../EditTask/Edit';
import Editicon from "../assets/Edit.svg";
import Deleteicon from "../assets/delete.svg"
import {TaskForm} from "../AddTask/TaskForm"

export const ViewTask = () => {
  const [Data, setData] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/viewtask")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  }, [Data]);

  const handleEdit = (id) => {
    setEditingTaskId(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/deletetask/${id}`)
      .then(() => {
        setData(Data.filter(task => task._id !== id));
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  };

  const closeEdit = () => {
    setEditingTaskId(null);
  };

  const updateTasks = () => {
    axios.get("http://localhost:8000/viewtask")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  };
  const [BST, setBST] = useState(false);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">View Tasks</h1>
      <button
            onClick={() => setBST(!BST)}
            className="btn btn-outline-primary btn-sm ml-2"
            style={{ marginLeft: '15px' }}
          >
            {BST ? 'Close' : 'Add Task'}
          </button>
          {BST && <TaskForm />}
      {Data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((task) => (
                <tr key={task._id}>
                  <td>{task.TaskName}</td>
                  <td>{task.Desc}</td>
                  <td>{task.Status ? 'Completed' : 'Pending'}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleEdit(task._id)}
                    >
                      <img src={Editicon} alt="" srcSet="" />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      <img src={Deleteicon} alt="" srcSet="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tasks available.</p>
      )}

      {editingTaskId && (
        <EditTask
          taskId={editingTaskId}
          onClose={closeEdit}
          onUpdate={updateTasks}
        />
      )}
    </div>
  );
};
