import './App.css';
import Router from "./routes/index.jsx"
import './App.css';
import io from "socket.io-client";
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newMessage } from './features/messages/messageSlice.jsx';

export const socket =io.connect("http://localhost:8080/")

function App() {
  const chatRoomId = useSelector((state)=> state.messages.chatRoomId)
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on(chatRoomId, (messageData) => {
      console.log('New message received:', messageData);
      dispatch(newMessage(messageData))
    });
    return () => {
      socket.off(chatRoomId);
    };
  }, []); 

  useEffect(() => {
    socket.on(chatRoomId, (messageData) => {
      console.log('New messages received:', messageData);
    });
    return () => {
      socket.off(chatRoomId);
    };
  }, []);
  
  return (
    <>
      <SnackbarProvider>
      < Router />
      </SnackbarProvider>
    </>
  )
}

export default App;
