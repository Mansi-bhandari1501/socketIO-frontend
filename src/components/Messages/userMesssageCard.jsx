import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import "./userMessageCard.css";
import Profile from "../../assets/profile.png";
// import { useSelector } from "react-redux";

const UserMesssageCard = (props) => {
  // const props = useSelector((state) => state.props.props);
  // console.log(props[0].updatedAt)
  // let updatedAt = props.chats.updatedAtt;
  // var date = new Date(updatedAt)
  // console.log(date)
  console.log(props)
  const chats = props.chats.chats;
  console.log(chats)
  // console.log(props.props)
  // const props = props.props
  // console.log(props.users)
  // const users = props.users;
  // console.log(users[0].firstName);
  // let updatedAt = props.props.updatedAt;
  // var date = new Date(updatedAt)
  return (
    <div>

      {chats && chats.length>0 && chats.map && chats?.map((content) => {
        return (

          <Box key={content._id}>

            {/* <Stack key={content._id} > */}
              <Stack key={content._id} onClick={() => props.handleChats(content._id,content.chatName)} sx={{ display:"flex",marginTop: "5px", flexDirection: "row", marginTop: "10px", height: "7vh" }}>
                <Avatar
                  aria-label="recipe"
                  src={Profile}
                  sx={{ height: "70px", width: "70px" }}
                ></Avatar>
                <Stack sx={{ flexDirection: "column", gap: "0px", width: "100%" }}>
                  <Stack sx={{ flexDirection: "row", justifyContent: "space-between",alignContent:"flex-start" }}>
                    <Typography
                      className="userName"
                      sx={{ fontSize: "16px", lineHeight: "20px" }}
                    >
                      {content._id}
                      {content?.users?.firstName} {content?.users?.lasName}
                      {/* {props} {props.users[1].lasName} */}
                      {/* {props.chatName} */}
                    </Typography>
                    <Typography
                      className="userName"
                      sx={{ fontSize: "12px", lineHeight: "20px", marginRight: "15px" }}
                    >
                      {/* {date.getDate() + " " + date.toLocaleString('default', { month: 'long' })  } */}
                    </Typography>
                  </Stack>
                  <Typography className="userName" sx={{ fontSize: "14px" }}>
                    message
                  </Typography>
                  {/* <Typography className="userName" sx={{ fontSize: "14px" }}>
                    {props.users[1].firstName} {props.users[1].lasName} */}

                  {/* </Typography> */}
                  <Divider sx={{ marginTop: "25px" }} />
                </Stack>
              {/* </Button> */}
            </Stack>
          </Box>
        )

      })}
    </div>

  );
};

export default UserMesssageCard;
