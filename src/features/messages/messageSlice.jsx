import { createSlice } from "@reduxjs/toolkit"
import { addMessage, fetchChats } from "./messageAction.jsx";

const initialState = {
    isLoading: true,
    error: null,
    chatRoomId: null,
    messages: [],
}
const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
       newMessage(state, action) {
        state.messages = [...state.messages, action.payload]
       },
       setChatRoomId(state,action) {
        console.log(action.payload)
        state.chatRoomId = action.payload;
       }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(fetchChats.fulfilled,(state,action)=>{
            state.isLoading=false
            state.messages=action.payload.messages;
        })
        builder.addCase(fetchChats.rejected,(state,action)=>{
            state.isLoading=false
            state.error= action.error.message
            console.log(state.error)
        })

        // builder.addCase(addMessage.pending, (state) => {
        //     console.log("pending")
        //     state.isLoading = true;
        // })
        // builder.addCase(addMessage.fulfilled, (state, action) => {
        //     console.log("fullfilled")
        //     state.isLoading = false
        //     console.log("ACTION", action.payload)
        //     state.chats = action.payload;
        //     console.log(state.chats)
        //     // state.requested = action.payload;
        // })
        // builder.addCase(addMessage.rejected, (state, action) => {
        //     console.log("rejected")
        //     state.isLoading = false
        //     state.error = action.error.message
        //     console.log(state.error)
        // })

    },
});
export const { newMessage, setChatRoomId } = messageSlice.actions;
export default messageSlice.reducer;