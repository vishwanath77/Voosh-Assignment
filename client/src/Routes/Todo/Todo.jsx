import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  Card,
} from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "../Todo/Todo.module.css";
import EachTask from "../../Components/EachTask/EachTask";
import { AppContext } from "../../Context/AppContext";
import Draggable from "react-draggable";
const Todo = () => {
  const { productdata, getAllTaskData, handleSearch, handleSort } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllTaskData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    handleSort(e.target.value);
  };
  const handleDrop=(e)=>{
    console.log(e)
  }

  return (
    <>
      <Box>
        <Navbar />

        <Box className={styles.conatiner}>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "300px" }}
            />
            <Button variant="contained" color="primary">
              Search
            </Button>

            <Typography variant="body1">Sort by</Typography>
            <Select
              variant="outlined"
              // defaultValue="asc"
              value={sortOrder}
              onChange={handleSortChange}
              style={{ width: "150px" }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box className={styles.todocontainer}>
          <Box className={styles.eachtodocontainer}>
            <Box className={styles.todotext}>Todo</Box>
            <Box className={styles.taskDatas}>
              {productdata?.map((el, i) => {
                if (el.status == "pending") {
                  return (
                    <Draggable onDrag={handleDrop} onStart={handleDrop}>
                      <Card  onDrop={handleDrop}>
                        <EachTask element={el} key={i} />
                      </Card>
                    </Draggable>
                  );
                }
              })}
            </Box>
          </Box>
          <Box className={styles.eachtodocontainer}>
            <Box className={styles.todotext}>In Progress</Box>
            <Box className={styles.taskDatas} onDrop={handleDrop}>
              {productdata?.map((el, i) => {
                if (el.status == "progress") {
                  return (
                    <Draggable>
                      <Card>
                        <EachTask element={el} key={i} />
                      </Card>
                    </Draggable>
                  );
                }
              })}
            </Box>
          </Box>
          <Box className={styles.eachtodocontainer}>
            <Box className={styles.todotext}>Done</Box>
            <Box className={styles.taskDatas}>
              {productdata?.map((el, i) => {
                if (el.status == "completed") {
                  return (
                    <Draggable>
                      <Card>
                        <EachTask element={el} key={i} />
                      </Card>
                    </Draggable>
                  );
                }
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Todo;
