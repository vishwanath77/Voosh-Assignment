const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  taskdetails: { type: String, required: true },
  userID:{ type: mongoose.Schema.Types.ObjectId,ref: "User"},
  status:{type:String}
    
});

const taskModel = mongoose.model('Task',taskSchema);

module.exports={
    taskModel
}