import { Box, Typography, Button, Divider, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createConnections, fetchReceivedConnection } from "../../features/connection/connectionAction";
import DefaultImage from "../../assets/default-image.jpg";
import { useEffect, useState } from "react";
import { fetchLoggedInUserDetail, fetchUsers } from "../../features/user/userAction";

const SuggestedUsers = () => {
  const suggestedUsers = useSelector((state) => state?.user?.users);
  console.log('suggestedUsers: ', suggestedUsers);
  const token = useSelector((state) => state?.user?.userToken);
  const userId = useSelector((state) => state?.user?.userInfo?._id);
  console.log('userId: ', userId);
  const dispatch = useDispatch();
  const userDetails= useSelector((state) => state.user?.userDetails);
  console.log('userDetails: ', userDetails);
  const[reload, setReload] = useState(false);
  const handleConnect = (userId) => {
    setReload(!reload);
    dispatch(createConnections({ userId, token }));
  };
  useEffect(() => {
    dispatch(fetchUsers({token }));
    dispatch(fetchReceivedConnection(token));
    dispatch(fetchLoggedInUserDetail({userId,token}));
  }, [dispatch, token, userId, reload]);

  // const followingIds = userDetails?.connections?.map((follow) => follow) || [];
  const followingIds = userDetails?.connections
  ?.flatMap((connection) => 
    connection?.following
      // ?.filter((follow) => follow?.status !== "pending") // Exclude pending connections
      ?.map((follow) => follow?.userid?._id) // Extract user IDs
  ) || [];

  const filteredSuggestedUsers = suggestedUsers?.filter((user) => {
    return !followingIds.includes(user._id);
  });
  console.log('followingIds: ', followingIds);
  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" color="textSecondary" fontWeight="bold">
          Suggested for you
        </Typography>
        {/* <Button size="small" color="primary">
          See All
        </Button> */}
      </Box>
      {filteredSuggestedUsers?.length > 0 ? (
        filteredSuggestedUsers?.map((user) => (
          <Box key={user._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link to={`/profile/${user._id}`}>
                <Avatar src={`http://localhost:8080/${user?.profileImage}` || DefaultImage} alt={user.username} sx={{ width: 56, height: 56 }}>
                </Avatar>
              </Link>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {user.username}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.headline || "Bio here..."}
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={() => handleConnect(user._id)}
              size="small"
              color="primary"
              sx={{ fontWeight: "bold", ":hover": { color: "#3495d6" } }}
            >
              Follow
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No suggested users at the moment.
        </Typography>
      )}
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default SuggestedUsers;
