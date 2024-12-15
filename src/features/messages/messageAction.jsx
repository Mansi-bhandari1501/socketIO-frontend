import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MESSAGE_TYPE } from "./messageType.jsx";
import { CHAT_TYPE } from "../chat/chatType.jsx";

export const fetchChats= createAsyncThunk(
    CHAT_TYPE.GET_CHAT,
    async ({chatRoomId,token,senderId,recieverId},{rejectWithValue}) => {
        try{
        console.log(chatRoomId)
        console.log(token)
        const res = await axios.get(`http://localhost:8080/message/${chatRoomId}`, {
            headers: { Authorization: token },
            params: { senderId, recieverId }
        });
        const data =  res.data.response;
        return data;
    } catch (error) {
        return rejectWithValue(error) 
    }
    }
)
// export const addMessage= createAsyncThunk(
//     MESSAGE_TYPE.ADD_MESSAGE,
//     async ({content, chatId, senderId,token}) => {
//         console.log(content, chatId, senderId)
//         console.log(token)
//         const res = await axios.post(`http://localhost:8080/message`,{content, chatId, senderId},
//         {headers:{Authorization: token}});
//         const data =  res.data;
//         console.log("chat", data.chat)
//         return data.chat;
//     }
// )