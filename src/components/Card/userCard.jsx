import { Avatar, Box, Button, Card, CardHeader, Typography } from "@mui/material";
import Bgimage from "../../assets/bg.png";
import Profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { createConnections } from "../../features/connection/connectionAction";
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';


export default function UserCard(content) {
  
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const senderId = user.userId;

  const token = user.userToken;

  const [response, setResponse] = useState(true)

  const handleConnect = (i) => {
    setResponse(!response);
    dispatch(createConnections({ senderId, receiverId: i, token }))
  }

  return (
    <Card sx={{ width: "10vw",marginTop:"10px",marginBottom:"10px", }}>
      <Box sx={{ position: "relative" }}>
        <img src={Bgimage} alt="logo " style={{ height: "80px" }} />
        {/* </Box> */}
        <CardHeader
          sx={{ display: "flex", flexDirection: "column" }}
          backgroundImage={<img src={Bgimage} alt="logo " />}
          avatar={
            <Avatar src={Profile} sx={{ height: "80px", width: "80px", position: "absolute", top: "30px", right: "50px" }} aria-label="recipe">
              {/* <img src={Profile} style={{objectFit:"scale-down"}}></img> */}
            </Avatar>
          }

          title={
            <Typography sx={{ position: "relative", top: "10px" }}>
              {content?.content?.firstName} {content?.content?.lasName}
            </Typography>
          }

          subheader={
            <Typography sx={{ position: "relative", top: "10px", fontSize: "12px", left: "2px" }}>

              {content?.content?.city}

              <Typography sx={{ fontSize: "12px", left: "2px" }}>

              </Typography>
            </Typography>
          }

        />
        <Button sx={{
          height: "30px",
          marginLeft: "50px", border: "1px solid #0B66C2", marginBottom: "15px", borderRadius: "20px"
        }}
          onClick={() => handleConnect(content?.content?._id)}
        >

          {response ? <> <PersonAddIcon sx={{ Color: "#0B66C2" }} /> Connect</> : <><HourglassTopIcon /> Pending</>}
        </Button>
      </Box>

    </Card>
  );
}
