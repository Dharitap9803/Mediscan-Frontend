import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.avif";
import Button from "@mui/material/Button";
import { MdOutlineMenu } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import UserImage from "../../assets/images/userimage.avif";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MyContext } from "../../App";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { user, logoutUser } = useContext(UserContext);
  const { values } = useContext(MyContext);
  const context = values;

  const handleToggleMenu = (event) => {
    if (anchorEl) {
      handleCloseMyAccDrop();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          <div className="col-sm-2 part1">
            <Link to={"/"} className="d-flex align-items-center logo">
              <img src={logo} alt="logo" />
              <span className="ml-2">MEDISCAN</span>
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part2 pl-4">
            {user && (
              <Button
                className="rounded-circle mr-3"
                onClick={() =>
                  context.setIsToggleSidebar(!context.isToggleSidebar)
                }
              >
                {context.isToggleSidebar ? <MdOutlineMenu /> : <MdMenuOpen />}
              </Button>
            )}
            <SearchBox />
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Button
              className="rounded-circle mr-3"
              onClick={() => context.setthemeMode(!context.themeMode)}
            >
              {context.themeMode ? <MdDarkMode /> : <MdLightMode />}
            </Button>
            
            {user ? (
              <>
                <Button className="rounded-circle mr-3">
                  <MdOutlineEmail />
                </Button>
                <Button className="rounded-circle mr-3">
                  <IoIosNotifications />
                </Button>
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleToggleMenu}
                >
                  <div className="userInfo flex items-center gap-2">
                    <Avatar /> <h4>{user.name}</h4>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* <MenuItem onClick={() => navigate("/profile")}>
                    <Avatar className="mr-2" /> Profile
                  </MenuItem> */}
                  {/* <MenuItem onClick={() => navigate("/settings")}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem> */}
                  <Divider />
                  <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleLoginClick}
                className="login-btn"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;