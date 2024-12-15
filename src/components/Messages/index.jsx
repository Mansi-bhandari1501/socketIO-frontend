import React, { useEffect, useState } from "react";
import Header from "../Header";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as Edit } from "../../utils/edIT.svg";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import SearchIcon from "@mui/icons-material/SearchRounded";
import MainFooter from "../MainFooter";

import TuneIcon from "@mui/icons-material/Tune";

import UserMesssageCard from "./userMesssageCard";
import OtherMessage from "./otherMessage";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/chat/chatAction";
import MessageTab from "./messageTab";

const MessageComponent = (socket) => {
  const [type, setType] = useState(true);
  const [istrue, setIsTrue] = useState(false);
  const [messages, setMessages] = useState({});
  const [toggle, setToggle] = useState(false)
  const [recievedData, setRecievedData] = useState({
    chatId: "",
    chatName: ""
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logId = user.userInfo._id

  const chats = useSelector((state) => state.chats);
  console.log(chats)

  useEffect(() => {
    const token = user.userToken;
    dispatch(fetchChats({ logId, token }));
    setMessages(chats);
  }, [dispatch]);

  // console.log(messages)

  const handleChats = (chatId, chatName) => {
    setRecievedData({ chatId: chatId, chatName: chatName });
    console.log(recievedData)
    setIsTrue(true);
    setToggle(!toggle)
  }
  // console.log(istrue)
  // console.log(recievedData)
  return (
    // <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
    //   {connections?.map((content) => {
    <Box
      sx={{ backgroundColor: "#F4F2EE", height: "100vh", marginTop: "10px" }}
    >
      <Box className="home-nav">
        <Header />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          height: "90vh",
        }}
      >
        {/* <Stack sx={{height:"500px"}} flexDirection={"row"} justifyContent={'space-around'}>   */}

        <Stack
          sx={{
            width: "42vw",
            border: "1px solid #DFDEDA",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "",
              borderRadius: "10px",
              // border:"1px solid grey"
            }}
          >
            <Box sx={{ width: "40%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px",
                }}
              >
                <Box>Messaging</Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <MoreHorizIcon />
                  </Box>
                  <Box>
                    {/* <EditCalendarIcon /> */}
                    <Edit style={{ height: "30px", width: "22px" }} />
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  width: "20vw",
                  marginTop: "4px",
                }}
              >
                <TextField
                  className="search-bar"
                  sx={{
                    Width: "400px",
                    height: "35px",
                    paddingLeft: "12px",
                    marginTop: "5px",
                    // backgroundColor:"#EDF3F8",
                    "& .MuiOutlinedInput-root": {
                      height: "28px",
                      width: "15vw",
                      backgroundColor: "#EDF3F8",
                    },
                    "&.MuiInputBase-input-MuiOutlinedInput-input": {
                      padding: "10px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "black", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <TuneIcon style={{ color: "black", zIndex: "3" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => {
                    setType(true);
                  }}
                >
                  Focused
                </Button>
                <Button
                  onClick={() => {
                    setType(false);
                  }}
                >
                  Other
                </Button>
              </Box>

              <Divider />
              <Box sx={{ height: "10vh" }}>{type ? <Box sx={{ overflowY: "auto", height: "75vh" }}>
                <UserMesssageCard
                  chats={chats}
                  handleChats={handleChats} />
              </Box>
                :
                <OtherMessage />}
              </Box>
            </Box>
            <hr
              style={{
                marginTop: "2px",
                height: "89vh",
                color: "#DFDEDA",
                width: "",
              }}
            />
            {/* <Divider sx={{height:"500px",color:'black'}}/> */}
            {istrue ?
              <MessageTab
                toggle={toggle}
                socket={socket}
                receivedData={recievedData}
              />
              :
              <>start Messaging</>
            }

          </Box>
        </Stack>
        <Stack
          sx={{
            width: "15vw",

            borderRadius: "10px",
          }}
        >
          <Box sx={{ marginTop: "8px", marginBottom: "18px" }}>
            <MainFooter />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default MessageComponent;
