import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import chatSlice from "../features/chat/chatSlice";
import messageSlice from "../features/messages/messageSlice";
const persistConfig = {
    key: 'root',
    storage,
}
const rootreducer = combineReducers({
    user: userSlice,
    chats: chatSlice,
    messages: messageSlice,
})
const persistedReducer = persistReducer(persistConfig, rootreducer)
export const store = configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store)
