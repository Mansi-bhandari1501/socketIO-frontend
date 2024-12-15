import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHAT_TYPE } from './chatType.jsx';
import axios from "axios";

export const fetchChats= createAsyncThunk(
    CHAT_TYPE.GET_CHAT,
    async ({chatRoomId,token},{rejectWithValue}) => {
        try{
        console.log(chatRoomId)
        console.log(token)
        const res = await axios.get(`http://localhost:8080/message/${chatRoomId}`,
        {headers:{Authorization: token}});
        const data =  res.data;
        console.log("chat", data)
        return data.chat;
    } catch (error) {
        return rejectWithValue(error) 
    }
    }
)
export const addChats= createAsyncThunk(
    CHAT_TYPE.ADD_CHAT,
    async ({userId, logId,token},{rejectWithValue}) => {
        try{
        console.log(userId,logId)
        console.log(token)
        const res = await axios.post(`http://localhost:8080/message/`,{userId, logId},
        {headers:{Authorization: token}});
        const data =  res.data;
        console.log("chat", data)
        return data.chat;
    } catch (error) {
        return rejectWithValue(error) 
    }
    }
)