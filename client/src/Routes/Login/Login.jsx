import React, { useContext, useState } from "react";
import styles from "../Login/Login.module.css";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const initial = {
    email: "",
    password: "",
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const [loginData, setLoginData] = useState(initial);
  const { handlelogin, loginBtnLoading ,setIsLoggedIn} = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <Typography className={styles.loginText}>Login</Typography>
      <Box className={styles.loginbox}>
        <TextField
          label="Email"
          placeholder="Enter Email Here"
          variant="outlined"
          fullWidth
          name="email"
          onChange={handleChange}
        />

        <TextField
          label="Password"
          placeholder="Enter Password Here"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          onChange={handleChange}
        />

        {loginBtnLoading ? (
          <CircularProgress />
        ) : (
          <Button
            className={styles.loginbutton}
            onClick={async () => {
              if (loginData.email !== "" && loginData.password !== "") {
                let res = await handlelogin(loginData);
                if (res.status) {
                  alert(res.msg);
                 
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("user", JSON.stringify(res.user));
                  setIsLoggedIn(true)
                  navigate("/");
                } else {
                  alert(res.msg);
                }
              } else {
                alert("Please fill all fields!");
              }
            }}
          >
            Login
          </Button>
        )}
        <Typography variant="body1">
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </span>
        </Typography>
        <Button className={styles.loginGoogle}>Login With Google</Button>
      </Box>
    </>
  );
};

export default Login;
