import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "../Homepage/Homepage.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import AddTask from "../../Components/AddTaskPopups/AddTaskPopups";
import { AppContext } from "../../Context/AppContext";
import EachTask from "../../Components/EachTask/EachTask";

const Homepage = () => {
  const [openAddTaskPopup, setOpenAddTaskPopup] = useState(false);
  const {getAllTaskData,productdata} = useContext(AppContext)

  const handleOpenAddTask = () => {
    setOpenAddTaskPopup(true); 
  };

  const handleCloseAddTaskPopup = () => {
    setOpenAddTaskPopup(false);
  };

  useEffect(()=>{
    getAllTaskData()
  },[])
  return (
    <>
      <Navbar />
      <Button className={styles.addtaskbtn} onClick={handleOpenAddTask}>
        Add Task
      </Button>
      <AddTask open={openAddTaskPopup} handleClose={handleCloseAddTaskPopup} />
   <Box className={styles.taskDatas}>
   {productdata?.map((el,i)=>{
                   return <EachTask element={el} key={i} />
               })}
   </Box>
    </>
  );
};

export default Homepage;
