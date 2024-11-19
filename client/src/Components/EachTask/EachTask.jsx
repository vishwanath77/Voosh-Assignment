import { Box, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import styles from "../EachTask/EachTask.module.css"
import { AppContext } from '../../Context/AppContext'
import EditTaskPopup from '../EditiTaskPopup/EditTaskPopup'
const EachTask = ({element}) => {
  const{handleDeleteTask,getAllTaskData,setEditData} =useContext(AppContext)

  const handleDelete = async (id) => {
    try {
    let res = await handleDeleteTask(id);
    console.log('res is ',res)
      alert("Task deleted successfully");
     await getAllTaskData()
    } catch(err) {
      alert("Failed to delete the Data");
    }
  };
  const [openEditTaskPopup, setOpenEditTaskPopup] = useState(false);
  const handleOpenEditTask = () => {
      setEditData(element)
      setOpenEditTaskPopup(true); 
    };
  
    const handleCloseEditTaskPopup = () => {
      setOpenEditTaskPopup(false);
    };

  return (
    <>
    <Box className={styles.container}>
    <Box>Title:{element?. title} </Box>
    <Box>Desc: {element?. description}</Box>
    <Box>TaskDetails: {element?. taskdetails}</Box>
    
    <Box>
        <Button className={styles.deleteBtn}
        onClick={()=>{
          handleDelete(element._id)
        }}
        >Delete</Button>
        <Button className={styles.editBtn} onClick={handleOpenEditTask}>
          Edit
          </Button>
          <EditTaskPopup open={openEditTaskPopup} handleClose={handleCloseEditTaskPopup}/>
    </Box>

    </Box>
    </>
  )
}

export default EachTask