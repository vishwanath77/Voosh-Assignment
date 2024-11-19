import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [homepageDataloading, sethomepageDataloading] = useState(false);
  const [loginBtnLoading, setloginBtnLoading] = useState(false);
  const [signupBtnLoading, setsignupBtnLoading] = useState(false);
  const [deleteBtnLoading, setdeleteBtnLoading] = useState(false);
  const [productdata, setproductdata] = useState([]);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddsignup = async (signupdata) => {
    try {
      setsignupBtnLoading(true);
      const { FirstName, LastName, Email, Password } = signupdata;
      const response = await fetch("http://localhost:7500/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${FirstName} ${LastName}`,
          email: Email,
          password: Password,
        }),
      });
      const data = await response.json();
      setsignupBtnLoading(false);
      return data;
    } catch (err) {
      console.log("error", err);
      setsignupBtnLoading(false);
      return { error: err.message };
    }
  };

  const handlelogin = async (payload) => {
    try {
      setloginBtnLoading(true);
      const response = await fetch("http://localhost:7500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setloginBtnLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      console.log("error", err);
      setloginBtnLoading(false);
      return { error: err.message };
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setdeleteBtnLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:7500/deletetask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setdeleteBtnLoading(false);
      return data;
    } catch (err) {
      console.log("error", err);
      setdeleteBtnLoading(false);
      return { error: err.message };
    }
  };

  const handleUpdateTask = async (id, body) => {
    try {
      setUpdateBtnLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:7500/updatetask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setUpdateBtnLoading(false);
      return data;
    } catch (err) {
      console.log("error", err);
      setUpdateBtnLoading(false);
      return { error: err.message };
    }
  };

  const getAllTaskData = async () => {
    try {
      sethomepageDataloading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:7500/alltask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log(data)
      setproductdata(data.data);
      sethomepageDataloading(false);
    } catch (err) {
      console.log("error", err);
      sethomepageDataloading(false);
    }
  };

  const handleAddTask = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:7500/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      // console.log(data);
      return data.status;
    } catch (err) {
      console.log("FAILED TO ADD THE PRODUCT ", err);
      return err.status ? err.status : 500;
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      let payload = {
        status: status,
      };
      let updateResponse = await fetch(
        "http://localhost:7500/updateTaskStatus/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (updateResponse) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setproductdata((prevData) =>
      [...prevData].sort((a, b) =>
        order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
    );
  };

  const filteredTasks = productdata.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );

  return (
    <AppContext.Provider
      value={{
        handlelogin,
        getAllTaskData,
        handleDeleteTask,
        homepageDataloading,
        handleAddsignup,
        productdata,
        setproductdata,
        loginBtnLoading,
        signupBtnLoading,
        deleteBtnLoading,
        handleAddTask,
        isLoggedIn,
        setIsLoggedIn,
        editData,
        setEditData,
        handleUpdateTask,
        updateBtnLoading,
        setUpdateBtnLoading,
        handleSearch,
        handleSort,
        handleUpdateStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
