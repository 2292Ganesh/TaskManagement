const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TM = require('./Model/TM.model'); // Adjust path if necessary

app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect('mongodb+srv://ganesh:ganesh2002@taskmanagement.cyoph.mongodb.net/task?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
.then(() => console.log('Database Connected!'))
.catch(err => console.error('Error connecting to database:', err));


// Route to add a task
app.post('/addtask', (req, res) => {
    const {taskName,date,isCompleted,description} = req.body; // Directly use req.body
   console.log(req.body);
   
    
  
    TM.create({TaskName:taskName,Date:date,Status:isCompleted,Desc:description})
      .then(() => res.send('Your Task Added!'))
      .catch(err => {
        console.error('Error adding task:', err);
        res.status(500).send('Error adding task.');
      });
  });
  

  // Route For Get Task
  app.get("/viewtask", (req, res) => {
    TM.find({})
      .then((data) => res.send(data))
      .catch((e) => {
        console.log("Error", e);
        res.status(500).send('Error fetching tasks.');
      });
  });

  // Update task endpoint
app.put('/updatetask/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TM.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete task endpoint
app.delete('/deletetask/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TM.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
