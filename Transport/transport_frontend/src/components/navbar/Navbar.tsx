import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import "./navbar.css";
import truckLogo from "../../assets/images/truckLogo.jpg";
import { logoutUser } from "../../config/config";
import { AppContext } from "../../context/AppContext";

export function Navbar() {
  const { auth } = useContext(AppContext);

  const logoutUserHandler = async () => {
    let user = await logoutUser();
    console.log("logout", user);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={truckLogo} alt="Logo" style={{height:"70px"}}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/about">About Us</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/services">Services</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/products">Products</Link>
            </Typography>
            <Link to="/signup">
              <Button color="inherit">Sign Up</Button>
            </Link>
            {!auth ? (
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            ) : (
              <Button color="inherit" onClick={logoutUserHandler}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
