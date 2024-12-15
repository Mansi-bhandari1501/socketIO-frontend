import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { acceptConnection, rejectConnection } from '../../features/connection/connectionAction';
import Profile from "../../assets/profile.png"
const InvitationCard = ({content}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const token = user.userToken;
  const receiverId = user.userId;

  const handleConnect = (i) => {
    dispatch(acceptConnection({ userId: i, token }))
  }
  const handleIgnore =(i) =>{
   dispatch (rejectConnection({userId: i,token}))
 }
  return (
   <>
   <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center",height:"70px"}}>
        <Box sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
        <Box>
          <Avatar src={Profile} sx={{height:'60px',width:"60px"}}/>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",}}>
                    <Typography  sx={{fontFamily:"system-ui",fontSize:"15px"}}>

                  {content?.sender?.firstName } {content?.sender?.lasName }
                    </Typography>
                    <Typography sx={{fontFamily:"system-ui",fontSize:"12px"}}>
                   
                  {content?.sender?.city }
                    </Typography>
                  </Box>
        </Box>
        <Box>
          <Button onClick={() => handleIgnore(content?.sender?._id)}>Ignore</Button>
          <Button onClick={() => handleConnect(content?.sender?._id)} sx={{border:"1px solid #0B66C2", borderRadius:"20px"}}>Accept</Button>
        </Box>
    </Box>
<Divider/>
   </>
  )
}

export default InvitationCard;