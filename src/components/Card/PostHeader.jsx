import React from "react";
import { Avatar, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Profile from "../../assets/profile.png";

const PostHeader = ({ content, userId, anchorEl, setAnchorEl }) => {
  const handlePostOptionsClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action, id) => {
    handleCloseMenu();
  };

  return (
    <>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={Profile} sx={{ height: "50px", width: "50px" }} />}
        title={`${content?.userid?.username}` || undefined}
        subheader={`${new Date(content.createdAt).toLocaleDateString()}`}
      />
      <IconButton onClick={handlePostOptionsClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {userId === content?.userid?._id ? (
          <>
            <MenuItem onClick={() => handleMenuItemClick("Post-Edit", content?._id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Post-Delete", content?._id)}>Delete</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleMenuItemClick("Post-Report", content?._id)}>Report</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PostHeader;
