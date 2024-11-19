import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import { AppContext } from "../../Context/AppContext";

const Navbar = ({placeofcall}) => {
  const {setIsLoggedIn,isLoggedIn}=useContext(AppContext)
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/login");
  };
  return (
    <>
      <Box className={styles.navbar}>
      <Link to="/">
          <img
            className={styles.vooshLogo}
            src="https://bookface-images.s3.amazonaws.com/logos/545e403209c1c7a3d7a847b1eafd0a622c4554e6.png?1607888997"
            alt="Voosh Logo"
          />
        </Link>
        
        <Box className={styles.btnbox}>
       
         { !isLoggedIn && <Button className={styles.loginbtn} component={Link} to="/login">
            Login
          </Button>}
         {!isLoggedIn && <Button className={styles.signupbtn} component={Link} to="/signup">
            Signup
          </Button>}

          {isLoggedIn && (
         <Button onClick={handleLogout} variant="contained">
           Logout
         </Button>
       )}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
