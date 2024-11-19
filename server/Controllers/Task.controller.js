const { taskModel } = require("../Models/Task.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create a new task
const createTask = async (req, res) => {
  const payload = req.body;
  try {
    if (
      !payload.title ||
      !payload.description ||
      payload.description.length > 300
    ) {
      return res.status(400).json({ msg: "Invalid content" });
    }

    const newTask = new taskModel({
      ...payload,
      userID: req.user.userId,
    });

    await newTask.save();
    res.status(200).json({ msg: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
  
//update the task
const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log('Incoming request body:', req.body);
  
  const { title, description, taskdetails } = req.body;
  try {
    if (!title || !description || !taskdetails) {
      return res.status(400).send({ msg: "All fields are required" });
    }

    const task = await taskModel.findByIdAndUpdate(
      id,
      { title, description, taskdetails, updated_at: Date.now() },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task updated successfully", task });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
};

// Delete a task by id
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Deleted task successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ msg: "All tasks", data: tasks });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
const handleUpdateStatus=async(req,res)=>{
  const { id } = req.params;
  const {status} = req.body;
  try {
    const task = await taskModel.findByIdAndUpdate(
      id,
      {status, updated_at: Date.now() }
    );

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task updated successfully", task });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }

}
module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  handleUpdateStatus
};
