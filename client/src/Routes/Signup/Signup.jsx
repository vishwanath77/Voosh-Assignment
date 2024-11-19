import React, { useContext, useState } from "react";
import styles from "../Signup/Signup.module.css";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Signup = () => {
  const navigate = useNavigate();
  const initial = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: ""
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const { handleAddsignup, signupBtnLoading } = useContext(AppContext);

  const [signupData, setSignupData] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <Typography className={styles.loginText}>Signup</Typography>
      <Box className={styles.loginbox}>
        <TextField
          label="First Name"
          placeholder="Enter First Name"
          variant="outlined"
          name="FirstName"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          placeholder="Enter Last Name"
          variant="outlined"
          name="LastName"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="Email"
          placeholder="Enter Email"
          variant="outlined"
          name="Email"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          variant="outlined"
          name="Password"
          type="password"
          fullWidth
          onChange={handleChange}
        />
        {signupBtnLoading ? (
          <CircularProgress />
        ) : (
          <Button
            className={styles.loginbutton}
            onClick={async () => {
              if (
                signupData.FirstName &&
                signupData.LastName &&
                signupData.Email &&
                signupData.Password
              ) {
                let res = await handleAddsignup(signupData);
                if (res.status) {
                  alert(res.msg);
                  navigate("/login");
                } else {
                  alert(res.msg);
                }
              } else {
                alert("Please fill all fields!");
              }
            }}
          >
            Signup
          </Button>
        )}
        <Typography variant="body1">
          Already have an account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={handleLoginClick}>Login</span>
        </Typography>
        <Button className={styles.loginGoogle}>Signup With Google</Button>
      </Box>
    </>
  );
};

export default Signup;


