const { Router } = require("express");
const { Signup, Login } = require("../Controllers/User.controller");
const authentication = require("../Middlewares/Authentication");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  handleUpdateStatus
} = require("../Controllers/Task.controller");

const AllRoutes = Router();

// User routes
AllRoutes.post("/signup", Signup);
AllRoutes.post("/login", Login);

//Task routes

AllRoutes.post("/addtask", authentication, createTask);
AllRoutes.put("/updatetask/:id", authentication, updateTask);
AllRoutes.delete("/deletetask/:id", authentication, deleteTask);
AllRoutes.get("/alltask", authentication, getAllTasks);
AllRoutes.patch("/updateTaskStatus/:id",authentication,handleUpdateStatus)


module.exports = AllRoutes;
