import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { addChats } from "../../features/chat/chatAction";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";


const MyConnectionCard = (content) => {
 const dispatch = useDispatch()
  console.log(content.content._id) 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user);
  const logId = user.userInfo._id
  console.log(logId)
  // const chats = useSelector((state)=>state)
  // console.log(chats)

  const userId =content.content._id
  console.log(userId)
  const handleMessage=()=>{
    const token = user.userToken;
    dispatch(addChats({userId,logId,token}));
    navigate(location.state || "/message");
    
  }

  return (
    <>
      <Box
      key={content.content._id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap:"10px"}}>
            <Avatar src={Profile} sx={{ height: "60px", width: "60px" }} />
            <Box>

            <Typography sx={{fontFamily:"system-ui",fontSize:"15px"}}>
            {content.content.sender.firstName} {content.content.sender.lasName}
            </Typography>
            <Typography sx={{fontFamily:"system-ui",fontSize:"12px"}}>
            {content.content.sender.city}
            </Typography>
            </Box>
          </Box>
          <Box>
            </Box>
        </Box>
        <Box>
          <Button onClick={handleMessage} sx={{ border: "1px solid #0B66C2", borderRadius: "20px" }}>
            message
          </Button>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{width:"300px" }}
          >
            
              <MenuItem
                aria-label="Remove Connection"
                onClick={handleClose}
              >
                <><DeleteIcon/>Remove Connection </>
              </MenuItem>
          
          </Menu>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default MyConnectionCard;
