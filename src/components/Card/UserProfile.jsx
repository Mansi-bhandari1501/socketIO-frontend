import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './UserProfile.module.css';
import CloseIcon from '@mui/icons-material/Close';
import Profile from '../../assets/default-image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail } from '../../features/user/userAction';

function UserProfile(props ) {
    const {handleClose , userId} = props;
    const {fetchUsersDetails} = useSelector((state) => state.user);
    console.log('fetchUsersDetails: ', fetchUsersDetails);
    const token = useSelector((state) => state.user.userToken);

    const user = fetchUsersDetails?.user || {};
    const posts = fetchUsersDetails?.posts || [];
    const connections = fetchUsersDetails?.connections || [];
    const dispatch = useDispatch();
    const postsCount = posts.length;
    const followersCount = connections.flatMap(connection => connection.followers)
      .filter(follower => follower.status === 'accepted').length;
  
    const followingCount = connections.flatMap(connection => connection.following)
      .filter(follow => follow.status === 'accepted').length;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    useEffect(()=>{
        dispatch(fetchUserDetail({userId,token}))
    },[dispatch,token])
    return (
        <Box className={styles.root} >
            <Box className={styles.Head}>
                <Typography className={styles.title}>Profile Details</Typography>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Stack direction={"row"} gap={6} p={3} width={"80%"}>
                <img src={Profile} alt="Profile" className={styles.profileImage} />
                <Stack gap={2} width={"50%"}>
                    <Stack direction={"row"}>
                        <Stack minWidth={"150px"}>
                            <Typography className={styles.heading}>Email</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.email}</Typography>
                        </Stack>
                        <Stack minWidth={"150px"}>
                        <Typography className={styles.heading}>Post</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{postsCount}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack gap={0} minWidth={"150px"}>
                            
                            <Typography className={styles.heading}>Follower</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{followersCount}</Typography>
                        </Stack>
                        <Stack minWidth={"150px"}>
                            {/* <Typography className={styles.heading}>Company</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.Company_detail?.name}</Typography> */}
                            <Typography className={styles.heading}>Following</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{followingCount}</Typography>
                        </Stack>
                    </Stack>
                    {/* <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack minWidth={"200px"}>
                            <Typography className={styles.heading}>Name</Typography>
                            <Typography sx={{ fontSize: '16px' }}>
                                {user?.name === null ? "-" : user?.name} {user?.last_name === null ? "-" : user?.last_name}
                            </Typography>
                        </Stack>
                        <Stack minWidth={"200px"}>
                            <Typography className={styles.heading}>Company</Typography>
                            <Typography sx={{ fontSize: '16px' }}>{user?.Company_detail?.name}</Typography>
                        </Stack>
                    </Stack> */}
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserProfile;
