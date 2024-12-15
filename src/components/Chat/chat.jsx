import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Box, List, ListItem, ListItemAvatar, ListItemText, Divider, TextField, IconButton, Paper, CircularProgress } from '@mui/material';
import { Send as SendIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { MessageCircle } from 'lucide-react';
import Navbar from '../TopBar/topbar';
import { socket } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/user/userAction';
import { setChatRoomId } from '../../features/messages/messageSlice';
import { fetchChats } from '../../features/messages/messageAction';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const {messages} = useSelector((state)=> state.messages);
  const token = useSelector((state) => state.user.userToken);
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const chatRoomId = useSelector((state)=> state.messages.chatRoomId)
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ token }));
  }, [dispatch, token]);

  const sendMessageHandler = () => {
    const newMessage = {
      content: textMessage,
      senderId: loggedInUser?._id,
      chatRoomId
    };
    socket.emit("message", newMessage);
    setTextMessage('');
  };

  const selectUserHandler = (suggestedUser) => {
    const chatRoomId = [loggedInUser._id, suggestedUser._id].sort().join('_');
    dispatch(setChatRoomId(chatRoomId))
    socket.emit('join-room', chatRoomId);
    dispatch(fetchChats({chatRoomId,token,senderId: loggedInUser._id, recieverId: suggestedUser._id}))
    setSelectedUser(suggestedUser)
    console.log(`Joined room: ${chatRoomId}`);
  }

  useEffect(() => {
    return () => {
      setSelectedUser(null);
    };
  }, []);

  return (
    <>
      <Navbar />
    <Box sx={{ display: 'flex', height: '92vh', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          width: { xs: '100%', sm: '25%' },
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default',
          overflowY: 'auto',
          // pt: 8,
        }}
      >
        <Typography variant="h6" sx={{ padding: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          {loggedInUser?.username}
        </Typography>
        <Divider />
        <List>
          {users?.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            return (
              <ListItem
                onClick={()=>selectUserHandler(user)}
                key={user._id}
                sx={{
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                  bgcolor: isSelected ? 'action.hover' : 'inherit',
                  borderLeft: isSelected ? '4px solid' : 'none',
                  borderColor: isSelected ? 'primary.main' : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.profileImage || "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"} alt={user.username}>
                    {user.username.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  // secondary={<Typography variant="caption" color={isOnline ? 'success.main' : 'error.main'}>{isOnline ? 'Online' : 'Offline'}</Typography>}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      {chatRoomId ? 
      (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
        }}
      >
        {selectedUser ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <Avatar src={"https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"} alt={selectedUser.username}>
                {selectedUser.username.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {selectedUser.username}
              </Typography>
              {/* <Box sx={{ marginLeft: 'auto' }}>
                <IconButton size="small" color="primary">
                  <MoreVertIcon />
                </IconButton>
              </Box> */}
            </Box>
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                bgcolor: 'background.default',
              }}
            >
              {messages.map((message) => (
                <Paper
                  key={message._id}
                  sx={{
                    padding: 1,
                    bgcolor: message.sender._id === loggedInUser?._id ? 'primary.light' : 'grey.200',
                    alignSelf: message.sender._id === loggedInUser?._id ? 'flex-end' : 'flex-start',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body1" color="text.primary">
                    {message.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </Typography>
                </Paper>
              ))}
            </Box>
            <Box
              sx={{
                padding: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                sx={{ marginRight: 2 }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => sendMessageHandler(selectedUser._id)}>
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            <MessageCircle className="MuiSvgIcon-root" style={{ width: 80, height: 80, marginBottom: 16 }} />
            <Typography variant="h6">Your messages</Typography>
            <Typography variant="body2">Select a user to start a chat.</Typography>
          </Box>
        )}
      </Box>
      ):(
        <CircularProgress sx={{margin:"auto"}}/>
      )
    }
    </Box>
    </>
  );
};

export default ChatPage;
