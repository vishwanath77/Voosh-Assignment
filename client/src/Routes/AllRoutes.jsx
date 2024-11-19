import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Todo from "./Todo/Todo";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoutes>
            <Homepage />
          </PrivateRoutes>
        }
      />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route
        path={"/todo"}
        element={
          <PrivateRoutes>
            <Todo />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
