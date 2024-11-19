import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

const init = {
  title: "",
  description: "",
  taskdetails: "",
};

const EditTaskPopup = ({ open, handleClose }) => {
  const { editData, updateBtnLoading ,handleUpdateTask,getAllTaskData} = useContext(AppContext);
  const [formData, setFormData] = useState({ ...editData });

  useEffect(() => {
    if (editData) {
      setFormData({ ...editData });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  console.log("editData", editData);

const handleUpdate=async(id)=>{
try{
  let payload={
    title:formData.title,
    description:formData.description,
    taskdetails:formData.taskdetails
  }
  let res=await handleUpdateTask(id,payload)
  alert("Task Updated Successfully")
  await getAllTaskData()
  handleClose()
}catch(err){
  alert("Failed to Update The Data")
}
}

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>EDIT TASK</DialogTitle>
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
          value={formData.title}
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
          value={formData.description}
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
          value={formData.taskdetails}
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        {updateBtnLoading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              handleUpdate(editData._id)
            }}
          >
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskPopup;
