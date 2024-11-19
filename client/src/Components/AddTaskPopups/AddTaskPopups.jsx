import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const init = {
  title: "",
  description: "",
  taskdetails: "",
};
const AddTask = ({ open, handleClose }) => {
  const [formData, setFormData] = useState(init);
  const navigate = useNavigate();
  const { handleAddTask, getAllTaskData } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmitForm = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      if (
        formData.title != "" &&
        formData.description != "" &&
        formData.taskdetails != ""
      ) {
        try{
        let res = await handleAddTask({...formData,status:'pending'}, token);
        console.log("response",res)
          alert("Item Added Successfully");
          await getAllTaskData();
          handleClose();
        } catch(err) {
          alert("Failed to add the product");
        }
      } else {
        alert("All fields are mandatory");
      }
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ADD TASK</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          name="title"
          onChange={(e) => handleChange(e)}
        />

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          onChange={(e) => handleChange(e)}
        />

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Details"
          type="text"
          fullWidth
          variant="outlined"
          name="taskdetails"
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitForm} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
