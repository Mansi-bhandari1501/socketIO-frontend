import { Box, Button, Divider, Stack } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import Textarea from "@mui/joy/Textarea";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { fetchMessage } from '../../features/messages/messageAction';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import Profile from "../../assets/profile.png"
import { newMessage } from '../../features/messages/messageSlice';

const MessageTab = (props) => {
  const socket = useMemo(
    () =>
      io("http://localhost:8080", {
        withCredentials: true,
      }),
    []
  );

  const [socketConnected, setSocketConnected] = useState(false)
  const [message, setMessage] = useState([]);

  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null)
  const user = useSelector((state) => state.user);
  const senderId = user.userId;
  const token = user.userToken;
  const dispatch = useDispatch();

  const chatId = props.receivedData.chatId;
  const chatName = props.receivedData.chatName;
  useEffect(() => {
    dispatch(fetchMessage({ chatId, token }))
  }, [dispatch, props.toggle])

  const messages = useSelector((state) => state.messages.messages);
 console.log(messages)




  // useEffect(() => {
  //   scrollToBottom()
  // }, [messages]);

  // console.log(props.receivedData)

  // console.log("👍", messages)


  useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
    socket.on("welcome", (s) => {
      console.log(s);
    });
    console.log(chatId)
    socket.emit("join-room", chatId)
    socket.on("receive-message", (data) => {
      console.log(data.message)
      dispatch(newMessage(data.message))
    })
    // socket.on("connect", () => {
    //   setSocketConnected(true)
    //   console.log("connected", socket.id);
    // });

    // socket.on(chatId, (data) => {
    //   console.log(data);

    //   dispatch(newMessage(data))
    // })
    console.log(messages)
   

    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })

    return () => {
      socket.off('welcome')
      socket.off("connect")
      socket.off(chatId)
      // socket.disconnect();
    };

  }, [socketConnected]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content)
    socket.emit('message', { chatId, content, senderId })
    // setSocketConnected(!socketConnected)
    console.log(socketConnected)
    setContent("");
  };
  // console.log(content)

  return (
    <Box className="message tab" sx={{ width: "80%" }}>
      <Box >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Box>
            {/* {content?.sender.firstName} */}
            {chatName}
          </Box>
          <Box>
            <MoreHorizIcon />
            <StarBorderOutlinedIcon sx={{ marginLeft: "5px" }} />
          </Box>
        </Box>
        <Box sx={{ height: "65vh" }}>
          <Divider />
          <Stack>
            <Avatar src={Profile} sx={{ height: "100px", width: "100px", margin: "15px" }} ></Avatar>
          </Stack>
          <Divider />
          <Box sx={{ overflowY: "auto", height: "49vh", autoFocus: "true" }}>

            {messages && messages?.map((content, i) => {
              return (

                <Stack key={content._id}>
                  <Stack sx={{ flexDirection: "row", gap: "5px", marginTop: "15px", marginLeft: "8px" }}>

                    <Avatar sx={{ height: "60px", width: "60px" }} src={Profile}></Avatar>
                    <Stack sx={{ gap: "12px" }}>

                      <Typography sx={{ fontSize: "14px", fontFamily: "system-ui", fontWeight: 600, lineHeight: "20px", fontStyle: "normal", color: "rgba(0 0 0 0.9)" }}>
                        {content.sender?.email}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", fontFamily: "system-ui", fontWeight: 400, lineHeight: "20px", fontStyle: "normal", color: "rgba(0 0 0 0.9)" }}>

                        {content.content}
                      </Typography>
                    </Stack>
                  </Stack>


                </Stack>
              )
            })}
            <Box useRef={messagesEndRef} />
          </Box >
        </Box>
        <Box >
          <Divider />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={4}
            variant="soft"
            placeholder="write a message"
            sx={{
              width: "90%", overflow: "none", backgroundColor: "#F4F2EE", border: "none", margin: "10px"
            }}

          />
          {/* <TextField id="filled-basic" label="write a message" variant="filled"  sx={{width:"100%"}}/> */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "8px",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InsertPhotoOutlinedIcon />
              <LinkOutlinedIcon />
              <GifOutlinedIcon />
              <SentimentSatisfiedOutlinedIcon />
            </Box>
            <Box>
              <Button onClick={handleSubmit} sx={{ marginBottom: "15px" }}>send</Button>
              <MoreHorizIcon />
            </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default MessageTab
