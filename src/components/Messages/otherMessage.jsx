import React from "react";
import { ReactComponent as Image } from "../../utils/otherpage.svg";
import { Box, Button, Stack, Typography } from "@mui/material";

const OtherMessage = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5vh",
          gap:"10px"
        }}
      >
        <Stack sx={{ justifyContent: "center" }}>
          <Image style={{ height: "130px", width: "130px" }} />
        </Stack>
        <Stack
          sx={{
            // justify-content: center;
            flexDirection: "column",
            alignItems: "center",
            gap:"10px"
          }}
        >
          <Typography sx={{fontSize:"24px",fontFamily:"system-ui",fontWeight:"400"}}>No messages yet</Typography>
          <Typography sx={{fontSize:"16px",fontFamily:"system-ui",fontWeight:"400"}}>
            Reach out and start a conversation to 
            <Typography sx={{marginLeft:"4vw"}}>advance your career</Typography>
          </Typography>
        </Stack>
        <Box>
          <Button sx={{color:"grey", border:"1px solid black",borderRadius:"25px",textTransform:"none"}}>Send a message</Button>
        </Box>
      </Box>
    </div>
  );
};

export default OtherMessage;
